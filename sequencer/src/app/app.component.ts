import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { groups, Channel } from 'src/assets/configs/channels.config';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  wave: WaveSurfer = null;
  url = "assets/audiofiles/audio.mp3";

  duration: number;
  frameCount: Array<number>;
  frameWidth: number;

  startIndex: number = null;
  selectedChannelIndex: number;
  selectedGroupIndex: any;

  groups = groups;
  frameData: { name: string; nodes: { name: string; color: string; frameSates: any[]; }[]; }[];


  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.onPreviewPressed();
  }

  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        plugins: [
          TimelinePlugin.create({
            container: '#wave-timeline'
          })
        ]
      });

      this.wave.on('ready', () => {
        // alert("I'm ready");
        this.wave.play();
      });
    });
  }

  onPreviewPressed(): void {
    if (!this.wave) {
      this.generateWaveform();
    }

    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.wave.load(this.url)
    });
    setTimeout(() => {
      this.duration = this.wave.getDuration()
      this.frameCount = new Array(Math.floor(this.duration * 1000 / 20)).fill(1);
      this.frameWidth = 12000 / this.frameCount.length;
      this.createFrameData()
    }, 1000);

  }

  createFrameData() {
    this.frameData = groups.map(
      (group) => ({
        name: group.name,
        nodes: this.createNodeData(group.nodes)
      }
      )
    )
  }

  createNodeData = (nodes: Array<Channel>) => {
    return nodes.map(
      (node) => ({ name: node.name, color: node.color, frameSates: Array(this.frameCount.length).fill(0) })
    )
  }

  onStopPressed(): void {
    this.wave.stop();
    this.wave
  }

  onFrameClick(clickedIndex, channelIndex, groupindex) {
    if (this.startIndex != null) {
      if (this.selectedChannelIndex !== channelIndex || this.selectedGroupIndex !== groupindex) {
        this.selectedChannelIndex = null;
        this.startIndex = null;
      } else {
        const selectedFrameCount = Math.abs(clickedIndex - this.startIndex);
        this.frameData[groupindex].nodes[channelIndex].frameSates.splice(
          this.startIndex > clickedIndex ? clickedIndex : this.startIndex,
          selectedFrameCount + 1,
          ...Array(selectedFrameCount + 1).fill(9)
        )
        console.log(`Duration is ${selectedFrameCount * 20} ms`);

        this.startIndex = null;
      }
    } else {
      this.startIndex = clickedIndex;
      this.selectedChannelIndex = channelIndex;
      this.selectedGroupIndex = groupindex;
    }
  }
}

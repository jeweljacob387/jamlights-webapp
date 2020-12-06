import { AfterViewInit, Component, NgZone } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

import { groups, Channel } from 'src/assets/configs/channels.config';
import { FileServiceService } from './file-service.service';
import { FrameData } from './app.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [FileServiceService]
})
export class AppComponent implements AfterViewInit {
    wave: WaveSurfer = null;
    url = 'assets/audiofiles/audio.mp3';

    duration: number;
    frameCount: number;
    frameWidth: number;

    startIndex: number = null;
    selectedChannelIndex: number;
    selectedGroupIndex: any;

    groups = groups;
    frameData: FrameData;
    isDragging: boolean;
    playing: boolean;

    constructor(
        private file: FileServiceService,
        protected zone: NgZone
    ) {
        zone.runOutsideAngular(
            () => {
                window.addEventListener(
                    'keypress',
                    (event: KeyboardEvent) => {
                        if (event.code === 'KeyS') {
                            this.saveData();
                            console.log('saveee');

                        }
                    }
                );
            }
        );
    }

    ngAfterViewInit() {
        this.initWaveCreation();
    }

    initWaveCreation(): void {
        if (!this.wave) {
            this.createLoadCanvas().then(
                _ => {
                    this.wave.load(this.url);
                }
            );
        }
        this.wave.on('pause', () => { this.playing = false; });
        this.wave.on('play', () => { this.playing = true; });
        this.getFrames();
        this.wave.on('ready', () => {
            this.duration = this.wave.getDuration();
            this.frameCount = Math.floor(this.duration * 1000 / 40);
            this.frameWidth = 12000 / this.frameCount;
            // this.createFrameData();
            // this.frameData = frames.frames;
        });
    }

    getFrames() {
        this.file.getFrames().then(
            (frames) => {
                this.frameData = frames;
            }
        );
    }

    createLoadCanvas() {
        return new Promise(
            (resolve) => {
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
                resolve();
            }
        );
    }


    createFrameData() {
        this.frameData = groups.map(
            (group) => ({
                name: group.name,
                nodes: this.createNodeData(group.nodes)
            })
        );
    }

    createNodeData = (nodes: Array<Channel>) => {
        return nodes.map(
            (node) => ({ name: node.name, color: node.color, frameSates: Array(this.frameCount).fill(0) })
        );
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
                    ...Array(selectedFrameCount + 1).fill(10)
                );
                console.log(`Duration is ${selectedFrameCount * 20} ms`);

                this.startIndex = null;
            }
        } else {
            this.startIndex = clickedIndex;
            this.selectedChannelIndex = channelIndex;
            this.selectedGroupIndex = groupindex;
        }
    }

    saveData() {
        // saveAs(
        //     new Blob([JSON.stringify({ frames: this.frameData })], {
        //         type: 'application/json'
        //     }),
        //     `frames.json`
        // );
        this.file.saveFrames({ frames: this.frameData });
    }

    onMosueDown(event: MouseEvent, frame) {
        this.isDragging = true;
        console.log(frame);
    }

    onMouseMove(event: MouseEvent, frame) {
        if (this.isDragging) {
            console.log(frame);
        }
    }

    onMouseUp(event: MouseEvent, frame) {
        console.log(frame);
    }
}

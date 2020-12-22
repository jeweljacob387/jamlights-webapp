import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

import { groups, Node } from 'src/assets/configs/channels.config';
import { FileServiceService } from './file-service.service';
import { FrameData } from './app.module';
import { StateTypeEnum } from './state-type.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [FileServiceService]
})
export class AppComponent implements AfterViewInit {
    wave: WaveSurfer = null;
    url = 'assets/audiofiles/audio.mp3';
    stateType = StateTypeEnum;

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
    selectedState = StateTypeEnum.ON;
    startX: number;
    scrollLeft: any;
    isMouseDown: boolean;

    canvasWidth = 50000; // in px
    frameDuration = 50; // in ms

    constructor(
        public file: FileServiceService,
        protected zone: NgZone,
        private elem: ElementRef<HTMLDivElement>
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
        this.wave.on('pause', () => {
            this.playing = false;
        });
        // this.wave.on('play', () => {
        //     this.playing = true;
        //     this.file.playFile();
        // });
        this.getFrames();
        this.wave.on('ready', () => {
            this.duration = this.wave.getDuration();
            this.frameCount = Math.floor(this.duration * 1000 / this.frameDuration);
            this.frameWidth = this.canvasWidth / this.frameCount;
            this.addGrabScrollListeners();
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
        return new Promise<void>(
            (resolve) => {
                this.wave = WaveSurfer.create({
                    container: '#waveform',
                    waveColor: 'violet',
                    progressColor: 'green',
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

    createNodeData = (nodes: Array<Node>) => {
        return nodes.map(
            (node) => ({
                name: node.name,
                deviceIndex: node.deviceIndex,
                color: node.color,
                frameSates: Array(this.frameCount).fill(0)
            })
        );
    }

    onFrameClick(clickedIndex, channelIndex, groupindex) {

        if (this.startIndex != null) {

            if (this.selectedChannelIndex !== channelIndex || this.selectedGroupIndex !== groupindex) {
                this.selectedChannelIndex = null;
                this.startIndex = null;
            } else {
                const selectedFrameCount = Math.abs(clickedIndex - this.startIndex);
                let framesToReplace = [];
                switch (this.selectedState) {
                    case StateTypeEnum.FADE_UP:
                        framesToReplace = Array(selectedFrameCount + 1).fill(0).map(
                            (_, index) => (index + 1) / (selectedFrameCount + 1) * 10
                        );
                        break;
                    case StateTypeEnum.FADE_DOWN:
                        framesToReplace = Array(selectedFrameCount + 1).fill(0).map(
                            (_, index) => (1 - (index + 1) / (selectedFrameCount + 1)) * 10
                        );
                        break;
                    case StateTypeEnum.ON:
                    case StateTypeEnum.OFF:
                        framesToReplace = Array(selectedFrameCount + 1).fill(this.selectedState ? 10 : 0);
                        break;
                    default:
                        break;
                }

                this.frameData[groupindex].nodes[channelIndex].frameSates.splice(
                    this.startIndex > clickedIndex ? clickedIndex : this.startIndex,
                    selectedFrameCount + 1,
                    ...framesToReplace
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
        this.file.saveFrames({ groups: this.frameData });
    }

    addGrabScrollListeners() {
        const slider = this.elem.nativeElement.querySelector('.wrapper');
        this.zone.runOutsideAngular(
            () => {
                slider.addEventListener('mousedown', (e: MouseEvent) => {
                    if (e.ctrlKey) {
                        this.isMouseDown = true;
                        this.startX = e.pageX - (slider as any).offsetLeft;
                        this.scrollLeft = slider.scrollLeft;
                    }
                });
                slider.addEventListener('mouseleave', () => {
                    this.isMouseDown = false;
                });
                slider.addEventListener('mouseup', () => {
                    this.isMouseDown = false;
                });
                slider.addEventListener('mousemove', (e: MouseEvent) => {
                    if (!this.isMouseDown) { return; }
                    e.preventDefault();
                    const x = e.pageX - (slider as any).offsetLeft;
                    const walk = (x - this.startX) * 3;
                    slider.scrollLeft = this.scrollLeft - walk;
                    console.log(walk);
                });
            }
        );
    }

}

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import { saveAs } from 'file-saver';

import { groups, Channel } from 'src/assets/configs/channels.config';
import * as frames from '../assets/frames/frames.json';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    wave: WaveSurfer = null;
    url = 'assets/audiofiles/audio.mp3';

    duration: number;
    frameCount: Array<number>;
    frameWidth: number;

    startIndex: number = null;
    selectedChannelIndex: number;
    selectedGroupIndex: any;

    groups = groups;
    frameData: { name: string; nodes: { name: string; color: string; frameSates: any[]; }[]; }[];

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
        setTimeout(() => {
            this.duration = this.wave.getDuration();
            this.frameCount = new Array(Math.floor(this.duration * 1000 / 20)).fill(1);
            this.frameWidth = 12000 / this.frameCount.length;
            // this.createFrameData();
            this.frameData = frames.frames;
        }, 1000);

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



    onPlayPressed(): void {
        this.wave.play();
    }

    onStopPressed(): void {
        this.wave.stop();
    }

    createFrameData() {
        this.frameData = groups.map(
            (group) => ({
                name: group.name,
                nodes: this.createNodeData(group.nodes)
            }
            )
        );
    }

    createNodeData = (nodes: Array<Channel>) => {
        return nodes.map(
            (node) => ({ name: node.name, color: node.color, frameSates: Array(this.frameCount.length).fill(0) })
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
        const now = new Date();
        saveAs(
            new Blob([JSON.stringify({ frames: this.frameData })], {
                type: 'application/json'
            }),
            `frames.json`
        );
    }
}

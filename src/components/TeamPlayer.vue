<template>
  <video id="teamPlayer" ref="videoElement" src="../assets/vid/film.webm" @wheel="skrubb" controls>
    <track id="trackElement" ref="trackElement" kind="subtitles" label="Tag data" srclang="en" default />
  </video>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { TaggingState, Tag } from '../store/tagging/types';

import {ipcRenderer} from 'electron';

@Component
export default class TeamPlayer extends Vue {
  @State('tagging') public tagging!: TaggingState;
  @Action('setCurrentTagIds', { namespace: 'tagging' })  public setCurrentTagIds!: any;

  @Watch('tagging.tags')
  public onActiveTrackCuesChanged(val: Tag[], oldVal: Tag[]) {
    this.updateCues();
  }

  public mounted() {
    ipcRenderer.on('fileData', (event: any, files: any) => {
      // tslint:disable-next-line:no-console
      //  console.log(event, files);
      this.videoElement.src = files[0];
    });
  }

  get videoElement(): HTMLVideoElement {
    return this.$refs.videoElement as HTMLVideoElement;
  }

  get trackElement(): HTMLTrackElement {
    return document.getElementById('trackElement') as HTMLTrackElement;
  }

  public skrubb(e: MouseEvent) {
    // console.log(e);
    // this.player.currentTime += (e.deltaY / Math.abs(e.deltaY) * 0.5 );
  }

  public onCuechange() {
    const t = document.getElementById('trackElement') as HTMLTrackElement;
    const activeCues = t.track.activeCues;
    const list: string[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < activeCues.length; i++) {
      // console.log(activeCues[i]);
      list.push( activeCues[i].id );
    }

    this.setCurrentTagIds(list);
  }

  protected addTrack() {
    // needs to be a real element, to be able to remove it until there is an api removeTextTrack()
    const trackElement = document.createElement('track');
    trackElement.setAttribute('id', 'trackElement');
    trackElement.setAttribute('kind', 'captions');
    trackElement.setAttribute('label', 'label');
    trackElement.setAttribute('srcLang', 'en');

    this.videoElement.appendChild(trackElement);

    // trackElement.track options needs to be set after the element is added to the video
    trackElement.track.mode = 'showing'; // config.mode;

    trackElement.track.addEventListener('cuechange', this.onCuechange, false);

    // console.log(trackElement.track);

    return trackElement;
  }

  protected removeTrack() {
    const t = document.getElementById('trackElement') as HTMLElement;
    this.videoElement.removeChild(t);
  }

  protected updateCues() {
    // const trackElement = this.$refs.trackElement as HTMLTrackElement;
    // const textTrack = trackElement.track;

    if (!this.videoElement.duration) {
      return;
    }

    // clear cues, how?
    this.removeTrack();
    const textTrack = this.addTrack();

    // add cues: textTrack.addCue(cue);
    this.tagging.tags.forEach((tag: Tag) => {
      const start = tag.time * this.videoElement.duration;
      const end = start + 0.5;
      const vttCue = new (window as any).VTTCue(start, end, tag.id);
      vttCue.id = tag.id;
      textTrack.track.addCue(vttCue);
    });
  }
}
</script>

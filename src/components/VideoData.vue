<template>
  <div class="video-data">
    <table>
      <caption>{{caption}}</caption>
      <thead> <!-- Passengers of flight 377 -->
        <tr>
          <th>Event</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>currentTime</td>
          <td>{{currentTime}}</td>
        </tr>
        <tr>
          <td>duration</td>
          <td>{{duration}}</td>
        </tr>
        <tr>
          <td>duration</td>
          <td>{{duration}}</td>
        </tr>
      </tbody>
    </table>
    <button @click="play">-</button>
    <button @click="pause">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Event } from 'electron';

@Component
export default class VideoData extends Vue {
  @Prop() private duration!: number;
  @Prop() private currentTime!: number;
  @Prop({default: 'Video Events'}) private caption!: string;
  @Prop() private player!: HTMLVideoElement|null;

  public play() {
    if (this.player) {
      this.player.play();
    }
  }

  public pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  @Watch('player')
  protected onPlayerChanged(val: HTMLVideoElement|null, oldVal: HTMLVideoElement|null) {
    if (val) {
      this.bind(val);
    }
  }

  protected bind(player: HTMLVideoElement) {
    const mediaEvents = [
      'abort',
      'canplay',
      'canplaythrough',
      'durationchange',
      'emptied',
      'ended',
      'error',
      'interruptbegin',
      'interruptend',
      'loadeddata',
      'loadedmetadata',
      'loadstart',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeupdate',
      'volumechange',
      'waiting',
    ];

    mediaEvents.forEach( (mediaEvent) => {
      // const handlerName = `on${ mediaEvent.charAt(0).toUpperCase() + mediaEvent.substring(1) }`;
      player.addEventListener(mediaEvent, this.onMediaEvent );
    });
  }

  protected onMediaEvent(e: any) {
    console.log(e);
  }

  protected onDurationchange(e: any) {
    // this.duration = e.target.duration;
  }

  protected onTimeupdate(e: any) {
    // this.currentTime = e.target.currentTime;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

table {
  border-collapse: collapse;
}
td, th{
  padding: .2em 1em;
  border: 1px solid #345;
}

</style>

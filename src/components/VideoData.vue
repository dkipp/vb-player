<template>
  <div class="video-data">
    <table>
      <caption>HI all</caption>
      <thead>
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
          <td></td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="item in activeCues" :key="item.start">
          <td>{{item.text}}</td>
          <td>{{item.text}}</td>
        </tr>
      </tbody>
    </table>
    <button @click="play">-</button>
    <button @click="pause">+</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { Event } from 'electron';

@Component
export default class VideoData extends Vue {

  @Prop({default: 0}) private duration!: number;
  @Prop({default: 0}) private currentTime!: number;
  @Prop({default: 'Video Events'}) private caption!: string;

  get player() {
    return this.$store.state.player;
  }

  get activeCues() {
    return this.$store.state.activeCues || [];
  }

  public play() {
    this.$store.getters.player.play();
  }

  public pause() {
    this.$store.getters.player.pause();
  }
   
  @Watch('player')
  protected onPlayerChanged(val: any, oldVal: any) {
    this.bind();
  }

  
  protected bind() {
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
      this.player.addEventListener(mediaEvent, this.onMediaEvent );
    });
  }

  protected onMediaEvent(e: any) {

    switch(e.type){

      case 'durationchange':
        this.duration = this.player.duration;
        break;

      case 'timeupdate':
        this.currentTime = this.player.currentTime;
        break;
      
      default:
        console.log(e);
    }
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

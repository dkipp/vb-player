<template>
  <div class="root">
    <button @click="skippFrames(-20)"><i class="material-icons">fast_rewind</i></button>
    <button @click="prevFrame"><i class="material-icons">skip_previous</i></button>
    
    <button @click="play"><i class="material-icons">play_arrow</i></button>
    <button @click="pause"><i class="material-icons">pause</i></button>
    <!--button><i class="material-icons">stop</i></button-->
    
    <button @click="nextFrame"><i class="material-icons">skip_next</i></button>
    <button @click="skippFrames(20)"><i class="material-icons">fast_forward</i></button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
// import { Event } from 'electron';

@Component
export default class VideoControls extends Vue {

  @Prop({default: 0}) public duration!: number;
  @Prop({default: 0}) public currentTime!: number;
  @Prop({default: 'Video Events'}) public caption!: string;

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

  public nextFrame() {
    this.pause();
    this.$store.getters.player.currentTime += (1 / 30);
  }

  public prevFrame() {
    this.pause();
    this.$store.getters.player.currentTime -= (1 / 30);
  }

  public skippFrames(cnt = 1) {
    this.pause();
    this.$store.getters.player.currentTime += (1 / 30) * cnt;
  }

  @Watch('player')
  protected onPlayerChanged(val: any, oldVal: any) {
    // this.bind();
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

    const p = this.player;

    switch (e.type) {

      case 'durationchange':
        this.duration = p.duration;
        // console.log(e);
        break;

      case 'timeupdate':
        this.currentTime = this.player.currentTime;
        break;

      default:
        // console.log(e);
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

.root{
  _border-top: 2px solid #161616;
  margin-top: .5em;
  border-bottom: 2px solid #161616;
  text-align: center;
}

table {
  border-collapse: collapse;
}
td, th{
  padding: .2em 1em;
  border: 1px solid #345;
}

</style>

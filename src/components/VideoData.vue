<template>
  <div class="video-data">
    <h1>{{ msg }}</h1>
    <p>VideoData Table {{duration}} </p>
    <button @click="play">-</button>
    <button @click="pause">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Event } from 'electron';

@Component
export default class VideoData extends Vue {
  @Prop() private duration!: number;
  @Prop() private msg!: string;
  @Prop() private player!: HTMLVideoElement;

  public play() {
    if ( this.player ) {
      this.player.play();
    }
  }

  public pause() {
    if ( this.player ) {
      this.player.pause();
    }
  }

  protected bind(player: HTMLVideoElement) {
    player.addEventListener('durationChange', this.onDurationchange);
  }

  protected onDurationchange(e: any) {
    console.log(e);
    // this.duration = e;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
</style>

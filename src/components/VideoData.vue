<template>
  <div class="video-data">
    <h1>{{ msg }}</h1>
    <p>VideoData Table</p>
    <button @click="play">-</button>
    <button @click="pause">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VideoData extends Vue {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
</style>

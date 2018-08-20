<template>
  <div class="video-data">
    <h1>{{ msg }}</h1>
    <p>VideoData Table</p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class VideoData extends Vue {
    @Prop() private msg!: string;
    @Prop() private video!: HTMLVideoElement;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>

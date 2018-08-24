<template>
  <span>{{timecode}}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TimeCode extends Vue {

  @Prop({default: 0}) public seconds!: number;

  get timecode() {
    return this.formatSeconds(this.seconds);
  }

  public formatSeconds(sec: number): string {
    const rSec = Math.round( sec * 1000 );
    // strlen may vary (24||27 chars), counting from the end solves it.
    return new Date(rSec).toISOString().slice(-13, -1);
  }
}
</script>

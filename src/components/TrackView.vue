<template>
  <div class="root">
    <div class="header margin">Header</div>
    <div>
      <div class="grid">
        <div>
          <time-code class="timecode margin"></time-code>
          <div class="toolbar margin">
            <button title="add track" @click="addRandomTags"><i class="material-icons">playlist_add</i></button>
            <button title="add random cues"><i class="material-icons">shuffle</i></button>
            <button title="add filter"><i class="material-icons">filter_list</i></button>
          </div>
        </div>
        <div class="sec">Timeline</div>

        <div class="track-toolbar margin">
            <button><i class="material-icons">fast_rewind</i></button>
            <button><i class="material-icons">fast_rewind</i></button>
            <button><i class="material-icons">visibility</i></button>
        </div>
        <div class="track active">
          <span class="cue" v-for="tag in tagging.tags" :key="tag.id" :style="computeTagStyle(tag.time)"></span>
        </div>

        <div class="sec margin"></div>
        <div class="sec"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation} from 'vuex-class';
import { TaggingState, Tag } from '@/store/tagging/types';

import TimeCode from '@/components/TimeCode.vue';

@Component({
  components: {
    TimeCode,
  },
})
export default class TrackView extends Vue {

  @State public player: any;
  @State('tagging') public 'tagging'!: TaggingState;
  @Action('addRandomTags', { namespace: 'tagging' }) public addRandomTags!: any;

  // data
  // public selectedTrack: Track|null = null;

  public mounted() {
    this.addRandomTags();
    // const p = this.player;
  }

  public importTracksFromPlayer() {
    const tracklist = (this.player as HTMLVideoElement).textTracks.length;
  }

  public computeTagStyle(time: number) {
    return `left: ${time * 100}%`;
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  i {
    font-size: 20px;
  }
  .root{
    padding: .5em 0;
    border-top: 2px solid #161616;
    border-bottom: 2px solid #161616;
  }

  .header{
    font-weight: 500;
  }

  .grid {
    display: grid;
    grid-template-columns: 300px auto;
    grid-row-gap: 1px;
    background-color: #313131;
  }

  .grid>*{
    background: var(--pannelBackgroundColor);
  }

  .toolbar {
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }

  .track-toolbar{
    padding-right: 0.5rem;
    display: flex;
    background: #262626;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    border-right: 1px solid #313131;

    &.active {
      background: lighten( #262626, 3% )
    }
  }

  .track{
    position: relative;
    background: #202020;

    &.active {
      background: lighten( #202020, 3% )
    }
  }

  .cue{
    position: absolute;
    background: #517eac;
    width: 0.2%;
    top: 2px;
    bottom: 2px;
    &:hover {
      cursor: pointer;
    }
  }

  .timecode {
    color:var(--heighlightColor);
    font-weight: 600;
    font-size: 1.5em;
  }

  .margin {
    padding-left: 2rem;
  }

</style>

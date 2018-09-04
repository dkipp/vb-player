<template>
  <div class="root">
    <div class="header margin">Header</div>
    <div>
      <div class="grid">
        <div>
          <time-code class="timecode margin"></time-code>
          <div class="toolbar margin">
            <button title="add track" @click="addRandomCues"><i class="material-icons">playlist_add</i></button>
            <button title="add random cues"><i class="material-icons">shuffle</i></button>
            <button title="add filter"><i class="material-icons">filter_list</i></button>
          </div>
        </div>
        <div class="sec">Timeline</div>


        <template v-for="track in cues.tracks">
          <div class="track-toolbar margin" :class="{'active':cues.activeTrackIds.includes(track.id)}" :key="track.id">
            
            <button @click="toggleActiveTrack(track.id)">
              <i v-if="cues.activeTrackIds.includes(track.id)" class="material-icons">check_box</i>
              <i v-else class="material-icons">check_box_outline_blank</i>
            </button>
            <span style="margin-right:2em;">{{track.label}}</span>
            <button><i class="material-icons">fast_rewind</i></button>
            <button><i class="material-icons">fast_rewind</i></button>
            <button><i class="material-icons">visibility</i></button>
          </div>
          <div class="track" :class="{'active':cues.activeTrackIds.includes(track.id)}" :key="track.id">
            <span class="cue" v-for="cue in track.cues" :key="cue.id" :style="computeCueStyle(cue.time)" :label="cue.data" @click="selectCue(cue.id)"></span>
          </div>
        </template>

        <div class="sec margin"></div>
        <div class="sec"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation} from 'vuex-class';
import { CuesState, Track, Cue } from '@/vuex/cues/types';

import TimeCode from '@/components/TimeCode.vue';

const namespace: string = 'cues';

@Component({
  components: {
    TimeCode,
  },
})
export default class TrackView extends Vue {

  @State public player: any;
  @State('cues') public 'cues'!: CuesState;
  @Action('addRandomCues', { namespace }) public addRandomCues!: any;
  @Action('toggleActiveTrack', { namespace }) public toggleActiveTrack!: any;

  // data
  public selectedTrack: Track|null = null;

  public mounted() {
    this.addRandomCues();
    const p = this.player;
  }

  public importTracksFromPlayer() {
    const tracklist = (this.player as HTMLVideoElement).textTracks.length;
  }

  public computeTrackClass(track: Track) {
    return `grid ${this.selectedTrack === track ? 'highlight' : ''}`;
  }

  public computeCueStyle(time: number) {
    return `left: ${time * 100}%`;
  }

  public updateSelected(track: Track) {
    this.selectedTrack = track;
  }

  public selectCue(cueId: string) {
    console.log(cueId);
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

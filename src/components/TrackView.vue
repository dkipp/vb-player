<template>
  <div class="root">
    <div class="header margin">Header</div>
    <div class="grid">
      <div class="sec">
        <time-code class="timecode margin"></time-code>
        <div class="toolbar margin">
          <button title="add track"><i class="material-icons">playlist_add</i></button>
          <button title="add random cues"><i class="material-icons">shuffle</i></button>
          <button title="add filter"><i class="material-icons">filter_list</i></button>
        </div>
      </div>
      <div class="sec">Timeline</div>
      <div class="track-toolbar margin">
        <button><i class="material-icons">radio_button_checked</i></button>
        <button><i class="material-icons">fast_rewind</i></button>
        <button><i class="material-icons">fast_rewind</i></button>
        <button><i class="material-icons">visibility</i></button>
      </div>
      <div class="track">
        <span class="cue" style="left:1%"></span>
        <span class="cue" style="left:2%"></span>
        <span class="cue" style="left:3%"></span>
        <span class="cue" style="left:4%"></span>
      </div>
      <div class="track-toolbar margin">
        <button><i class="material-icons">radio_button_unchecked</i></button>
        <button><i class="material-icons">fast_rewind</i></button>
        <button><i class="material-icons">fast_rewind</i></button>
        <button><i class="material-icons">visibility</i></button>
      </div>
      <div class="track">
        <span class="cue" style="left:1%"></span>
        <span class="cue" style="left:2%"></span>
        <span class="cue" style="left:3%"></span>
        <span class="cue" style="left:4%"></span>
      </div>
      <div class="sec margin">footer Toolbar</div>
      <div class="sec">skrubber</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace} from 'vuex-class';

import TimeCode from '@/components/TimeCode.vue';

@Component({
  components: {
    TimeCode,
  },
})
export default class TrackView extends Vue {
  @State public player: any;

  public mounted() {
    const p = this.player;
  }

  public importTracksFromPlayer() {
    const tracklist = (this.player as HTMLVideoElement).textTracks.length;
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
    background: #313131;
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
  }

  .track{
    position: relative;
    background: #202020;
  }

  .cue{
    position: absolute;
    background: #517eac;
    width: 0.2%;
    top: 2px;
    bottom: 2px;
  }

  .sec {
    background: var(--pannelBackgroundColor);
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

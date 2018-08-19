<template>
  <div>
  <div id="container">
    <video id="video" src="../assets/vid/film.webm" controls @click="blub"></video>
    <img src="../assets/img/premiereProCCTrackview.png" @click="blub" /><!--br/>
    <div id="trackview">
      <div>Toolbar</div>
      <div class="tracklist">
        <div class="track">
          <div class="cue" style="left:1%"></div>
          <div class="cue" style="left:2%"></div>
          <div class="cue" style="left:3%"></div>
          <div class="cue" style="left:4%"></div>
        </div>
        <div class="track">
          <div class="cue" style="left:5%"></div>
          <div class="cue" style="left:6%"></div>
          <div class="cue" style="left:7%"></div>
          <div class="cue" style="left:8%"></div>
        </div>
        <div class="track"></div>
      </div>
    </div-->

    <!--fieldset>
      <legend>Video settings</legend>

      <label for="duration">Duration (min)</label>
      <input type="range" id="duration" name="duration" min="1" max="120" value="0"/>

      <label for="currentTime">currentTime</label>
      <input type="range" id="currentTime" name="currentTime" min="0" max="120" value="90" step="1" />
    </fieldset>

    <fieldset>
      <legend>Trackview settings</legend>

      <label for="duration">Zoom</label>
      <input type="range" id="duration" name="duration" min="1" max="100" value="50"/>

    </fieldset-->

  </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Provide } from 'vue-property-decorator';
  import { Event } from 'electron';
  export default class Player extends Vue {

    get player() {
      return document.getElementById('player') as HTMLVideoElement;
    }

    public trackElement: HTMLTrackElement|null = null;

    public addTrack(id: string) {
      // needs to be a real element, to be able to remove it until there is an api removeTextTrack()
      this.trackElement = document.createElement('track');
      this.trackElement.setAttribute('id', id);
      this.trackElement.setAttribute('kind', 'subtitles');
      this.trackElement.setAttribute('label', 'label');
      this.trackElement.setAttribute('srcLang', 'de');

      this.player.appendChild(this.trackElement);

      // trackElement.track options needs to be set after the element is added to the video
      this.trackElement.track.mode = 'showing'; // config.mode;

      // this.trackElement.track.addEventListener('cuechange', this.onCuechange, false);

      console.log(this.trackElement);
    }

    public blub(e: Event) {
      // console.log('bind', this);
      this.addTrack('myTrack');
      this.addDemoCues(40);
    }

    protected onCuechange(e: Event) {
      //
    }

    protected addDemoCues(cnt: number = 100) {
      for (let i: number = 0; i < cnt; i++) {
        const pos: number = Math.random() * 31;
        const cue = new (window as any).VTTCue(pos, pos + .1, `pos: ${pos}`);

        if (this.trackElement) {
          this.trackElement.track.addCue(cue);
        }
      }
    }

  }


</script>


<style scoped lang="scss">
:root {
  --track-width: 800px;
  --background: #161616;
  --pannel: #232323;
}

#container {
  display: flex;
  flex-direction: column;
}

#trackview {
  background: rgb(190, 176, 218);
  width: 70%;
  margin: 1em auto;
  padding: 2px;
}

fieldset {
  display: inline-block;
  width: 30%;
  padding: 1em;
  text-align: left;
  background: var(--pannel);
  color: #acacac;
}

fieldset > input {
  display: block;
}

.tracklist {
  overflow-x: auto;
  background: rgb(150, 150, 150);
}

.track {
  position: relative;
  background: rgb(228, 228, 228);
  margin: 1px 0;
  width: var(--track-width);
  height: 1rem;
}

.cue {
  position: absolute;
  display: block;
  top: 0;
  height: 1rem;
  width: 0.1%;
  left: 0;
  background: rgb(131, 175, 201);
  grid-column-end: span 1;
  grid-row: 1 / 2;
}
</style>

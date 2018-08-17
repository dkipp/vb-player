<template>
  <div id="container">
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
    </div>

    <fieldset>
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

    </fieldset>

  </div>
</template>

<script lang="ts">
  import { Vue } from 'vue-property-decorator';
  export default class Player extends Vue {}
</script>


<style scoped lang="scss">
:root {
      --track-width: 800px;
    }

#container {
  margin: 1.5em;
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
}
fieldset>input {
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
      width: .1%;
      left: 0;
      background: rgb(131, 175, 201);
      grid-column-end: span 1;
      grid-row: 1 / 2;
    }
</style>

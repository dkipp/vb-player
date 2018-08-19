<template>
  <div class="main-content">
    <div id="container">
      <video id="video" src="../assets/vid/film.webm" controls></video>
      <img src="../assets/img/premiereProCCTrackview.png" @click="setupTheMagic" /><br/>
    </div>
    <h3> {{ webpack }} </h3>

    <input id="uploadInput" type="file" name="myFiles" @change="hashIt"><br/>
    <div>Size: <span id="fileSize">0</span></div>
    <div>SHA-256: <span id="fileHash">0</span></div>

  <div id="dropZone" @drop="dropHandler" @dragover="dragoverHandler"> Drop Zone</div>
  </div>
</template>

<script lang="js">
  export default {
        name: 'main-content',
        data: () => ({
            // reactive data property of the component.
            webpack: 'Powered by webpack!',
        }),
        methods: {

          addTrack(id) {
            // needs to be a real element, to be able to remove it until there is an api removeTextTrack()
            const trackElement = document.createElement('track');
            trackElement.setAttribute('id', id);
            trackElement.setAttribute('kind', 'captions');
            trackElement.setAttribute('label', 'label');
            trackElement.setAttribute('srcLang', 'en');

            document.getElementById('video').appendChild(trackElement);

            // trackElement.track options needs to be set after the element is added to the video
            trackElement.track.mode = 'showing'; // config.mode;

            trackElement.track.addEventListener('cuechange', this.onCuechange, false);

            // console.log(trackElement.track);

            return trackElement;
          },

          addDemoCues(track, cnt = 100) {
            const t = document.querySelector('#video').textTracks[0];
            for (let i = 0; i < cnt; i++) {
              const pos = Math.random() * 31;
              const cue = new VTTCue(pos, pos + 1, `pos: ${pos}`);
              // console.log(cue);
              t.addCue(cue);
            }
          },

          setupTheMagic(e) {
              // console.log();

            if ( document.querySelector('#video').textTracks.length === 0) {
              const t = this.addTrack('THE-track');

            } else {
              this.addDemoCues(document.querySelector('#video').textTracks[0], 10);
              // console.log(document.querySelector('#video').textTracks[0]);
            }
          },

          onCuechange(e) {
            // console.log(e);
          },

          dropHandler(e) {
            e.preventDefault();

            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files);
          },

          dragoverHandler(e) {
            e.preventDefault();
          },

          handleFiles(files) {
            ([...files]).forEach(this.handleFile);
          },

          handleFile(file) {
            const reader = new FileReader();
            console.log('handleFile', file);

            reader.onload = (e) => {
              const text = reader.result;
              const promise = crypto.subtle.digest({name: 'SHA-256'},   this.convertStringToArrayBufferView(text));

              promise.then( (result) => {
                // console.log('result', result);
                const hashValue = this.convertArrayBufferToHexaDecimal(result);
                document.getElementById('fileHash').textContent = hashValue;
              });
            };

            reader.readAsText(file);
          },

          hashIt(e) {
            const nBytes = 0;
            const oFiles = e.srcElement.files;
            const nFiles = oFiles.length;
            const reader = new FileReader();

            // console.log('hashIt', oFiles);

            reader.onload = () => {
              const text = reader.result;

              // console.log('reader.onload', text);

              const promise = crypto.subtle.digest({name: 'SHA-256'},   this.convertStringToArrayBufferView(text));

              promise.then( (result) => {
                // console.log('result', result);
                const hashValue = this.convertArrayBufferToHexaDecimal(result);
                document.getElementById('fileHash').textContent = hashValue;
              });
            };

            reader.readAsText(oFiles[0]);
          },

          convertArrayBufferToHexaDecimal(buffer) {
            const data_view = new DataView(buffer);
            let iii, len, hex = '', c;

            for (iii = 0, len = data_view.byteLength; iii < len; iii += 1) {
                c = data_view.getUint8(iii).toString(16);
                if (c.length < 2) {
                    c = '0' + c;
                }

                hex += c;
            }

            return hex;
          },

          convertStringToArrayBufferView(str) {
            const bytes = new Uint8Array(str.length);
            for (let iii = 0; iii < str.length; iii++) {
                bytes[iii] = str.charCodeAt(iii);
            }

            return bytes;
          },
        },
    };

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

#dropZone {
  width: 200px;
  height: 100px;
  border: 5px solid #353475;
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

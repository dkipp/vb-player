<template>
    <div class="container">


        <div v-for="cueId in cues.currentCueIds" :key="cueId" style="margin:1em 0">
            <span>{{cueId}}</span>
        </div>
    </div>
</template>

<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { State, Action, Getter } from 'vuex-class';
    import { CuesState, Cue } from '../vuex/cues/types';
    // const namespace: string = 'cues';

    @Component
    export default class ActiveCues extends Vue {
        @State('cues') public cues!: CuesState;
        @Getter('activeTrackCues', { namespace: 'cues' }) public activeTrackCues!: any;

        /*
        @Watch('activeTrackCues')
        public onActiveTrackCuesChanged(val: string, oldVal: string) {
          // console.log('onActiveTrackCuesChanged');
        }
        */

    }
</script>

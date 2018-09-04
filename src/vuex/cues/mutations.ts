import { MutationTree } from 'vuex';
import { CuesState, Track, Cue } from './types';

export const mutations: MutationTree<CuesState> = {

    trackLoaded(state, payload: Track) {
        state.tracks.push(payload);
    },

    addTrack(state, payload) {
        const t: Track = {
            id: payload.id || `track${('0' + state.tracks.length).slice(-2)}`,
            label: payload.label || `Track ${('0' + state.tracks.length).slice(-2)}`,
            cues: payload.cues || [],
        };
        state.tracks.push(t);
    },

    addRandomCues(state, payload) {

        const idx: number = state.tracks.length || 0;

        for (let i = 0; i < payload.count; i++) {
            state.tracks[idx - 1].cues.push({
                id: (Math.random() + 1).toString(36).substring(2, 5),
                time: Math.random(),
                // tslint:disable-next-line:no-bitwise
                data: Math.random(),
            });
        }
    },

    toggleActiveTrack(state, payload) {

        if (state.activeTrackIds.includes(payload.id)) {
            // console.log('no key like:', payload.id);
            // state.activeTrackIds.splice(state.activeTrackIds.findIndex(payload.id), 1);
            state.activeTrackIds = state.activeTrackIds.filter( (id) => id !== payload.id);
        } else {
            state.activeTrackIds.push(payload.id);
        }
    },

    setCurrentCueIds(state, payload) {
        state.currentCueIds = payload.cueIds;
    },
};

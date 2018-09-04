import { ActionTree } from 'vuex';
import { CuesState, Track, Cue } from './types';
import { RootState } from '../types';


export const actions: ActionTree<CuesState, RootState> = {

  addRandomCues({commit}) {
    commit('addTrack', {});
    commit('addRandomCues', {track: 0, count: 20});
  },

  setCurrentCueIds({commit}, ids) {
    // console.log(ids);
    commit('setCurrentCueIds', {cueIds: ids});
  },

  toggleActiveTrack({commit}, trackId) {
    commit('toggleActiveTrack', {id: trackId});
  },

  activeTrackCues({ state }): Cue[] {
    const list: Cue[] = [];

    // return this.$store.state.todos.filter((todo) => todo.done).length;
    state.tracks.forEach( (track) => {
      if (state.activeTrackIds.includes(track.id)) {
        list.push(...track.cues);
      }
    });

    return list;
  },
};

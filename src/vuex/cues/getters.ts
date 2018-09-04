import { GetterTree } from 'vuex';
import { CuesState, Cue } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CuesState, RootState> = {
  activeTrackCues(state): Cue[] {
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

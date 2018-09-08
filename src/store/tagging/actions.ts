import { ActionTree } from 'vuex';
import { TaggingState, Tag } from './types';
import { RootState } from '../types';


export const actions: ActionTree<TaggingState, RootState> = {

  addRandomTags({commit}) {
    commit('addRandomTags', {count: 20});
  },

  setCurrentTagIds({commit}, ids) {
    commit('setCurrentTagIds', {Ids: ids});
  },
};

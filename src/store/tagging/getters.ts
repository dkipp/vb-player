import { GetterTree } from 'vuex';
import { TaggingState, Tag } from './types';
import { RootState } from '../types';

export const getters: GetterTree<TaggingState, RootState> = {

  getTagById: (state) => (tId: string) => {
    return state.tags.find( (tag) => tag.id === tId);
  },
};

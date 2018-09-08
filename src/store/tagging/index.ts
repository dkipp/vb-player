import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { TaggingState } from './types';
import { RootState } from '../types';

export const state: TaggingState = {
    tags: [],
    currentTagIds: [],
};

const namespaced: boolean = true;

export const tagging: Module<TaggingState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

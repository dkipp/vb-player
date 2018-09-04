import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CuesState } from './types';
import { RootState } from '../types';

export const state: CuesState = {
    tracks: [],
    activeTrackIds: [],
    currentCueIds: [],
};

const namespaced: boolean = true;

export const cues: Module<CuesState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

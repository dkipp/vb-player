import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';

import { RootState } from './types';
import { profile } from './profile/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1', // a simple property
    player: null,
  },
  modules: {
    profile,
  },
  /*
  state: {
    count: 0,
    player: null,
    activeCues: [],
  },
  mutations: {
    setPlayer(state, val) {
      state.player = val;
    },
    setCue(state, val) {
      state.activeCues = val;
    },
  },
  actions: {

  },
  getters: {
    player: (state) => {
      return state.player;
    },
  },
  */
};

export default new Vuex.Store<RootState>(store);

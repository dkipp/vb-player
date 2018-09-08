import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';

import { RootState } from './types';
import { profile } from './profile/index';
import { tagging } from './tagging/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1', // a simple property
    player: null,
  },
  modules: {
    profile,
    tagging,
  },
};

export default new Vuex.Store<RootState>(store);

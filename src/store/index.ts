import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';
import VuexPersist from 'vuex-persistfile';

import { RootState } from './types';
import { profile } from './profile/index';
import { tagging } from './tagging/index';

const persist = new VuexPersist({
  path: 'src/data',
});

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
  plugins: [persist.subscribe()],
};

export default new Vuex.Store<RootState>(store);

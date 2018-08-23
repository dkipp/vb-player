import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
});

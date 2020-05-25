import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    arrayToSort: [],
  },
  getters: {},
  mutations: {
    setArray: (state, arrayToSort) => (state.arrayToSort = arrayToSort),
  },
  actions: {
    setArray({ commit, arrayToSort }) {
      commit('setArray', arrayToSort);
    },
  },
});

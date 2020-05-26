import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    arrayToSort: [],
  },
  getters: {
    getArrayToSort: (state) => {
      console.log('getting array');
      return state.arrayToSort;
    },
  },
  mutations: {
    setArray: (state, arrayToSort) => (state.arrayToSort = arrayToSort),
  },
  actions: {
    setArray({ commit, arrayToSort }) {
      commit('setArray', arrayToSort);
    },
  },
};

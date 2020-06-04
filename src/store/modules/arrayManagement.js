import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  modules: {
    arrayManagement: {
      namespaced: true,
      state: {
        arrayToSort: [],
        swaps: 0,
        steps: 0,
        sorting: false,
        sorted: false,
        forceStop: false,
        paused: true,
      },
      getters: {
        getArrayToSort: (state) => {
          return state.arrayToSort;
        },
        getSwaps: (state) => {
          return state.swaps;
        },
        getSteps: (state) => {
          return state.steps;
        },
        isSorting: (state) => {
          return state.sorting;
        },
        isSorted: (state) => {
          return state.sorted;
        },
        isForceStop: (state) => {
          return state.forceStop;
        },
        isPaused: (state) => {
          return state.paused;
        },
      },
      mutations: {
        setArray: (state, arrayToSort) => (state.arrayToSort = arrayToSort),
        forceStop: (state) => (state.isForceStop = !state.isForceStop),
      },
      actions: {
        setArray({ commit }, arrayToSort) {
          commit('setArray', arrayToSort);
        },
        forceStop({ commit }) {
          commit('forceStop');
        },
      },
    },
  },
};

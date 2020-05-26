import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    strokeWidth: 5,
    stageWidth: 200,
    stageHeight: 200,
  },
  getters: {
    getStageWidth: (state) => state.stageWidth,
    getStageHeight: (state) => state.stageHeight,
  },
  mutations: {
    setStageWidth: (state, stageWidth) => (state.stageWidth = stageWidth),
    setStageHeight: (state, stageHeight) => (state.stageHeight = stageHeight),
  },
  actions: {
    setStageWidth({ commit, stageWidth }) {
      commit('setStageWidth', stageWidth);
    },
    setStageHeight({ commit, stageHeight }) {
      commit('setStageHeight', stageHeight);
    },
  },
};

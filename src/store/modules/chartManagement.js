import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    stageWidth: 800,
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
    setStageWidth({ commit }, stageWidth) {
      // console.log('stageWidth ', stageWidth);
      commit('setStageWidth', stageWidth);
    },
    setStageHeight({ commit }, stageHeight) {
      // console.log('stageHeight ', stageHeight);
      commit('setStageHeight', stageHeight);
    },
  },
};

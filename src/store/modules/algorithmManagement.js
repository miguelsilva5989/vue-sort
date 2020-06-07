import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    algorithms: ['Bubble Sort', 'Quick Sort', 'Heap Sort', 'Merge Sort'],
    selectedAlg: 0,
  },
  getters: {
    getSelectedAlgorithm: (state) => {
      return state.algorithms[state.selectedAlg];
    },
    getSelectedAlgorithmId: (state) => {
      return state.selectedAlg;
    },
  },
  mutations: {
    setAlgorithm: (state, algo) => (state.selectedAlg = algo),
  },
  actions: {
    setAlgorithm({ commit }, algo) {
      commit('setAlgorithm', algo);
      // if (rootState.arrayManagement.forceStop) {
      // }
    },
  },
};

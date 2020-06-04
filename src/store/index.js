import Vue from 'vue';
import Vuex from 'vuex';
import arrayManagement from './modules/arrayManagement';
import chartManagement from './modules/chartManagement';
import algorithmManagement from './modules/algorithmManagement';
import bubbleSort from './modules/bubbleSort';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    arrayManagement,
    chartManagement,
    algorithmManagement,
    bubbleSort,
  },
});

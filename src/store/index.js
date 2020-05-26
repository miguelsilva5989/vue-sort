import Vue from 'vue';
import Vuex from 'vuex';
import arrayManagement from './modules/arrayManagement';
import chartManagement from './modules/chartManagement';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    arrayManagement,
    chartManagement,
  },
});

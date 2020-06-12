import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  actions: {
    async merge({ commit }, { left, right }) {
      let resultArray = [],
        leftIdx = 0,
        rightIdx = 0;

      // to concatenate values with the resultArray in order
      while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
          resultArray.push(left[leftIdx]);
          commit('arrayManagement/incrementSteps', null, { root: true });
          leftIdx++;
        } else {
          resultArray.push(right[rightIdx]);
          commit('arrayManagement/incrementSteps', null, { root: true });
          rightIdx++;
        }
      }

      return resultArray
        .concat(left.slice(leftIdx))
        .concat(right.slice(rightIdx));
    },
    async mergeSortHelper({ dispatch }, { inputArr }) {
      if (inputArr.length <= 1) {
        return inputArr;
      }
      const middle = Math.floor(inputArr.length / 2);

      // divide array into left and right
      const left = inputArr.slice(0, middle);
      const right = inputArr.slice(middle);

      return dispatch('merge', {
        left: await dispatch('mergeSortHelper', { inputArr: left }),
        right: await dispatch('mergeSortHelper', { inputArr: right }),
      }).then((res) => {
        console.log(res);
        return res;
      });
    },
    async mergeSort({ commit, dispatch, rootState }) {
      let inputArr = await dispatch('arrayManagement/initSort', null, {
        root: true,
      }).then((res) => {
        return res;
      });

      await dispatch('mergeSortHelper', { inputArr });

      if (!rootState.arrayManagement.forceStop) {
        commit('arrayManagement/setIsSorted', true, { root: true });
        commit('arrayManagement/changeAllColors', '#00AA66', { root: true });
      }
      commit('arrayManagement/setIsForceStop', false, { root: true });
      commit('arrayManagement/setIsSorting', false, { root: true });
      commit('arrayManagement/setIsPaused', true, { root: true });
    },
  },
};

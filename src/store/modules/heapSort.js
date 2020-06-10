import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  actions: {
    async createHeap({ dispatch, rootState }, { inputArr, length, index }) {
      let max = index;
      let left = index * 2 + 1;
      let right = left + 1;

      if (left < length && inputArr[left] > inputArr[max]) {
        max = left;
      }
      if (right < length && inputArr[right] > inputArr[max]) {
        max = right;
      }

      if (max != index) {
        var temp = inputArr[index];
        inputArr[index] = inputArr[max];
        rootState.arrayManagement.arrayToSort[index].y = inputArr[max];

        inputArr[max] = temp;
        rootState.arrayManagement.arrayToSort[max].y = temp;
        await dispatch('createHeap', {
          inputArr: inputArr,
          length: length,
          index: max,
        });
      }
    },
    async heapSort({ commit, dispatch, rootState }) {
      let inputArr = await dispatch('arrayManagement/initSort', null, {
        root: true,
      }).then((res) => {
        return res;
      });
      let arrayLength = inputArr.length;
      let i = Math.floor(arrayLength / 2 - 1);
      let j = arrayLength - 1;

      while (i >= 0) {
        await dispatch('createHeap', {
          inputArr: inputArr,
          length: arrayLength,
          index: i,
        });
        i--;
      }

      while (j >= 0) {
        var temp = inputArr[0];
        inputArr[0] = inputArr[j];
        rootState.arrayManagement.arrayToSort[0].y = inputArr[j];

        inputArr[j] = temp;
        rootState.arrayManagement.arrayToSort[j].y = temp;
        await dispatch('createHeap', {
          inputArr: inputArr,
          length: j,
          index: 0,
        });
        j--;
      }

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

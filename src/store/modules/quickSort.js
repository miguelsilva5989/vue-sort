import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  actions: {
    async quickSort({ commit, dispatch, rootState }) {
      let inputArr = await dispatch('arrayManagement/initSort', null, {
        root: true,
      }).then((res) => {
        return res;
      });

      await dispatch('quickSortHelper', {
        inputArr: inputArr,
        left: 0,
        right: inputArr.length - 1,
      });

      if (!rootState.arrayManagement.forceStop) {
        commit('arrayManagement/setIsSorted', true, { root: true });
        commit('arrayManagement/changeAllColors', '#00AA66', { root: true });
      }
      commit('arrayManagement/setIsForceStop', false, { root: true });
      commit('arrayManagement/setIsSorting', false, { root: true });
      commit('arrayManagement/setIsPaused', true, { root: true });
    },
    async quickSortHelper({ dispatch }, payload) {
      var index;
      if (payload.inputArr.length > 1) {
        index = await dispatch('partition', {
          inputArr: payload.inputArr,
          left: payload.left,
          right: payload.right,
        }); //index returned from partition

        if (payload.left < index - 1) {
          //more elements on the left side of the pivot
          dispatch('quickSortHelper', {
            inputArr: payload.inputArr,
            left: payload.left,
            right: index - 1,
          });
        }
        if (index < payload.right) {
          //more elements on the right side of the pivot
          dispatch('quickSortHelper', {
            inputArr: payload.inputArr,
            left: index,
            right: payload.right,
          });
        }
      }

      return payload.inputArr;
    },
    partition({ dispatch }, payload) {
      var pivot =
          payload.inputArr[Math.floor((payload.right + payload.left) / 2)], // middle element
        i = payload.left, // left pointer
        j = payload.right; // right pointer

      while (i <= j) {
        while (payload.inputArr[i] < pivot) {
          i++;
        }
        while (payload.inputArr[j] > pivot) {
          j--;
        }
        if (i <= j) {
          dispatch('swap', {
            inputArr: payload.inputArr,
            leftIndex: i,
            rightIndex: j,
          });
          i++;
          j--;
        }
      }
      return i;
    },
    swap({ rootState }, { inputArr, leftIndex, rightIndex }) {
      var temp = inputArr[leftIndex];

      inputArr[leftIndex] = inputArr[rightIndex];
      rootState.arrayManagement.arrayToSort[leftIndex].y = inputArr[rightIndex];

      inputArr[rightIndex] = temp;
      rootState.arrayManagement.arrayToSort[rightIndex].y = temp;
    },
  },
};

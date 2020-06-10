import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    arrayLength: 0,
  },
  actions: {
    async heapSort({ state, commit, dispatch, rootState }) {
      let inputArr = await dispatch('arrayManagement/initSort', null, {
        root: true,
      }).then((res) => {
        return res;
      });
      state.arrayLength = inputArr.length;

      for (var i = Math.floor(state.arrayLength / 2); i >= 0; i -= 1) {
        //if Stop button pressed
        if (rootState.arrayManagement.forceStop) {
          break;
        }
        // speed can be changed during sorting
        let sortSpeed = rootState.arrayManagement.selectedSortSpeed;

        await dispatch('heapRoot', {
          inputArr: inputArr,
          index: i,
          sortSpeed,
        });
      }

      for (i = inputArr.length - 1; i > 0; i--) {
        //if Stop button pressed
        if (rootState.arrayManagement.forceStop) {
          break;
        }
        // speed can be changed during sorting
        let sortSpeed = rootState.arrayManagement.selectedSortSpeed;

        await dispatch('swap', {
          inputArr: inputArr,
          leftIndex: 0,
          rightIndex: i,
          sortSpeed: sortSpeed,
        });

        state.arrayLength--;

        await dispatch('heapRoot', {
          inputArr: inputArr,
          index: 0,
          sortSpeed,
        });
      }

      if (!rootState.arrayManagement.forceStop) {
        commit('arrayManagement/setIsSorted', true, { root: true });
        commit('arrayManagement/changeAllColors', '#00AA66', { root: true });
      }
      commit('arrayManagement/setIsForceStop', false, { root: true });
      commit('arrayManagement/setIsSorting', false, { root: true });
      commit('arrayManagement/setIsPaused', true, { root: true });
    },
    async heapRoot({ state, dispatch }, { inputArr, index, sortSpeed }) {
      var left = 2 * index + 1;
      var right = 2 * index + 2;
      var max = index;

      console.log(left, right, max);
      console.log(state.arrayLength);

      if (left < state.arrayLength && inputArr[left] > inputArr[max]) {
        max = left;
      }

      if (right < state.arrayLength && inputArr[right] > inputArr[max]) {
        max = right;
      }

      if (max != index) {
        await dispatch('swap', {
          inputArr: inputArr,
          leftIndex: index,
          rightIndex: max,
          sortSpeed: sortSpeed,
        });
        await dispatch('heapRoot', {
          inputArr: inputArr,
          index: max,
          sortSpeed: sortSpeed,
        });
      }
    },
    async swap(
      { commit, dispatch, rootState },
      { inputArr, leftIndex, rightIndex, sortSpeed }
    ) {
      commit('arrayManagement/incrementSwaps', null, { root: true });

      await dispatch('arrayManagement/timer', sortSpeed);
      dispatch('arrayManagement/changeColor', {
        index: leftIndex,
        color: 'red',
      });
      dispatch('arrayManagement/changeColor', {
        index: rightIndex,
        color: 'red',
      });
      await dispatch('arrayManagement/timer', sortSpeed);

      // swap logic
      var temp = inputArr[leftIndex];

      console.log(inputArr);
      console.log(inputArr[leftIndex]);
      console.log(inputArr[rightIndex]);
      inputArr[leftIndex] = inputArr[rightIndex];
      rootState.arrayManagement.arrayToSort[leftIndex].y = inputArr[rightIndex];

      inputArr[rightIndex] = temp;
      rootState.arrayManagement.arrayToSort[rightIndex].y = temp;
      console.log(inputArr);
      // END swap logic

      //change back to blue after swapping
      dispatch('arrayManagement/changeColor', {
        index: leftIndex,
        color: 'blue',
      });
      dispatch('arrayManagement/changeColor', {
        index: rightIndex,
        color: 'blue',
      });
      await dispatch('arrayManagement/timer', sortSpeed);
    },
  },
};

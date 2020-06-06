import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  actions: {
    async quickSort({ commit, dispatch, rootState }) {
      const sortSpeed = rootState.arrayManagement.selectedSortSpeed;

      commit('arrayManagement/setIsSorting', true, { root: true });
      commit('arrayManagement/setIsSorted', false, { root: true });

      if (rootState.arrayManagement.paused) {
        commit('arrayManagement/setIsPaused', false, { root: true });
        commit('arrayManagement/setIsForceStop', false, { root: true });
      } else {
        dispatch('arrayManagement/resetCounters', null, { root: true });
      }

      let inputArr = rootState.arrayManagement.arrayToSort.map((z) => z.y); //convert x in objects to an array
      // let maxSortedValues = inputArr.slice(); //checks if values are already sorted and will not be moved again

      const arrayLen = inputArr.length;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < arrayLen; i++) {
          //if Stop button pressed
          if (rootState.arrayManagement.forceStop) {
            break;
          }

          commit('arrayManagement/incrementSteps', null, { root: true });

          // change to cyan the values which are being analysed
          if (i + 1 < arrayLen) {
            dispatch('arrayManagement/changeColor', {
              index: i,
              color: 'cyan',
            });
            dispatch('arrayManagement/changeColor', {
              index: i + 1,
              color: 'cyan',
            });
            await dispatch('arrayManagement/timer', sortSpeed);
          }

          // Bubble Sort Logic
          let tmp = inputArr[i];
          if (inputArr[i] > inputArr[i + 1]) {
            commit('arrayManagement/incrementSwaps', null, { root: true });

            dispatch('arrayManagement/changeColor', { index: i, color: 'red' });
            dispatch('arrayManagement/changeColor', {
              index: i + 1,
              color: 'red',
            });
            await dispatch('arrayManagement/timer', sortSpeed);

            inputArr[i] = inputArr[i + 1];
            rootState.arrayManagement.arrayToSort[i].y = inputArr[i + 1];

            inputArr[i + 1] = tmp;
            rootState.arrayManagement.arrayToSort[i + 1].y = tmp;

            swapped = true;
          }
          // END Bubble Sort Logic

          //change back to blue after swapping
          if (i + 1 < arrayLen) {
            await dispatch('arrayManagement/timer', sortSpeed);
            dispatch('arrayManagement/changeColor', {
              index: i,
              color: 'blue',
            });
            dispatch('arrayManagement/changeColor', {
              index: i + 1,
              color: 'blue',
            });
          }
        }
      } while (swapped);

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

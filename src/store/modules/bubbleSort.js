import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  actions: {
    async bubbleSort({ commit, dispatch, rootState }) {
      let inputArr = await dispatch('arrayManagement/initSort', null, {
        root: true,
      }).then((res) => {
        return res;
      });

      const arrayLen = inputArr.length;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < arrayLen; i++) {
          // speed can be changed during sorting
          let sortSpeed = rootState.arrayManagement.selectedSortSpeed;

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
          if (inputArr[i] > inputArr[i + 1]) {
            let tmp = inputArr[i];
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
            // in fastest speed, skip this timer in order to sort faster visually
            if (sortSpeed != 1) {
              await dispatch('arrayManagement/timer', sortSpeed);
            }
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

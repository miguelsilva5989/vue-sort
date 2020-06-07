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
          await dispatch('quickSortHelper', {
            inputArr: payload.inputArr,
            left: payload.left,
            right: index - 1,
          });
        }
        if (index < payload.right) {
          //more elements on the right side of the pivot
          await dispatch('quickSortHelper', {
            inputArr: payload.inputArr,
            left: index,
            right: payload.right,
          });
        }
      }

      return payload.inputArr;
    },
    async partition({ rootState, commit, dispatch }, payload) {
      //if Stop button pressed
      if (rootState.arrayManagement.forceStop) {
        return;
      }
      // speed can be changed during sorting
      let sortSpeed = rootState.arrayManagement.selectedSortSpeed;

      var pivotPos = Math.floor((payload.right + payload.left) / 2);
      var pivot = payload.inputArr[pivotPos], // middle element
        i = payload.left, // left pointer
        j = payload.right; // right pointer

      dispatch('arrayManagement/changeColor', {
        index: pivotPos,
        color: 'orange',
      });
      await dispatch('arrayManagement/timer', sortSpeed);

      while (i <= j) {
        commit('arrayManagement/incrementSteps', null, { root: true });

        while (payload.inputArr[i] < pivot) {
          dispatch('arrayManagement/changeColor', {
            index: i,
            color: 'blue',
          });
          await dispatch('arrayManagement/timer', sortSpeed);

          i++;

          dispatch('arrayManagement/changeColor', {
            index: i,
            color: 'cyan',
          });
          await dispatch('arrayManagement/timer', sortSpeed);
        }
        dispatch('arrayManagement/changeColor', {
          index: i,
          color: 'blue',
        });
        await dispatch('arrayManagement/timer', sortSpeed);

        while (payload.inputArr[j] > pivot) {
          dispatch('arrayManagement/changeColor', {
            index: j,
            color: 'blue',
          });
          await dispatch('arrayManagement/timer', sortSpeed);
          j--;
          dispatch('arrayManagement/changeColor', {
            index: j,
            color: 'cyan',
          });
          await dispatch('arrayManagement/timer', sortSpeed);
        }
        dispatch('arrayManagement/changeColor', {
          index: j,
          color: 'blue',
        });
        await dispatch('arrayManagement/timer', sortSpeed);

        if (i <= j) {
          await dispatch('swap', {
            inputArr: payload.inputArr,
            leftIndex: i,
            rightIndex: j,
            sortSpeed: sortSpeed,
          });

          // change pivot color back to orange in case it was changed to red in the swap
          if (i == pivotPos || j == pivotPos) {
            dispatch('arrayManagement/changeColor', {
              index: pivotPos,
              color: 'orange',
            });
            await dispatch('arrayManagement/timer', sortSpeed);
          }

          i++;
          j--;
        }
      }
      //change pivot back to blue color
      dispatch('arrayManagement/changeColor', {
        index: pivotPos,
        color: 'blue',
      });
      await dispatch('arrayManagement/timer', sortSpeed);

      return i;
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

      inputArr[leftIndex] = inputArr[rightIndex];
      rootState.arrayManagement.arrayToSort[leftIndex].y = inputArr[rightIndex];

      inputArr[rightIndex] = temp;
      rootState.arrayManagement.arrayToSort[rightIndex].y = temp;
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

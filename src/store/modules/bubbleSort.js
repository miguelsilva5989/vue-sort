import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  mutations: {
    bubbleSort: () => console.log('bubbleSort'),
  },
  actions: {
    timer(ms) {
      return new Promise((res) => setTimeout(res, ms));
    },
    changeColor({ rootState }, payload) {
      rootState.arrayManagement.arrayToSort[payload.index].stroke =
        payload.color;
    },
    async bubbleSort({ commit, dispatch, rootState }) {
      // const sortSpeed = rootState.arrayManagement.selectedSortSpeed;

      commit('arrayManagement/setIsSorting', true, { root: true });

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
            dispatch('changeColor', { index: i, color: 'cyan' });
            dispatch('changeColor', { index: i + 1, color: 'cyan' });
            await dispatch('timer', 1000);
          }
        }
      } while (swapped);

      commit('arrayManagement/setIsForceStop', false, { root: true });
      commit('arrayManagement/setIsSorting', false, { root: true });
      commit('arrayManagement/setIsPaused', true, { root: true });
      if (!rootState.arrayManagement.forceStop) {
        commit('arrayManagement/setIsSorted', true, { root: true });
      }

      // do {
      //   swapped = false;
      //   for (let i = 0; i < arrayLen; i++) {
      //     if (rootState.arrayManagement.forceStop) {
      //       //if Stop button pressed
      //       break;
      //     }

      //     this.steps++;

      //     // change to cyan the values which are being analysed
      //     if (
      //       i + 1 < arrayLen &&
      //       !maxSortedValues.includes(this.arrayToSort[i + 1])
      //     ) {
      //       this.changeColor(i, 'cyan');
      //       this.changeColor(i + 1, 'cyan');
      //       await this.timer(sortSpeed);
      //     }

      //     let tmp = inputArr[i];
      //     if (inputArr[i] > inputArr[i + 1]) {
      //       this.swaps++;

      //       this.changeColor(i, 'red'); //change to red if order is wrong
      //       this.changeColor(i + 1, 'red'); //change to red if order is wrong
      //       await this.timer(sortSpeed);

      //       inputArr[i] = inputArr[i + 1];
      //       this.arrayToSort[i].y = inputArr[i + 1];

      //       inputArr[i + 1] = tmp;
      //       this.arrayToSort[i + 1].y = tmp;

      //       swapped = true;
      //     }

      //     //change to green after swapping
      //     if (
      //       i + 1 < arrayLen &&
      //       !maxSortedValues.includes(this.arrayToSort[i + 1])
      //     ) {
      //       await this.timer(sortSpeed);
      //       this.changeColor(i, 'blue');
      //       this.changeColor(i + 1, 'blue');
      //     }

      //     //if value will not be sorted again change to green
      //     if (Math.max(...maxSortedValues) === tmp) {
      //       await this.timer(sortSpeed);
      //       maxSortedValues.pop(tmp);
      //       if (i + 1 < arrayLen) {
      //         this.arrayToSort[i + 1].stroke = 'green';
      //       }
      //     }
      //   }
      // } while (swapped);

      // if (this.forceStop) {
      //   this.forceStop = false;
      //   this.sorting = false;
      //   this.paused = true;
      // } else {
      //   this.forceStop = false;
      //   this.sorting = false;
      //   this.paused = true;
      //   this.sorted = true;
      // }

      // commit('placeholder');
    },
  },
};

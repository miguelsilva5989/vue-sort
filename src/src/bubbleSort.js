import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  methods: {
    async bubbleSort() {
      var sortSpeed = this.speedValues[this.sortSpeed];
      console.log(sortSpeed);

      this.sorting = true;

      if (this.paused) {
        this.paused = false;
        this.forceStop = false;
      } else {
        this.swaps = 0; //reset swaps number
        this.steps = 0; //reset steps number
      }

      let inputArr = this.arrayToSort.map((z) => z.y); //convert x in objects to an array
      let maxSortedValues = inputArr.slice(); //checks if values are already sorted and will not be moved again

      let len = inputArr.length;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < len; i++) {
          if (this.forceStop) {
            //if Stop button pressed
            break;
          }

          this.steps++;

          // change to green the values which are being analysed
          if (
            i + 1 < len &&
            !maxSortedValues.includes(this.arrayToSort[i + 1])
          ) {
            this.changeColor(i, 'cyan');
            this.changeColor(i + 1, 'cyan');
            await this.timer(sortSpeed);
          }

          let tmp = inputArr[i];
          if (inputArr[i] > inputArr[i + 1]) {
            this.swaps++;

            this.changeColor(i, 'red'); //change to red if order is wrong
            this.changeColor(i + 1, 'red'); //change to red if order is wrong
            await this.timer(sortSpeed);

            inputArr[i] = inputArr[i + 1];
            this.arrayToSort[i].y = inputArr[i + 1];

            inputArr[i + 1] = tmp;
            this.arrayToSort[i + 1].y = tmp;

            swapped = true;
          }

          //change to green after swapping
          if (
            i + 1 < len &&
            !maxSortedValues.includes(this.arrayToSort[i + 1])
          ) {
            await this.timer(sortSpeed);
            this.changeColor(i, 'blue');
            this.changeColor(i + 1, 'blue');
          }

          //if value will not be sorted again change to green
          if (Math.max(...maxSortedValues) === tmp) {
            await this.timer(sortSpeed);
            maxSortedValues.pop(tmp);
            if (i + 1 < len) {
              this.arrayToSort[i + 1].stroke = 'green';
            }
          }
        }
      } while (swapped);

      if (this.forceStop) {
        this.forceStop = false;
        this.sorting = false;
        this.paused = true;
      } else {
        this.forceStop = false;
        this.sorting = false;
        this.paused = true;
        this.sorted = true;
      }
    },
  },
};

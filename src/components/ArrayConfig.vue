<template>
  <v-card-text>
    <span class="subheading font-weight-light mr-3">Array Size</span>
    <span class="display-2 font-weight-light" v-text="arraySize"></span>
    <v-slider
      v-model="arraySize"
      :disabled="isSorting"
      :color="color"
      :min="sliderMin"
      :max="sliderMax"
      thumb-label
      @input="generateArray"
    >
      <template v-slot:prepend>
        <v-icon :color="color" @click="decrementSize();generateArray();">mdi-minus</v-icon>
      </template>
      <template v-slot:append>
        <v-icon :color="color" @click="incrementSize();generateArray();">mdi-plus</v-icon>
      </template>
    </v-slider>

    <span class="subheading font-weight-light mr-3">Sort Speed</span>
    <span class="display-1 font-weight-light" v-text="speedLabels[sortSpeed]"></span>
    <v-slider
      v-model="sortSpeed"
      :tick-labels="speedLabels"
      :disabled="isSorting"
      ticks="always"
      tick-size="4"
      step="1"
      :max="4"
    >
      <template v-slot:prepend>
        <v-icon @click="decrementSpeed">mdi-minus</v-icon>
      </template>
      <template v-slot:append>
        <v-icon @click="incrementSpeed">mdi-plus</v-icon>
      </template>
    </v-slider>

    <div class="mt-5">
      <v-btn
        :disabled="isSorting"
        small
        class="mr-4"
        outlined
        color="primary"
        @click="generateArray"
      >Generate New Array</v-btn>
      <v-btn
        :hidden="isSorting||!isPaused"
        :disabled="isSorted"
        small
        class="mr-4"
        outlined
        color="green"
        @click="handleSortingFunction"
      >Sort</v-btn>
      <v-btn
        :hidden="!isSorting"
        small
        class="mr-4"
        outlined
        color="red"
        @click="forceStop"
      >Stop</v-btn>
      <span class="subheading font-weight-light ml-2 mr-1">Steps: {{ steps }}</span>
      <span class="subheading font-weight-light mx-4">Swaps: {{ swaps }}</span>
      <span class="subheading font-weight-light ml-5">Selected Sorting Algorithm: {{ getSelectedAlgorithm }}</span>
    </div>
  </v-card-text>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ArrayConfig",

  data: () => ({
    sliderMin: 5,
    sliderMax: 200,
    arraySize: 30,
    sortSpeed: 2,
    speedLabels: ['Snail', 'Turtle', 'Rabbit', 'Cheetah', 'Golden Eagle'],
    speedValues: [200, 100, 50, 25, 1],
  }),

  computed: {
    ...mapGetters(["getStageHeight", "getStageWidth", "getSwaps","getSteps","isSorting","isSorted","isForceStop","isPaused", "getSelectedAlgorithm"]),
    color() {
      if (this.arraySize < this.sliderMax * 0.25) return "blue";
      if (this.arraySize < this.sliderMax * 0.5) return "green";
      if (this.arraySize < this.sliderMax * 0.75) return "orange";
      return "red";
    }
  },
  created() {
    this.generateArray();
  },
  
  methods: {
    ...mapActions(["setArray", "forceStop", "bubbleSort"]),
    handleSortingFunction() {
      var fnMap = {
        "Bubble Sort": this.bubbleSort,
      }
      fnMap[this.getSelectedAlgorithm]()
    },
    generateArray() {
      this.sorted = false;
      // reset counters
      this.swaps = 0;
      this.steps = 0;

      var array = [];
      // calculates middle point in chart area
      const mid_x = Math.floor(this.getStageWidth / 2) + 100; // first x position in chart; 100 is the offset of left pane

      var strokeWidth = this.arraySize < 25 ? 40 : this.arraySize < 50 ? 20 : this.arraySize < 75 ? 10 : this.arraySize < 100 ? 7 : this.arraySize < 150 ? 4 : 2;
      var distanceBtwnPoints = this.arraySize < 25 ? 45 : this.arraySize < 50 ? 23 : this.arraySize < 75 ? 13 : this.arraySize < 100 ? 11 : this.arraySize < 150 ? 7 : 5;

      let left_x = mid_x
      let right_x = mid_x
      let next_x = 0
      while (array.length < this.arraySize) {
        let rand = Math.floor(Math.random() * this.getStageHeight) + 10;        

        // if value not yet in array
        if (array.findIndex(val => val.y === rand) === -1) {
          //used to display X positions to the left and right of middle point
          if (array.length < Math.floor(this.arraySize / 2)) {
            left_x -= distanceBtwnPoints
            next_x = left_x
          }
          else if (array.length > Math.floor(this.arraySize / 2)) {
            right_x += distanceBtwnPoints
            next_x = right_x
          }
          else {
            next_x = right_x
          }

          let obj = {
            id: rand,
            y: rand,
            stroke: "blue",
            strokeWidth: strokeWidth,
            x: next_x,
          };
          
          array.push(obj);
        }
      }
      this.setArray(array);
    },
    decrementSize() {
      this.arraySize -= 10;
    },
    incrementSize() {
      this.arraySize += 10;
    },
    decrementSpeed() {
      this.sortSpeed -= 1;
    },
    incrementSpeed() {
      this.sortSpeed += 1;
    }
  }

};
</script>

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
      <span class="subheading font-weight-light ml-2 mr-1">Steps: {{ getSteps }}</span>
      <span class="subheading font-weight-light mx-4">Swaps: {{ getSwaps }}</span>
      <span class="subheading font-weight-light ml-5">Selected Sorting Algorithm: </span>
      <span class="title font-weight-bold ml-1">{{ $store.getters.getSelectedAlgorithm }}</span>
    </div>
  </v-card-text>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("arrayManagement");

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
  created() {
    this.generateArray();
  },

  computed: {
    
    ...mapGetters(["getSwaps","getSteps","isSorting","isSorted","isPaused"]),
    color() {
      if (this.arraySize < this.sliderMax * 0.25) return "blue";
      if (this.arraySize < this.sliderMax * 0.5) return "green";
      if (this.arraySize < this.sliderMax * 0.75) return "orange";
      return "red";
    }
  },


  watch: {    
    sortSpeed(newValue) {
      this.$store.commit("arrayManagement/setSortSpeed", this.speedValues[newValue])
    }
  },
  
  methods: {
    ...mapActions(["setArray", "forceStop"]),
    async handleSortingFunction() {
      var fnMap = {
        "Bubble Sort": "bubbleSort",
      }
      this.$store.dispatch(fnMap[this.$store.getters.getSelectedAlgorithm])
    },
    generateArray() {
      //used to place the chart value in the correct position of the array. if we would just push the values to the array, the values would be sorted starting from the center and moving to the left size, and then from the center to the right side
      let array = Array.apply(null, Array(this.arraySize)).map(function (x, i) {return {
            id: i,
            y: 0,
            x: 0,
          };})
        
      // calculates middle point in chart area
      const mid_x = Math.floor(this.$store.getters.getStageWidth / 2) + 100; // first x position in chart; 100 is the offset of left pane

      var strokeWidth = this.arraySize < 25 ? 40 : this.arraySize < 50 ? 20 : this.arraySize < 75 ? 10 : this.arraySize < 100 ? 7 : this.arraySize < 150 ? 4 : 2;
      var distanceBtwnPoints = this.arraySize < 25 ? 45 : this.arraySize < 50 ? 23 : this.arraySize < 75 ? 13 : this.arraySize < 100 ? 11 : this.arraySize < 150 ? 7 : 5;

      let left_x = mid_x;
      let right_x = mid_x;
      let array_pos = Math.floor(this.arraySize / 2); //used to place the chart value in the correct position of the array. if we would just push the values to the array, the values would be sorted starting from the center and moving to the left size, and then from the center to the right side
      let next_x = 0;
      let i = 0;

      while (i < this.arraySize) {
        let rand = Math.floor(Math.random() * this.$store.getters.getStageHeight) + 10;

        // if value not yet in array
        if (array.findIndex(val => val.y === rand) === -1) {
          //used to display X positions to the left and right of middle point
          if (i < Math.floor(this.arraySize / 2)) {
            left_x -= distanceBtwnPoints
            array_pos -= 1
            next_x = left_x
          }
          else if (i > Math.floor(this.arraySize / 2)) {
            right_x += distanceBtwnPoints
            array_pos += 1
            next_x = right_x
          }
          else {
            array_pos = Math.floor(this.arraySize / 2)
            next_x = right_x
          }

          let obj = {
            id: rand,
            y: rand,
            stroke: "blue",
            strokeWidth: strokeWidth,
            x: next_x,
          };

          array[array_pos] = obj
          i++;
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

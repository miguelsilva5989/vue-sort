<template>
  <v-card-text>
    <span class="subheading font-weight-light mr-3">Array Size</span>
    <span class="display-2 font-weight-light" v-text="arraySize"></span>
    <v-slider
      v-model="arraySize"
      :disabled="sorting"
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
      :disabled="sorting"
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
        :disabled="sorting"
        small
        class="mr-4"
        outlined
        color="primary"
        @click="generateArray"
      >Generate New Array</v-btn>
      <v-btn
        :hidden="sorting||!paused"
        :disabled="sorted"
        small
        class="mr-4"
        outlined
        color="green"
        @click="bubbleSort"
      >Sort</v-btn>
      <v-btn
        :hidden="!sorting"
        small
        class="mr-4"
        outlined
        color="red"
        @click="forceStop = !forceStop"
      >Stop</v-btn>
      <span class="subheading font-weight-light ml-2 mr-1">Steps: {{ steps }}</span>
      <span class="subheading font-weight-light mx-4">Swaps: {{ swaps }}</span>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: "ArrayConfig",

  data: () => ({
    sliderMin: 3,
    sliderMax: 200,
    arraySize: 30,
    sortSpeed: 2,
    speedLabels: ["Snail", "Turtle", "Rabbit", "Cheetah", "Golden Eagle"],
    speedValues: [200, 100, 50, 25, 1],
    swaps: 0,
    steps: 0,
    sorting: false,
    sorted: false,
    forceStop: false,
    paused: true
  }),

  computed: {
    color() {
      if (this.arraySize < this.sliderMax * 0.25) return "blue";
      if (this.arraySize < this.sliderMax * 0.5) return "green";
      if (this.arraySize < this.sliderMax * 0.75) return "orange";
      return "red";
    }
  },

  methods: {
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
    },
    generateArray() {
      this.sorted = false;
      // reset counters
      this.swaps = 0;
      this.steps = 0;

      var array = [];
      var x = 5; //first position

      // var xIncrement = stageWidth / Math.pow(10, this.arraySize) + 10; // distance between points
      // console.log("xIncrement " + xIncrement);

      //resize height of lines
      // this.strokeWidth = stageWidth / Math.pow(10, this.arraySize) + 5;
      // console.log("strokeWidth " + this.strokeWidth);

      while (array.length < this.arraySize) {
        // var rand = Math.floor(Math.random() * maxHeight) + 10; //maxHeight is the canvas width size
        var rand = Math.floor(Math.random()) + 10; //maxHeight is the canvas width size
        // +10 as 10 is the minimum for the line in chart to become visisble
        var obj = {
          id: rand,
          y: rand,
          stroke: "blue"
        };
        if (array.findIndex(val => val.y === rand) === -1) {
          // x += xIncrement; // distance between points
          x += 10; // distance between points
          obj.x = x;
          array.push(obj);
        }
      }
      this.arrayToSort = array;
    }
  }

};
</script>

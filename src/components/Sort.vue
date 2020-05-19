<template>
  <v-container>
    <v-card-text>
      <span class="subheading font-weight-light mr-1">Array Size -></span>
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

      <span class="subheading font-weight-light mr-1">Sort Speed -></span>
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
    <v-stage :config="configKonva">
      <v-layer>
        <v-line
          ref="line{{item.id}}"
          v-for="item in array"
          :key="item.id"
          :config="{
            points: [item.x, 5, item.x, item.y], // x1, y1, x2, y2
            stroke: item.stroke,
            strokeWidth: strokeWidth,
            lineCap: 'round',
            lineJoin: 'round',
          }"
        ></v-line>
        <!-- <v-line :config="configLine"></v-line> -->
        <!-- <v-line :config="configLine2"></v-line> -->
      </v-layer>
    </v-stage>
    <!-- <span>{{ array }}</span> -->
  </v-container>
</template>

<script>
// var stageHeight = window.innerHeight - 225; //remove top pixels;
var stageWidth = (3 / 4) * window.innerWidth - 50; //minus left panel
var maxHeight = 450;

export default {
  name: "Sort",

  data: () => ({
    sliderMin: 3,
    sliderMax: 200,
    arraySize: 30,
    sortSpeed: 2,
    speedLabels: ["Snail", "Turtle", "Rabbit", "Cheetah", "Golden Eagle"],
    strokeWidth: 5,
    configKonva: {
      width: stageWidth,
      height: maxHeight
    },
    array: [],
    swaps: 0,
    steps: 0,
    sorting: false,
    sorted: false,
    forceStop: false,
    paused: true
    // configLine: {
    //   points: [50, 1, 50, 100], //[x1, y1, x2, y2, ....]
    //   stroke: "green",
    //   strokeWidth: 5,
    //   lineCap: "round",
    //   lineJoin: "round"
    // },
    // configLine2: {
    //   points: [5, 10, 30, 10], //[x1, y1, x2, y2]
    //   stroke: "blue",
    //   strokeWidth: 5,
    //   lineCap: "round",
    //   lineJoin: "round"
    // }
  }),

  mounted() {
    this.generateArray();
  },

  computed: {
    color() {
      if (this.arraySize < this.sliderMax * 0.25) return "blue";
      if (this.arraySize < this.sliderMax * 0.5) return "green";
      if (this.arraySize < this.sliderMax * 0.75) return "orange";
      return "red";
    }
  },

  methods: {
    generateArray() {
      this.sorted = false;
      // reset counters
      this.swaps = 0;
      this.steps = 0;

      var array = [];
      var x = 5; //first position

      var xIncrement = stageWidth / Math.pow(10, this.arraySize) + 10; // distance between points
      console.log("xIncrement " + xIncrement);

      //resize height of lines
      this.strokeWidth = stageWidth / Math.pow(10, this.arraySize) + 5;
      console.log("strokeWidth " + this.strokeWidth);

      while (array.length < this.arraySize) {
        var rand = Math.floor(Math.random() * maxHeight) + 10; //this.maxHeight is the canvas width size
        // +10 as 10 is the minimum for the line in chart to become visisble
        var obj = {
          id: rand,
          y: rand,
          stroke: "blue"
        };
        if (array.findIndex(val => val.y === rand) === -1) {
          x += xIncrement; // distance between points
          obj.x = x;
          array.push(obj);
        }
      }
      this.array = array;
    },
    //timer function
    timer(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    changeColor(index, color) {
      this.array[index].stroke = color;
    },
    async bubbleSort() {
      var sortSpeed = Math.pow(5, this.sortSpeed + 1); //+1 as it starts on 0

      this.sorting = true;

      if (this.paused) {
        this.paused = false;
        this.forceStop = false;
      } else {
        this.swaps = 0; //reset swaps number
        this.steps = 0; //reset steps number
      }

      let inputArr = this.array.map(z => z.y); //convert x in objects to an array
      let maxSortedValues = inputArr.slice(); //checks if values are already sorted and will not be moved again

      let len = inputArr.length;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < len; i++) {
          if (this.forceStop) { //if Stop button pressed
            break;
          }

          this.steps++;

          // change to green the values which are being analysed
          if (i + 1 < len && !maxSortedValues.includes(this.array[i + 1])) {
            this.changeColor(i, "cyan");
            this.changeColor(i + 1, "cyan");
            await this.timer(100 / sortSpeed);
          }

          let tmp = inputArr[i];
          if (inputArr[i] > inputArr[i + 1]) {
            this.swaps++;

            this.changeColor(i, "red"); //change to red if order is wrong
            this.changeColor(i + 1, "red"); //change to red if order is wrong
            await this.timer(100 / sortSpeed);

            inputArr[i] = inputArr[i + 1];
            this.array[i].y = inputArr[i + 1];

            inputArr[i + 1] = tmp;
            this.array[i + 1].y = tmp;

            swapped = true;
          }

          //change to green after swapping
          if (i + 1 < len && !maxSortedValues.includes(this.array[i + 1])) {
            await this.timer(20 / sortSpeed);
            this.changeColor(i, "blue");
            this.changeColor(i + 1, "blue");
          }

          //if value will not be sorted again change to green
          if (Math.max(...maxSortedValues) === tmp) {
            await this.timer(100 / sortSpeed);
            maxSortedValues.pop(tmp);
            if (i + 1 < len) {
              this.array[i + 1].stroke = "green";
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

<style>
html {
  overflow-y: auto;
}
</style>
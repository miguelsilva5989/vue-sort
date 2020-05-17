<template>
  <v-container>
    <v-card-text>
      <span class="subheading font-weight-light mr-1">Array Size</span>
      <span class="display-2 font-weight-light" v-text="arraySize"></span>
      <v-slider v-model="arraySize" :color="color" :min="sliderMin" :max="sliderMax" thumb-label>
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">mdi-minus</v-icon>
        </template>
        <template v-slot:append>
          <v-icon :color="color" @click="increment">mdi-plus</v-icon>
        </template>
      </v-slider>
      <v-btn
        :disabled="sorting"
        small
        class="mr-4"
        outlined
        color="primary"
        @click="generateArray"
      >Generate New Array</v-btn>
      <v-btn
        :disabled="sorting||sorted"
        small
        class="mr-4"
        outlined
        color="green"
        @click="bubbleSort"
      >Sort</v-btn>
      <span class="subheading font-weight-light mr-1">Number of swaps: {{ swaps }}</span>
    </v-card-text>
    <v-stage :config="configKonva">
      <v-layer>
        <v-line
          ref="line{{item.id}}"
          v-for="item in array"
          :key="item.id"
          :config="{
            points: [5, item.y, item.x, item.y],
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
var stageHeight = window.innerHeight - 225; //remove top pixels;

export default {
  name: "Sort",

  data: () => ({
    sliderMin: 3,
    sliderMax: 200,
    arraySize: 30,
    strokeWidth: 5,
    configKonva: {
      width: 500,
      height: stageHeight
    },
    array: [],
    swaps: 0,
    sorting: false,
    sorted: false
    // configLine: {
    //   points: [5, 70, 140, 23, 250, 60, 300, 20], //[x1, y1, x2, y2, ....]
    //   stroke: "green",
    //   strokeWidth: 10,
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

      var array = [];
      var y = 1; //first position
      // var windowHeight = window.innerHeight - 150; //remove top pixels

      var yIncrement = stageHeight / Math.pow(10, this.arraySize) + 10; // distance between points
      console.log("yIncrement " + yIncrement);

      //resize height of lines
      this.strokeWidth = stageHeight / Math.pow(10, this.arraySize) + 5;
      console.log("strokeWidth " + this.strokeWidth);

      while (array.length < this.arraySize) {
        var rand = Math.floor(Math.random() * 500) + 10; //500 is the canvas width size
        // +10 as 10 is the minimum for the line in chart to become visisble
        var obj = {
          id: rand,
          x: rand,
          stroke: "blue"
        };
        if (array.findIndex(val => val.x === rand) === -1) {
          y += yIncrement; // distance between points
          obj.y = y;
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
      this.array[index + 1].stroke = color;
    },
    async bubbleSort() {
      this.sorting = true;
      this.sorted = false;

      this.swaps = 0; //reset steps number
      let inputArr = this.array.map(x => x.x); //convert x in objects to an array
      let maxSortedValues = inputArr.slice(); //checks if values are already sorted and will not be moved again
      // let maxSortedValues = [];

      let len = inputArr.length;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < len; i++) {
          // change to green the values which are being analysed
          if (i + 1 < len && !maxSortedValues.includes(this.array[i + 1])) {
            this.changeColor(i, "cyan");
            await this.timer(100);
          }

          let tmp = inputArr[i];
          if (inputArr[i] > inputArr[i + 1]) {
            this.changeColor(i, "red"); //change to red if order is wrong
            await this.timer(100);

            inputArr[i] = inputArr[i + 1];
            this.array[i].x = inputArr[i + 1];

            inputArr[i + 1] = tmp;
            this.array[i + 1].x = tmp;

            this.swaps++;
            swapped = true;
          }

          //change to green after swapping
          if (i + 1 < len && !maxSortedValues.includes(this.array[i + 1])) {
            await this.timer(20);
            this.changeColor(i, "blue");
          }

          //if value will not be sorted again change to green
          if (Math.max(...maxSortedValues) === tmp) {
            await this.timer(100);
            maxSortedValues.pop(tmp);
            if (i + 1 < len) {
              this.array[i+1].stroke = "green";
            }
          }
        }
      } while (swapped);

      //tmp
      this.sorting = false;
      this.sorted = true;
    },
    decrement() {
      this.arraySize -= 10;
    },
    increment() {
      this.arraySize += 10;
    }
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
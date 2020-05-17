<template>
  <v-container>
    <v-btn class="mr-4" outlined color="primary" @click="generateArray">Generate New Array</v-btn>
    <v-card-text>
      <span class="subheading font-weight-light mr-1">Array Size</span>
      <span class="display-2 font-weight-light" v-text="arraySize"></span>
      <v-slider v-model="arraySize" :color="color" :max="max" :min="min" thumb-label>
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">mdi-minus</v-icon>
        </template>
        <template v-slot:append>
          <v-icon :color="color" @click="increment">mdi-plus</v-icon>
        </template>
      </v-slider>
    </v-card-text>
    <span>{{ array }}</span>
    <v-stage :config="configKonva">
      <v-layer>
        <v-line
          v-for="item in array"
          :key="item.id"
          :config="{
            points: [5, item.y, item.x, item.y],
            stroke: 'blue',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
          }"
        ></v-line>
        <!-- <v-line :config="configLine"></v-line> -->
        <!-- <v-line :config="configLine2"></v-line> -->
      </v-layer>
    </v-stage>
  </v-container>
</template>

<script>
export default {
  name: "Sort",

  data: () => ({
    min: 3,
    max: 200,
    arraySize: 30,
    configKonva: {
      width: 500,
      height: 500
    },
    array: [],
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
      if (this.arraySize < this.max * 0.25) return "blue";
      if (this.arraySize < this.max * 0.5) return "green";
      if (this.arraySize < this.max * 0.75) return "orange";
      return "red";
    }
  },

  methods: {
    generateArray() {
      var array = [];
      var y = 1;
      while (array.length < this.arraySize) {
        var rand = Math.floor(Math.random() * 500) + 10; //500 is the canvas size
        // +10 as 10 is the minimum for the line in chart to become visisble
        var obj = {
          id: (rand).toString(),
          x: rand
        };
        if (array.findIndex(val => val.x === rand) === -1) {
          y += 10; // distance between points
          obj.y = y;
          array.push(obj);
        }
      }
      this.array = array;
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

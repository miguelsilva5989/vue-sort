<template>
  <v-container>
    <v-btn class="mr-4" outlined color="primary">Generate New Array</v-btn>
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
  </v-container>
</template>

<script>
export default {
  name: "Sort",

  data: () => ({
    min: 3,
    max: 200,
    arraySize: 100
  }),

  computed: {
    color() {
      if (this.arraySize < this.max * 0.25) return "blue";
      if (this.arraySize < this.max * 0.5) return "green";
      if (this.arraySize < this.max * 0.75) return "orange";
      return "red";
    }
  },

  methods: {
    decrement() {
      this.arraySize -= 10;
    },
    increment() {
      this.arraySize += 10;
    }
  }
};
</script>

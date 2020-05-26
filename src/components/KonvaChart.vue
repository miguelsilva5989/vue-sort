<template>
  <div v-bind:style="{ height: '100vh', width: '100vw' }" ref="container">
    <v-stage :config="configKonva" ref="stage">
      <v-layer>
        <v-line
          ref="line{{item.id}}"
          v-for="item in getArrayToSort"
          :key="item.id"
          :config="{
            points: [item.x, 5, item.x, item.y], // x1, y1, x2, y2
            stroke: item.stroke,
            strokeWidth: strokeWidth,
            lineCap: 'round',
            lineJoin: 'round',
          }"
        ></v-line>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: "KonvaChart",
  data: () => ({
    configKonva: {
      width: width,
      height: height
    }
  }),

  created () {
    window.addEventListener("resize", this.changeRect, { passive: true });
    this.changeRect();
  },

  computed: {
    ...mapGetters(["getArrayToSort"]),    
  },
  methods: {
    changeRect: function() {
      const container = this.$refs.container;

      if (!container) {
        return;
      }

      const height = container.offsetHeight;
      const width = container.offsetWidth;

      // console.log(height, height);
      this.configKonva.width = width;
      this.configKonva.height = height;
    }
  }
};
</script>

<style>
html {
  overflow-y: hidden;
}
</style>
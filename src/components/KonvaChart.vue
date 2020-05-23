<template>
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
    </v-layer>
  </v-stage>
</template>

<script>
var stageWidth = (3 / 4) * window.innerWidth - 50; //minus left panel
var maxHeight = 450;

export default {
  name: "KonvaChart",
  data: () => ({
    configKonva: {
      width: stageWidth,
      height: maxHeight
    }
  })
};
</script>

<style>
</style>
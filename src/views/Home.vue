<template>
  <v-container>
    <ArrayConfig />
    <KonvaChart />
  </v-container>
</template>

<script>
// @ is an alias to /src
import ArrayConfig from "@/components/ArrayConfig.vue";
import KonvaChart from "@/components/KonvaChart.vue";

export default {
  name: "Home",
  components: {
    ArrayConfig,
    KonvaChart
  }
};
</script>


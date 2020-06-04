<template>
  <v-app>
    <v-navigation-drawer clipped permanent app>
      <v-toolbar>
        <v-icon>mdi-sort-variant</v-icon>
        <span class="title font-weight-light primary--text">Vue Sort</span>
      </v-toolbar>

      <v-list nav dense>
        <v-list-item to="/" link>Home</v-list-item>
        <v-list-item to="/About" link>About</v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item>
          <v-list-item-title>Sorting Algorithms</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat dense>
        <v-list-item-group mandatory v-model="selectedAlg" color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Bubble Sort</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock-fast</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Quick Sort</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-tree</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Heap Sort</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-transit-connection-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Merge Sort</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    selectedAlg: 0,
  }),
};
</script>

<style>

</style>
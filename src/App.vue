<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-icon>mdi-sort-variant</v-icon>

        <span class="title font-weight-light">Vue Sort</span>
      </div>

      <v-spacer></v-spacer>

      <nav>
        <router-link to="/">Home |</router-link>
        <router-link to="/About">About</router-link>
      </nav>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  })
};
</script>

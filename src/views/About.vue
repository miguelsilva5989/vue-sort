<template>
  <div class="about ma-8">
    <p class="display-1 font-weight-bold">Vue Sort</p>
    <p
      class="body-1 font-weight-regular mt-5"
    >This mini project allows the visualization of sorting algorithms. The main objective is to support the following sorting algorithms:</p>

    <v-card max-width="1080" class="mx-auto">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card @click="openInNewTab(card.url)">
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <p
      class="body-1 font-weight-regular mt-5"
    >For the UI I am using Vuetify which is a Vue UI Library with Material components.</p>

    <p class="body-1 font-weight-regular mt-5">The column chart is drawn using Konva JS for Vue.</p>

    <v-card max-width="200" >
      <v-container fluid>
        <v-card @click="openInNewTab('https://konvajs.org/docs/vue/index.html')">
          <v-img
            src="../assets/column_chart.png"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>Column Chart</v-card-title>
          </v-img>
        </v-card>
      </v-container>
    </v-card>

  </div>
</template>

<script>
export default {
  methods: {
    openInNewTab(url) {
      var win = window.open(url, "_blank");
      win.focus();
    }
  },
  data: () => ({
    cards: [
      {
        title: "Bubble Sort",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif",
        url: "https://en.wikipedia.org/wiki/Bubble_sort",
        flex: 3
      },
      {
        title: "Quick Sort",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sorting_quicksort_anim.gif/220px-Sorting_quicksort_anim.gif",
        url: "https://en.wikipedia.org/wiki/Quicksort",
        flex: 3
      },
      {
        title: "Heap Sort",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sorting_heapsort_anim.gif",
        url: "https://en.wikipedia.org/wiki/Heapsort",
        flex: 3
      },
      {
        title: "Merge Sort",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Merge-sort-example-300px.gif/220px-Merge-sort-example-300px.gif",
        url: "https://en.wikipedia.org/wiki/Merge_sort",
        flex: 3
      }
    ]
  })
};
</script>
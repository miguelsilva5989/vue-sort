<template>
  <div class="home">
    <SortTypes />
  </div>
</template>

<script>
// @ is an alias to /src
import SortTypes from '@/components/SortTypes.vue'

export default {
  name: 'Home',
  components: {
    SortTypes
  }
}
</script>

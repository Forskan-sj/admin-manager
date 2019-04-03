<template>
  <div class="app-container">
    <router-view />
  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ComplexTablepage',
  components: { Pagination },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }

}
</script>

<style scoped>
</style>

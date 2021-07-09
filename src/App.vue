<template>
  <app-reg></app-reg>
</template>

<script>
import Registration from './views/Registration.vue'

export default {
  components: {
    'app-reg': Registration
  },
  data () {
    return {
      title: 'TITLE'
    }
  }
}
</script>

<style>

</style>

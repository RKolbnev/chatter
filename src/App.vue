<template>
  <app-header></app-header>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  components: {
    'app-header': AppHeader
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

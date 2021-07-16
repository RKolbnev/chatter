<template>
  <div>
    <app-header v-if="logIn"></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  components: {
    'app-header': AppHeader
  },
  data () {
    return {}
  },
  computed: {
    logIn () {
      return this.$route.path.length > 2
    }
  }
}
</script>

<style>

</style>

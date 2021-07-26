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
  computed: {
    logIn () {
      return this.$route.path.length > 2
    }
  },
  created () {
    this.$router.push('/')
  }
}
</script>

<style>

</style>

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
    return {
      logIn: 'true'
    }
  }
}
</script>

<style>

</style>

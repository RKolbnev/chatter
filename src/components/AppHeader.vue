<template>
  <header class="header">
    <div class="header-logo">
      <i class="fa fa-comments-o" aria-hidden="true"></i>
      <span>Chatter</span>
    </div>
    <div class="header-btn">
      <div @click="$router.push('/message')" >
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </div>
      <div @click="$router.push(getPage)">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
      </div>
      <div @click="logOut">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from '../firebase'

export default {
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.push('/')
      localStorage.clear()
    }
  },
  computed: {
    getPage () {
      const data = this.$store.getters.getUserInfo
      return `/${data.id}`
    }
  }
}
</script>

<style>

</style>

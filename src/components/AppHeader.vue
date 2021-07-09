<template>
  <header class="header">
    <div class="header-logo">
      <i class="fa fa-comments-o" aria-hidden="true"></i>
      <span>Chatter</span>
    </div>
    <div class="header-btn">
      <div>
        <span>0</span>
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </div>
      <div @click="$router.push('/user')">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>

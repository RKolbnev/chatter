<template>
  <div class="messages">
    <div class="people scroll" >
      <div class="people-search">
        <input type="text">
        <button><i class="fa fa-search" aria-hidden="true"></i></button>
      </div>
      <div class="people-list">
        <div class="person" v-for="i in 100" :key="i">
          <div class="person__img">
            <img src="../assets/test2.jpg" alt="">
          </div>
          <div class="person__name">
            Ivanova Eva Ivanovna
          </div>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="chat">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

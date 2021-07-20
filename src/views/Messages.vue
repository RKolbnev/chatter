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
            <!-- <img src="../assets/test2.jpg" alt=""> -->
          </div>
          <div class="person__name">
            Ivanova Eva Ivanovna
          </div>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="chat">
      <div class="chat-header">
        <div class="person">
          <div class="person__img">
            <!-- <img src="../assets/test2.jpg" alt=""> -->
          </div>
          <div class="person__name">
            Ivanova Eva Ivanovna
          </div>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
      <div class="message__wrapper scroll">
        <div class="message from">
          <span>Hello</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message to">
          <span>hi</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>

        <div class="message from">
          <span>Hello</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message to">
          <span>hi</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message from">
          <span>Hello</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message to">
          <span>hi</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message from">
          <span>Hello</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
        <div class="message to">
          <span>hi</span>
          <div class="message__info">
            <span>12 февраля</span>
            <i class="fa fa-check " aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="chat-write">
        <input type="text">
        <button>Отправить</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

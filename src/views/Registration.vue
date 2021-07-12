<template>
  <div class="modal-reg flex-center">
    <form class="form">
      <div class="form-tabs" @click.prevent="changeWayReg">
        <button :class="{'active': !newUser, 'disactive': newUser}">Вход</button>
        <button :class="{'active': newUser, 'disactive': !newUser}">Регистрация</button>
      </div>
      <div class="form-data flex-center">
        <div class="form-data__item"
          v-if="newUser">
          <i class="fa fa-user"></i>
          <input type="text" placeholder="Логин">
        </div>
        <div class="form-data__item">
          <i class="fa fa-envelope"></i>
          <input type="text" placeholder="E-mail">
        </div>
        <div class="form-data__item">
          <i class="fa fa-key"></i>
          <input type="text" placeholder="Пароль">
        </div>
      </div>
      <button class="form-btn">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newUser: false
    }
  },
  methods: {
    changeWayReg (evt) {
      this.newUser = !(evt.target.textContent === 'Вход')
    }
  }
}
</script>

<template>
  <div class="modal-reg flex-center">
    <form class="form">
      <div class="form-tabs" @click.prevent="regOrLog">
        <button :class="{'active': !newUser, 'disactive': newUser}">Вход</button>
        <button :class="{'active': newUser, 'disactive': !newUser}">Регистрация</button>
      </div>
      <div class="form-data flex-center">
        <div class="form-data__item"
          v-if="newUser">
          <i class="fa fa-user"></i>
          <input type="text" placeholder="ФИО"
            v-model="name">
        </div>
        <div class="form-data__item">
          <i class="fa fa-envelope"></i>
          <input type="text" placeholder="E-mail"
            v-model="email">
        </div>
        <div class="form-data__item">
          <i class="fa fa-key"></i>
          <input type="text" placeholder="Пароль"
            v-model="password">
        </div>
      </div>
      <button class="form-btn"
        @click.prevent="newUser ? regIn() : logIn()"
      >{{newUser ? 'Регистрация' : 'Вход'}}</button>
    </form>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  data () {
    return {
      newUser: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    regOrLog (evt) {
      this.newUser = !(evt.target.textContent === 'Вход')
    },
    regIn () {
      const name = this.name
      const email = this.email
      const password = this.password

      const auth = firebase.auth()
      auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          firebase
            .firestore()
            .collection('users')
            .add({
              name,
              email,
              password,
              id: res.user.uid,
              URL: '',
              description: ''
            })
            .then(res => {
              console.log(res)
              // localStorage.setItem();
              // localStorage.setItem();
              // localStorage.setItem();
              // localStorage.setItem();
              // localStorage.setItem();
              // localStorage.setItem();
              // localStorage.setItem();
              this.name = ''
              this.email = ''
              this.password = ''
            })
        })
    },
    logIn () {
      console.log('log')
    }
  }
}
</script>

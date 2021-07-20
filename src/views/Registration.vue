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
    <div v-if="query" class="preloader">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  data () {
    return {
      newUser: false,
      query: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    regOrLog (evt) {
      this.newUser = !(evt.target.textContent === 'Вход')
    },
    regIn () { // Создание нового пользователя
      this.query = true
      const name = this.name
      const email = this.email
      const password = this.password

      const auth = firebase.auth()
      // Создаем нового пользователя
      auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          const data = {
            name,
            email,
            id: res.user.uid,
            photoSettings: {
              src: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultPhoto.jpg?alt=media&token=6c209b4d-8a89-4999-b6de-4e85aa3b2ab6',
              top: 0,
              left: 0,
              width: 100
            },
            bgSettings: {
              src: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultBg.jpg?alt=media&token=be60d324-5a19-44b6-80e8-60685e38c8b2',
              top: 0,
              left: 0,
              width: 100
            }
          }
          // При успешном создании, добавляем данные в базу данных
          firebase
            .firestore() // Обращаемся к базе данных
            .collection('users') // К определенной коллекции
            .add(data) // добавлем новое поле
            .then(ref => {
              this.$store.commit('addUserInfo', data)
              //! localStorage.setItem('firebaseDocumentId', ref.id);
              this.name = ''
              this.email = ''
              this.password = ''
              this.query = false
              this.$router.push(`/${res.user.uid}`)
            }).catch(error => alert(error))
        }).catch(error => alert(error.message))
    },
    logIn () { // Вход в приложение с
      this.query = true
      const auth = firebase.auth()
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          // При успешном входе на страницу
          firebase.firestore().collection('users') // обращаемся к базе данных
            .where('id', '==', res.user.uid) // Делаем запрос отвечающий конктретным параметрам поиска
            // т.е. ищем объекn данных пользователя по его id с помощью метода where
            .get() // Получаем данные
            .then(snapShot => { // Получаем снимок данных
              snapShot.forEach(item => {
                const data = item.data() // преобразуем данные в понятный вид
                this.$store.commit('addUserInfo', data)
                localStorage.setItem('email', this.email)
                localStorage.setItem('password', this.password)
                //! console.log(data) // ? выводим данные в консоль
                //! localStorage.setItem('firebaseDocumentId', item.id);
                this.$router.push(`/${data.id}`) // Перенаправляем на страницу пользователя
              })
            }).catch(error => alert(error))
        }).catch(error => alert(error.message))
    }
  },
  created () { //! Заглушка на первое время
    this.email = localStorage.getItem('email') ?? ''
    this.password = localStorage.getItem('password') ?? ''
    if (this.email.length > 0) this.logIn()
  }
}
</script>

<template>
  <div class="chat" v-if="room">
    <div class="chat-header">
      <div class="person" >
        <div class="person__img">
          <img alt=""
            :src="room.chatPerson.photoSettings.src"
            :style="styleForChatPerson"
          />
        </div>
        <div class="person__name">{{ room.chatPerson.name }}</div>
      </div>
    </div>
    <div class="message__wrapper scroll" ref="scroll">
      <div class="message"
        :class="message.idFrom === userInfo.id ? 'from' : 'to'"
        v-for="message in messages" :key="message.time">
        <span>{{message.text}}</span>
        <div class="message__info">
          <span>{{availableDate(message.timestamp)}}</span>
          <i v-if="message.status" class="fa fa-check " aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="chat-write" v-on:keyup.enter="sendMessage">
      <input type="text" v-model="textMessage" />
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  props: { room: Object },
  data () {
    return {
      userInfo: this.$store.getters.getUserInfo,
      textMessage: '',
      messages: []
    }
  },
  // mounted() {
  //   this.getMessages()
  // },
  watch: {
    room: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getMessages()
      }
    }
  },
  methods: {
    sendMessage () {
      const message = {
        text: this.textMessage,
        status: false,
        roomID: this.room.roomID,
        idFrom: this.userInfo.id,
        idTo: this.room.chatPerson.id,
        timestamp: Date.now()
      }

      this.$store.commit('sendMessage', message)
      this.textMessage = ''

      this.$store.commit('addChatRoom', {
        id: this.userInfo.id,
        roomID: message.roomID,
        chatPerson: this.room.chatPerson
      })
      this.$store.commit('addChatRoom', {
        id: this.room.chatPerson.id,
        roomID: message.roomID,
        chatPerson: this.userInfo
      })
    },
    getMessages () {
      if (!this.room) return
      this.messages = []
      firebase.firestore()
        .collection('messages')
        .doc(this.room.roomID)
        .collection(this.room.roomID)
        .orderBy('timestamp', 'desc')
        .limit(15)
        .onSnapshot(messages => {
          // console.log(messages.docs);
          messages.docChanges().forEach(message => {
            this.messages.push(message.doc.data())
          })
          this.messages.sort((a, b) => a.timestamp - b.timestamp)
        })
    },
    scrollToLastMessage () {
      if (this.$refs.scroll && this.$refs.scroll.lastElementChild) {
        this.$refs.scroll.lastElementChild.scrollIntoView({ behavior: 'smooth' })
      }
    },
    availableDate (timestamp) {
      const dayOfWeek = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
      const date = new Date(timestamp)
      const currentDate = new Date()
      const thisWeek = currentDate - date < 604_800_000
      const year = date.getFullYear()
      const month = date.getMonth()
      const dayOfMonth = date.getDate()
      const day = date.getDay() - 1
      const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
      const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`

      let res

      if (thisWeek) {
        res = `${dayOfWeek[day]} ${hour}:${minutes}`
      } else {
        res = `${dayOfMonth}/${month}/${year} ${hour}:${minutes}`
      }

      return res
    }
  },
  computed: {
    styleForChatPerson () {
      const style = this.room.chatPerson.photoSettings
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    }
  },
  updated () {
    this.scrollToLastMessage()
  }
}
</script>

<style></style>

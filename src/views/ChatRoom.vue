<template>
  <div class="chat" v-if="room">
    <div class="chat-header">
      <div class="person"
      @click="$router.push(`/${room.chatPerson.id}`)">
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
        :title="detailsMessage(message)"
        @mouseenter="readMessage(message)"
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
  watch: {
    room: function (newVal, oldVal) {
      if ((newVal.roomID !== oldVal?.roomID)) {
        if (this.$store.getters.getListeningsRooms(newVal.roomID)) {
          this.getMessages()
        } else {
          this.$store.commit('addListeningRoom', newVal.roomID)
          this.getMessages(true)
        }
      }
    }
  },
  methods: {
    sendMessage () {
      if (this.textMessage.trim().length < 1) return
      const message = {
        text: this.textMessage.trim(),
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

      const unreadMes = this.messages
        .filter(mes => mes.idTo === message.idFrom)
        .filter(mes => mes.status === false)

      unreadMes.forEach(mes => {
        this.$store.commit('readMessage', {
          id: mes.roomID,
          storageID: mes.storageID,
          timestamp: mes.timestamp
        })
      })
    },
    getMessages (first) {
      if (!this.room) return
      this.messages = []

      const query = firebase.firestore()
        .collection('messages')
        .doc(this.room.roomID)
        .collection(this.room.roomID)
        .orderBy('timestamp', 'desc')
        .limit(15)
      if (first) {
        query.onSnapshot(messages => {
          messages.docChanges().forEach(message => {
            if (message.type === 'added' && (this.room.roomID === message.doc.data().roomID)) {
              this.messages.push({ ...message.doc.data(), storageID: message.doc.id })
            } else if (message.type === 'modified') {
              this.messages.forEach(item => {
                if (item.timestamp === message.doc.data().timestamp) {
                  item.status = true
                }
              })
            } else {
              this.messages = this.messages.filter(item => item.timestamp !== message.doc.data().timestamp)
            }
          })
          this.messages.sort((a, b) => a.timestamp - b.timestamp)
        })
      } else {
        query.get()
          .then(messages => {
            messages.forEach(message => {
              this.messages.push({ ...message.data(), storageID: message.id })
            })
            this.messages.sort((a, b) => a.timestamp - b.timestamp)
          })
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
    },
    readMessage (message) {
      if (message.idFrom === this.userInfo.id) return
      this.$store.commit('readMessage', {
        id: this.room.roomID,
        storageID: message.storageID,
        timestamp: message.timestamp
      })
    },
    detailsMessage (message) {
      return message.status ? 'прочитано' : 'непрочитано'
    }
  },
  computed: {
    styleForChatPerson () {
      const style = this.room.chatPerson.photoSettings
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    }
  },
  updated () {
    if (this.$refs?.scroll?.lastElementChild) {
      this.$refs.scroll.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style></style>

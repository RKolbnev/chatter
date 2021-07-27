<template>
  <div class="chat">
    <div class="chat-header">
      <div class="person">
        <div class="person__img">
          <img alt=""
            :src="chatPerson.photoSettings.src"
            :style="styleForChatPerson"
          />
        </div>
        <div class="person__name">{{ chatPerson.name }}</div>
        <i class="fa fa-trash" aria-hidden="true"></i>
      </div>
    </div>
    <div class="message__wrapper scroll">
      <!-- <div class="message from">
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
      </div> -->
    </div>
    <div class="chat-write" @keyup:enter="sendMessage">
      <input type="text" v-model="textMessage" />
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  data () {
    return {
      userInfo: this.$store.getters.getUserInfo,
      chatPerson: null,
      textMessage: ''
    }
  },
  methods: {
    setCurrentChatPerson () {
      this.chatPerson = this.$store.getters.getCurrentChatPerson
    },
    sendMessage () {
      const text = this.textMessage.trim()
      if (text.length === 0) return
      const message = {
        text,
        chatRoomID: `${this.chatPerson.id}-${this.userInfo.id}`,
        idTo: this.chatPerson.id,
        idFrom: this.userInfo.id,
        time: firebase.firestore.FieldValue.serverTimestamp()
      }
      firebase
        .firestore()
        .collection('messages')
        .doc(message.chatRoomID)
        .collection(message.chatRoomID)
        .add(message)
        .catch(error => alert(error))
    },
    loadMessages () {
      const query = firebase
        .firestore()
        .collection('messages')
        .orderBy('time', 'desc')
        .limit(12)

      // Start listening to the query.
      query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change)
          if (change.type === 'removed') {
            // deleteMessage(change.doc.id);
          } else {
            var message = change.doc.data()
            console.log(message)
            // displayMessage(
            //   change.doc.id,
            //   message.timestamp,
            //   message.name,
            //   message.text,
            //   message.profilePicUrl,
            //   message.imageUrl
            // );
          }
        })
      })
    }
  },
  computed: {
    styleForChatPerson () {
      const style = this.chatPerson.photoSettings
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    }
  },
  created () {
    this.loadMessages()
    this.setCurrentChatPerson()
  },
  updated () {
    this.setCurrentChatPerson()
  }
}
</script>

<style></style>

<template>
  <div :class="['messages', {'mobile__settings': showMessages}]">
    <i class="fa fa-comments messages__mobile" aria-hidden="true" @click="letShowMessages" ref="mobile"></i>
    <div class="people">

      <div class="people-search">
        <input type="text" v-model="search" v-on:keyup.enter="searching"/>
        <button @click="searching"><i class="fa fa-search" aria-hidden="true"></i></button>
        <!-- Результаты поиска -->
        <div v-if="searchResult.length > 0" class="people-search__result">
          <div class="person"
            v-for="person in searchResult"
            :key="person.id"
            @click="setCurrentChatPerson({roomID: null, chatPerson: person})">
            <div class="person__img">
              <img alt=""
                :src="person.photoSettings.src"
                :style="styleForChatPerson(person.photoSettings)"
              />
            </div>
            <div class="person__name">{{ person.name }}</div>
          </div>
        </div> <!-- конец Результаты поиска -->
      </div>

      <div class="people-list scroll" v-if="chatRooms">
        <div class="person"
          :class="{'unread': !room.isRead}"
          v-for="room in chatRooms"
          :key="room.roomID"
          @click="setCurrentChatPerson(room)">
          <div class="person__img">
            <img alt=""
              :src="room.chatPerson.photoSettings.src"
              :style="styleForChatPerson(room.chatPerson.photoSettings)"
            />
          </div>
          <div class="person__name">{{ room.chatPerson.name }}</div>
          <i class="fa fa-trash" aria-hidden="true" @click.stop="deleteRoom(room)"></i>
        </div>
      </div>

    </div>

    <chat-room :room="currentChatPerson"></chat-room>

  </div>
</template>

<script>
import ChatRoom from '../components/ChatRoom.vue'
import firebase from '../firebase'

export default {
  components: {
    'chat-room': ChatRoom
  },
  data () {
    return {
      chatRooms: [],
      currentChatPerson: null,
      userInfo: this.$store.getters.getUserInfo,
      search: '',
      searchResult: [],
      showMessages: false
    }
  },
  methods: {
    searching () {
      firebase
        .firestore()
        .collection('users')
        .where('name', '==', this.search)
        .get()
        .then(snapShot => {
          this.search = ''
          snapShot.forEach(person => {
            this.searchResult.push(person.data())
          })
        })
    },
    setCurrentChatPerson (person) {
      if (window.getComputedStyle(this.$refs.mobile).display === 'block') {
        this.$refs.mobile.click()
      }
      person.roomID = person.roomID ?? `${this.userInfo.id}${person.chatPerson.id}`
      this.currentChatPerson = person
      this.$router.push(`/message/${person.roomID}`)
      this.searchResult = []
    },
    styleForChatPerson (style) {
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    },
    getRooms () {
      const id = this.userInfo.id
      firebase
        .firestore()
        .collection('rooms')
        .doc(id)
        .collection(id)
        .onSnapshot(doc => {
          doc.docChanges().forEach(change => {
            const data = change.doc.data()
            console.log(change.type)
            if (change.type === 'removed') {
              this.chatRooms.forEach((room, idx) => {
                if (room.roomID === data.roomID) {
                  this.chatRooms.splice(idx, 1)
                }
              })
            } else {
              this.chatRooms.push({ ...data, isRead: false })
              this.getMessages(data.roomID)
              this.checkChatPersonData(data)
            }
          })
        })
    },
    deleteRoom (room) {
      this.$store.commit('deleteChatRoom', { userInfo: this.userInfo.id, room: room.roomID })
      if (this.currentChatPerson?.roomID === room.roomID) {
        this.currentChatPerson = null
      }
    },
    getMessages (id) {
      firebase.firestore()
        .collection('messages')
        .doc(id)
        .collection(id)
        .orderBy('timestamp', 'desc')
        .limit(1)
        .onSnapshot(messages => {
          messages.docChanges().forEach(message => {
            const mes = message.doc.data()
            const status = mes.idTo === this.userInfo.id ? mes.status : true
            this.chatRooms.forEach(room => {
              if (room.roomID === mes.roomID) {
                room.isRead = status
              }
            })
          })
        })
    },
    checkChatPersonData (room) {
      firebase.firestore()
        .collection('users')
        .where('id', '==', room.chatPerson.id)
        .get()
        .then(snapShot => {
          snapShot.forEach(info => {
            this.chatRooms.forEach(chat => {
              if (chat.roomID === room.roomID) {
                chat.chatPerson = info.data()
              }
            })
          })
        })
    },
    letShowMessages () {
      this.showMessages = !this.showMessages
    }
  },
  created () {
    this.getRooms()
  }
}
</script>

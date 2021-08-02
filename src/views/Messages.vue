<template>
  <div class="messages">
    <div class="people ">

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
          :class="{'unread': !isRead}"
          v-for="room in chatRooms"
          :key="room.id"
          @click="setCurrentChatPerson(room)">
          <div class="person__img">
            <img alt=""
              :src="room.chatPerson.photoSettings.src"
              :style="styleForChatPerson(room.chatPerson.photoSettings)"
            />
          </div>
          <div class="person__name">{{ room.chatPerson.name }}</div>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>

    </div>

    <chat-room :room="currentChatPerson"></chat-room>

  </div>
</template>

<script>
import ChatRoom from './ChatRoom.vue'
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
      isRead: false
      // haveUnread: false,
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
      person.roomID = person.roomID ?? `${this.userInfo.id}${person.chatPerson.id}`
      this.currentChatPerson = person
      this.$router.push(`/message/${person.roomID}`)
      this.searchResult = []
    },
    styleForChatPerson (style) {
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    },
    // getRooms() {
    //   const id = this.userInfo.id;

    //   firebase
    //     .firestore()
    //     .collection("rooms")
    //     .doc(id)
    //     .collection(id)
    //     .get()
    //     .then(docs => {
    //       docs.forEach(doc => this.chatRooms.push(doc.data()));
    //     });
    // },
    getRooms () {
      const id = this.userInfo.id
      firebase
        .firestore()
        .collection('rooms')
        .doc(id)
        .collection(id)
        .onSnapshot(doc => {
          doc.docChanges().forEach(change => {
            this.chatRooms.push(change.doc.data())
            this.getMessages(change.doc.data().roomID)
          })
        })
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
            if (!message.doc.data().status) {
              this.isRead = message.doc.data().status
            }
            // this.messages.push(message.doc.data());
          })
          // this.messages = allMessages.reverse();
        })
    }
  },
  created () {
    // this.getMessages(this.currentChatPerson.roomID)
    this.getRooms()
  },
  watch: {
    room: function (newVal, oldVal) {
      const allMessages = []
      if (newVal !== oldVal) {
        const id = this.room.roomID
        firebase
          .firestore()
          .collection('messages')
          .doc(id)
          .collection(id)
          .orderBy('timestamp', 'desc')
          .limit(15)
          .onSnapshot(messages => {
            messages.docChanges().forEach(message => {
              allMessages.push(message.doc.data())
            })
            this.messages = allMessages.reverse()
          })
      }
    }
  }

}
</script>

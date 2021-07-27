<template>
  <div class="messages">
    <div class="people ">

      <div class="people-search" v-on:keyup.enter="searching">
        <input type="text" v-model="search" />
        <button @click="searching">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <div v-if="searchResult.length > 0" class="people-search__result">
          <div class="person"
            v-for="person in searchResult"
            :key="person.id"
            @click="setCurrentChatPerson(person)">
            <div class="person__img">
              <img alt=""
                :src="person.photoSettings.src"
                :style="styleForChatPerson(person.photoSettings)"
              />
            </div>
            <div class="person__name">{{ person.name }}</div>
          </div>
        </div>
      </div>

      <div class="people-list scroll">
        <div class="person" v-for="person in chatRooms" :key="person.id">
          <div class="person__img">
            <img
              :src="person.photoSettings.src"
              alt=""
              :style="styleForChatPerson(person.photoSettings)"
            />
          </div>
          <div class="person__name">{{ person.name }}</div>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <!-- <div class="chat">
      <div class="chat-header">
        <div class="person">
          <div class="person__img">
            <img src="" alt="">
          </div>
          <div class="person__name">{{123}}</div>
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
    </div> -->
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  data () {
    return {
      chatRooms: this.$store.getters.getChatRooms,
      userInfo: this.$store.getters.getUserInfo,
      search: '',
      searchResult: []
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
          console.log(this.searchResult)
        })
    },
    setCurrentChatPerson (person) {
      this.$store.commit('setCurrentChatPerson', person)
      this.searchResult = []
      this.$router.push(`/message/${this.userInfo.id}${person.id}`)
      this.chatRooms.push(person)
    },
    styleForChatPerson (style) {
      return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`
    }
  }
}
</script>

<style></style>

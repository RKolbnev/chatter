<template>
  <div class="user" v-cloak>
    <div class="info border-top">
      <div class="info__bg border-top" >
        <img :src="userInfo.bgSettings.src" alt="Background"
          :style="styleBg">
        <i class="fa fa-pencil" aria-hidden="true"
          v-if="myPage"
          @click="isEdit('bgSettings')"></i>
      </div>
      <div class="info__main" @click="isEdit('photoSettings')">
        <img :src="userInfo.photoSettings.src" alt="Main Photo"
          :style="stylePhoto">
      </div>
      <div class="info__name" v-if="!changingName">
        <span>{{userInfo.name}}</span>
        <i class="fa fa-pencil" aria-hidden="true"
          v-if="myPage"
          @click="changingName = true">
        </i>
      </div>
      <div v-else class="change-name">
        <input type="text" :value="userInfo.name" ref="inputName">
        <button @click="changeName">Сохранить</button>
        </div>
    </div>

    <div class="wall">
      <button class="wall-add" v-if="myPage && !isAddNewPublic" @click="addNewPublic">
        <i class="fa fa-plus-square" aria-hidden="true"></i>
        <span>Добавить новую публикацию</span>
      </button>
      <div v-else-if="isAddNewPublic">
        <input type="text" v-model="newPublicText" placeholder="О чем хотите рассказать?"
          @keyup.enter="saveNewPublic">
      </div>
      <hr>
      <div class="wall-publics">
        <div v-for="post in userInfo.publics" :key="post.id">
          {{post.text}}
          <span>
            {{availableDate(post.timestamp)}}
            <i class="fa fa-trash" aria-hidden="true" @click.stop="deletePublic(post.id)"></i>
          </span>
        </div>
      </div>
    </div>

    <teleport to='body'>
      <app-change-photo
        v-if="modal"
        @save="changePhoto"
        @closeModal="this.modal = false"
        :id="userInfo.id"
        :currentPosition="currentStyleForEdit"></app-change-photo>
    </teleport>

  </div>
</template>

<script>
import firebase from '../firebase'
import AppChangePhotoModal from '../components/AppChangePhotoModal'

export default {
  components: {
    'app-change-photo': AppChangePhotoModal
  },
  props: ['id'],
  data () {
    return {
      modal: false,
      userInfo: this.$store.getters.getUserInfo,
      currentUser: this.$store.getters.getUserInfo,
      bgSettings: {
        class: 'edit__bg',
        type: 'bgSettings',
        difference: 1.5
      },
      photoSettings: {
        class: 'edit__photo',
        type: 'photoSettings',
        difference: 0.6
      },
      currentStyleForEdit: null,
      changingName: false,
      newPublicText: '',
      isAddNewPublic: false
    }
  },
  methods: {
    changePhoto (type, settings) {
      this.modal = false
      this.userInfo[type] = settings
      this.$store.commit('changeUserInfo', { type, data: settings })
    },
    changeName () {
      this.changingName = false
      const value = this.$refs.inputName.value
      if (value.length > 0) {
        this.$store.commit('changeUserInfo', { type: 'name', data: value })
      }
    },
    isEdit (editElement) {
      if (this.userInfo.id !== this.currentUser.id) return
      this.modal = true
      this.currentStyleForEdit = { ...this[editElement], ...this.userInfo[editElement] }
    },
    changePageInfo (id) {
      if (id === this.currentUser.id) {
        this.userInfo = this.currentUser
      } else {
        firebase
          .firestore()
          .collection('users')
          .where('id', '==', id)
          .get()
          .then(doc => {
            doc.forEach(item => {
              this.userInfo = item.data()
            })
          })
      }
    },
    addNewPublic () {
      this.isAddNewPublic = true
    },
    saveNewPublic () {
      this.isAddNewPublic = false
      if (this.newPublicText.trim().length < 1) return
      const data = {
        timestamp: Date.now(),
        id: Math.random(),
        text: this.newPublicText.trim()
      }
      this.$store.commit('addPublic', data)
      this.newPublicText = ''
    },
    deletePublic (id) {
      this.$store.commit('deletePublic', id)
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
    styleBg () {
      const info = this.userInfo.bgSettings
      return `top: ${info.top}px; left: ${info.left}px; width: ${info.width}%`
    },
    stylePhoto () {
      const info = this.userInfo.photoSettings
      return `top: ${info.top}px; left: ${info.left}px; width: ${info.width}%`
    },
    myPage () {
      return this.userInfo.id === this.currentUser.id
    }
  },
  watch: {
    $route: function (a, b) {
      const id = a.path.replace('/', '')
      this.changePageInfo(id)
    }
  },
  created () {
    this.changePageInfo(this.id)
  }
}
</script>

<style></style>

<template>
  <div class="user">
    <div class="info border-top">
      <div class="info__bg border-top" >
        <img :src="userInfo.bgSettings.src" alt="Background"
          :style="styleBg">
        <i class="fa fa-pencil" aria-hidden="true"
          @click="isEdit('bgSettings')"></i>
      </div>
      <div class="info__main" @click="isEdit('photoSettings')">
        <img :src="userInfo.photoSettings.src" alt="Main Photo"
          :style="stylePhoto">
      </div>
      <div class="info__name" v-if="!changingName">
        <span>{{userInfo.name}}</span>
        <i class="fa fa-pencil" aria-hidden="true"
          @click="changingName = true">
        </i>
      </div>
      <div v-else class="change-name">
        <input type="text" :value="userInfo.name" ref="inputName">
        <button
          @click="changeName">Сохранить</button>
        </div>
    </div>

    <div class="wall">
      <button class="wall-add">
        <i class="fa fa-plus-square" aria-hidden="true"></i>
        <span>Добавить новую публикацию</span>
      </button>
      <hr>
    </div>

    <teleport to='body'>
      <app-change-photo
        v-if="modal"
        @save="changePhoto"
        @closeModal="this.modal = false"
        :currentPosition="currentStyleForEdit"></app-change-photo>
    </teleport>

  </div>
</template>

<script>
import AppChangePhotoModal from '../components/AppChangePhotoModal'

export default {
  components: {
    'app-change-photo': AppChangePhotoModal
  },
  data () {
    return {
      modal: false,
      userInfo: this.$store.getters.getUserInfo,
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
      changingName: false
    }
  },
  methods: {
    changePhoto (type, settings) {
      this.modal = false
      this.userInfo[type] = settings
    },
    changeName () {
      this.changingName = false
      const value = this.$refs.inputName.value
      if (value.length > 0) {
        this.$store.commit('changeName', value)
      }
    },
    isEdit (editElement) {
      this.modal = true
      this.currentStyleForEdit = { ...this[editElement], ...this.userInfo[editElement] }
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
    }
  }

}
</script>

<style></style>

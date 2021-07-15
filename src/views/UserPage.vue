<template>
  <div class="user">

    <div class="info border-top">

      <div class="info__bg border-top" >
        <img :src="require(`../assets/${styleForBg.src}.jpg`)" alt="Background"
          :style="styleBg">
        <i class="fa fa-pencil" aria-hidden="true"
          @click="isEdit('styleForBg')"></i>
      </div>

      <div class="info__main">
        <img :src="require(`../assets/${styleForPhoto.src}.jpg`)" alt="Main Photo"
          :style="stylePhoto"
          @click="isEdit('styleForPhoto')">
      </div>

      <div class="info__name">
        <span>Demodowa Inna</span>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>

    </div>

    <div class="wall">
      <button class="wall-add"><i class="fa fa-plus-square" aria-hidden="true"></i><span>Добавить новую публикацию</span></button>
      <hr>
    </div>
    <teleport to='body'>
      <app-change-photo
        v-if="modal"
        @save="changePhoto"
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
      styleForBg: {
        top: 0,
        left: 0,
        width: 100,
        class: 'edit__bg',
        src: 'test',
        type: 'styleForBg',
        subtract: 10
      },
      styleForPhoto: {
        top: 0,
        left: 0,
        width: 100,
        class: 'edit__photo',
        src: 'test2',
        type: 'styleForPhoto',
        subtract: 18
      },
      currentStyleForEdit: null
    }
  },
  methods: {
    changePhoto (settings) {
      console.log(settings)
      this.modal = false
      this[settings.type] = { ...this[settings.type], ...settings }
      console.log(this.styleForPhoto)
    },
    isEdit (editElement) {
      this.modal = true
      this.currentStyleForEdit = this[editElement]
    }
  },
  computed: {
    styleBg () {
      return `top: ${this.styleForBg.top}px; left: ${this.styleForBg.left}px; width: ${this.styleForBg.width}%`
    },
    stylePhoto () {
      return `top: ${this.styleForPhoto.top}px; left: ${this.styleForPhoto.left}px; width: ${this.styleForPhoto.width}%`
    }
  }

}
</script>

<style></style>

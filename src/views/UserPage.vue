<template>
  <div class="user">

    <div class="info border-top">

      <div class="info__bg border-top" >
        <img src="../assets/test.jpg" alt="" :style="styleImg">
        <i class="fa fa-pencil" aria-hidden="true" @click="modal=true"></i>
      </div>

      <div class="info__main">
        <img src="" alt="">
      </div>

      <div class="info__name">
        <span>Kolbnev Roman Andreevich</span>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>

    </div>

    <div class="wall">
      <button class="wall-add"><i class="fa fa-plus-square" aria-hidden="true"></i><span>Добавить новую публикацию</span></button>
      <hr>
    </div>
    <teleport to='body'>
      <app-change-photo v-if="modal" @save="changePhoto"></app-change-photo>
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
      styleForImg: {
        top: 0,
        left: 0,
        width: 100
      }
    }
  },
  methods: {
    changePhoto (settings) {
      this.modal = false
      this.styleForImg = settings
    }
  },
  computed: {
    styleImg () {
      return `top: ${this.styleForImg.top - 2.5}px; left: ${this.styleForImg.left - 2.5}px; width: ${this.styleForImg.width}%`
    }
  }

}
</script>

<style></style>

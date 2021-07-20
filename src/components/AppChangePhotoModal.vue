<template>
  <div class="modal-bg flex-center">
    <div class="modal" :class="currentPosition.class">
      <div class="modal-header">
        <span>Редактировать фото</span>
        <span
          @click="$emit('closeModal')">
          Закрыть
        </span>
      </div>
      <div class="modal-content">
        <div class="modal-content__photo" >
          <div class="modal-content__photo__bg">
            <div class="modal-content__photo__wrap" ref="availableLine">
              <img :src="currentPosition.src" alt="Background" draggable="false"
                ref="img"
                @mousedown="availableMove"
                @mouseleave="unavailableMove"
                @mouseup="unavailableMove"
                @mousemove="changePosition"
                :style="styleForImg">
            </div>
          </div>
        </div>
        <div class="modal-content__tools">
          <p>Увеличить</p>
          <input type="range" min="1" max="3" step="0.1" v-model="zoom" aria-valuetext="Увеличить">
        </div>
      </div>
      <div class="modal-btn">
        <button class="modal-btn__delete" @click="deleteImg">Удалить фото</button>
        <div>
          <button @click="addNewPhoto">Изменить фото</button>
          <input type="file" accept="image/*"
            @change="checkOnPhoto"
            style="display:none"
            ref="addPhotoInput">
          <button @click="saveSettingsForPhoto">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['save', 'closeModal'],
  props: {
    currentPosition: Object
  },
  data () {
    return {
      bgPosition: {
        top: this.currentPosition.top / this.currentPosition.difference,
        left: this.currentPosition.left / this.currentPosition.difference,
        width: (this.currentPosition.width / (this.currentPosition.width / 100))
      },
      zoom: this.currentPosition.width / 100,
      move: false,
      top: null,
      left: null
    }
  },
  computed: {
    styleForImg () {
      return `top: ${this.bgPosition.top}px; left: ${this.bgPosition.left}px; width: ${this.bgPosition.width * this.zoom}%`
    }
  },
  methods: {
    availableMove (evt) {
      this.top = evt.pageY - evt.target.offsetTop
      this.left = evt.pageX - evt.target.offsetLeft
      this.move = true
    },
    unavailableMove () {
      this.top = null
      this.left = null
      this.move = false
    },
    changePosition (evt) {
      if (this.move) {
        this.bgPosition.top = evt.pageY - this.top
        this.bgPosition.left = evt.pageX - this.left
      }
    },
    saveSettingsForPhoto () {
      const img = this.$refs.img
      this.$emit('save', this.currentPosition.type, {
        top: img.offsetTop * this.currentPosition.difference,
        left: img.offsetLeft * this.currentPosition.difference,
        width: (this.bgPosition.width * this.zoom),
        src: img.src
      })
    },
    addNewPhoto () {
      this.$refs.addPhotoInput.click()
    },
    checkOnPhoto (evt) {
      const url = URL.createObjectURL(evt.target.files[0])
      this.$refs.img.src = url
    },
    deleteImg () {
      const type = this.currentPosition.type.split('Settings')[0]
      this.$refs.img.src = this.$store.getters.getDefaultImg[type]
      this.bgPosition.top = 0
      this.bgPosition.left = 0
      this.zoom = 1
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="modal-bg flex-center">
    <div class="modal">
      <div class="modal-header">
        <span>Редактировать фото</span>
        <span>Закрыть</span>
      </div>

      <div class="modal-content">

        <div class="modal-content__photo">
          <div class="modal-content__photo__bg" ref="availableLine">
            <img src="../assets/test.jpg" alt="Background" draggable="false"
              @mousedown="availableMove"
              @mouseup="unavailableMove"
              @mousemove="changePosition"
              :style="styleForImg">
          </div>
        </div>

        <div class="modal-content__toolsvue">
          <p>Увеличить</p>
          <input type="range" min="1" max="3" step="0.1" v-model="width" aria-valuetext="Увеличить">
        </div>

      </div>

      <div class="modal-btn">
        <button class="modal-btn__delete">Удалить фото</button>
        <div>
          <button>Изменить фото</button>
          <button @click="saveSettingsForPhoto">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['save'],
  data () {
    return {
      bgPosition: {
        top: 0,
        left: 0,
        width: 50
      },
      width: 2,
      move: false,
      top: null,
      left: null
    }
  },
  computed: {
    styleForImg () {
      return `top: ${this.bgPosition.top}px; left: ${this.bgPosition.left}px; width: ${this.bgPosition.width * this.width}%`
    }
  },
  methods: {
    availableMove (evt) {
      this.top = evt.pageY
      this.left = evt.pageX
      this.move = true
    },
    unavailableMove () {
      this.top = null
      this.left = null
      this.move = false
    },
    changePosition (evt) {
      if (this.move) {
        const x = this.bgPosition.left - (this.left - evt.pageX)
        const y = this.bgPosition.top - (this.top - evt.pageY)
        this.bgPosition.top = y
        this.top = evt.pageY
        this.bgPosition.left = x
        this.left = evt.pageX
      }
    },
    saveSettingsForPhoto () {
      this.$emit('save', { top: this.bgPosition.top, left: this.bgPosition.left, width: this.bgPosition.width * this.width })
    }
  }
}
</script>

<style>

</style>

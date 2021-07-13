<template>
  <div class="modal-bg flex-center">
    <div class="modal" :class="currentPosition.class">
      <div class="modal-header">
        <span>Редактировать фото</span>
        <span>Закрыть</span>
      </div>

      <div class="modal-content">
        <div class="modal-content__photo">
          <div class="modal-content__photo__bg" ref="availableLine">
            <img :src="require(`../assets/${currentPosition.src}.jpg`)" alt="Background" draggable="false"
              @mousedown="availableMove"
              @mouseup="unavailableMove"
              @mousemove="changePosition"
              :style="styleForImg">
          </div>
        </div>

          <div class="modal-content__tools">
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
  props: {
    currentPosition: Object
  },
  data () {
    return {
      bgPosition: {
        top: this.currentPosition.top + (40 / (this.currentPosition.width / 100)),
        left: this.currentPosition.left + (40 / (this.currentPosition.width / 100)),
        width: (this.currentPosition.width / (this.currentPosition.width / 100)) - this.currentPosition.subtract
      },
      width: this.currentPosition.width / 100,
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
        const coefficient = 40 * this.width
        const a = this.$refs.availableLine.getBoundingClientRect()
        const b = evt.target.getBoundingClientRect()
        const x = this.bgPosition.left - (this.left - evt.pageX)
        const y = this.bgPosition.top - (this.top - evt.pageY)
        this.bgPosition.top = (a.top + coefficient) >= b.top ? y : coefficient
        this.top = evt.pageY
        this.bgPosition.left = (a.left + coefficient) >= b.left ? x : coefficient
        this.left = evt.pageX
      }
    },
    saveSettingsForPhoto () {
      this.$emit('save', {
        top: this.bgPosition.top - (40 * this.width),
        left: this.bgPosition.left - (40 * this.width),
        width: (this.bgPosition.width * this.width) + this.currentPosition.subtract,
        type: this.currentPosition.type
      })
    }
  }
}
</script>

<style>

</style>

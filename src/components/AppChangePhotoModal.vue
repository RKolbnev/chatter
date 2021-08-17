<template>
  <div class="modal-bg flex-center">
    <div class="modal" :class="currentPosition.class">
      <div class="modal-header">
        <span>Редактировать фото</span>
        <span @click="$emit('closeModal')">Закрыть</span>
      </div>
      <div class="modal-content">
        <div class="modal-content__photo">
          <div class="modal-content__photo__bg">
            <div class="modal-content__photo__wrap" ref="availableLine">
              <img
                alt="Background"
                draggable="false"
                :src="currentPosition.src"
                :style="styleForImg"
                ref="img"
                @mousedown="availableMove"
                @mouseleave="unavailableMove"
                @mouseup="unavailableMove"
                @mousemove="changePosition"
              />
              <div v-if="loadImg" class="progress">
                <progress :value="progressLoad" max="100" ></progress>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content__tools">
          <p>Увеличить</p>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            v-model="zoom"
            aria-valuetext="Увеличить"
          />
        </div>
      </div>
      <div class="modal-btn">
        <button class="modal-btn__delete" @click="deleteImg">
          Удалить фото
        </button>
        <div>
          <button>
            Изменить фото
            <input type="file" accept="image/*" @change="addNewPhoto" />
          </button>
          <button @click="saveSettingsForPhoto">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  emits: ['save', 'closeModal'],
  props: {
    currentPosition: Object,
    id: String
  },
  data () {
    return {
      bgPosition: {
        top: this.currentPosition.top / this.currentPosition.difference,
        left: this.currentPosition.left / this.currentPosition.difference,
        width: this.currentPosition.width / (this.currentPosition.width / 100)
      },
      zoom: this.currentPosition.width / 100,
      move: false,
      top: null,
      left: null,
      loadImg: false,
      progressLoad: 0
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
        width: this.bgPosition.width * this.zoom,
        src: img.src
      })
    },
    addNewPhoto (evt) {
      this.loadImg = true
      const uploadTask = firebase
        .storage()
        .ref(`/${this.id}`)
        .child(this.currentPosition.type.split('Settings')[0])
        .put(evt.target.files[0])
      uploadTask.on(
        'state_changed', // Метод позволяет назначить 3 наблюдателей
        // 1 Срабатывает каждый раз при изменении состояния
        snapshot => { // для примера выводим % загрузки
          console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%')
          this.progressLoad = snapshot.bytesTransferred / snapshot.totalBytes * 100
        },
        // 2 При ошибке
        err => {
          alert(err.message)
        },
        // 3 При успешном заверщении загрузки
        // Получаем ссылку на загруженый файл.
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(url => (this.$refs.img.src = url))
          this.loadImg = false
        }
      )
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

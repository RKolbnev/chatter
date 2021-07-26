import { createStore } from 'vuex'
import firebase from '../firebase'

export default createStore({
  state () {
    return {
      userInfo: null,
      storageID: null,
      defaultImg: {
        photo: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultPhoto.jpg?alt=media&token=6c209b4d-8a89-4999-b6de-4e85aa3b2ab6',
        bg: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultBg.jpg?alt=media&token=be60d324-5a19-44b6-80e8-60685e38c8b2'
      }
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    // getPhotoSettings (state) {
    //   return state.userInfo.photoSettings;
    // },
    // getBgSettings (state) {
    //   return state.userInfo.bgSettings;
    // },
    getDefaultImg (state) {
      return state.defaultImg
    }
  },
  mutations: {
    addUserInfo (state, data) { // Использую при регистрации
      state.userInfo = data
    },
    setStorageID (state, data) { // Испотльзую при регистрации
      state.storageID = data
    },
    changeUserInfo (state, payload) { // Сохранение данных на сервер
      state.userInfo[payload.type] = payload.data
      firebase.firestore().collection('users').doc(state.storageID).set({ [payload.type]: payload.data }, { merge: true })
    }
  },
  actions: {

  },
  modules: {
  }
})

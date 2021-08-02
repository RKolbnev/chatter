import { createStore } from 'vuex'
import firebase from '../firebase'

import chat from './modules/chat'
import photo from './modules/photo'

export default createStore({
  modules: {
    chat,
    photo
  },
  state () {
    return {
      userInfo: null,
      storageID: null
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getStorageID (state) {
      return state.storageID
    }
  },
  mutations: {
    addUserInfo (state, data) {
      state.userInfo = data
    },
    setStorageID (state, data) {
      state.storageID = data
    },
    changeUserInfo (state, payload) { //* Сохранение данных на сервер
      state.userInfo[payload.type] = payload.data
      firebase
        .firestore()
        .collection('users')
        .doc(state.storageID)
        .set({ [payload.type]: payload.data }, { merge: true })
    }
  },
  actions: {}
})

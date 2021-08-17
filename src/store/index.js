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
    },
    addPublic (state, payload) {
      state.userInfo.publics.push(payload)
      firebase
        .firestore()
        .collection('users')
        .doc(state.storageID)
        .set({ publics: state.userInfo.publics }, { merge: true })
    },
    deletePublic (state, publicID) {
      state.userInfo.publics = state.userInfo.publics.filter(post => post.id !== publicID)
      firebase
        .firestore()
        .collection('users')
        .doc(state.storageID)
        .set({ publics: state.userInfo.publics }, { merge: true })
    }
  }
})

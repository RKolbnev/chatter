import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      userInfo: null
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    addUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})

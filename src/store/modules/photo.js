export default {
  namespaced: false,
  state () {
    return {
      defaultImg: {
        photo: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultPhoto.jpg?alt=media&token=6c209b4d-8a89-4999-b6de-4e85aa3b2ab6',
        bg: 'https://firebasestorage.googleapis.com/v0/b/chatter-df15a.appspot.com/o/defaultBg.jpg?alt=media&token=be60d324-5a19-44b6-80e8-60685e38c8b2'
      }
    }
  },
  getters: {
    getDefaultImg (state) {
      return state.defaultImg
    }
  },
  mutations: {},
  actions: {}
}

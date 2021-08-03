import firebase from '../../firebase'

export default {
  namespaced: false,
  state () {
    return {
      listeningsRooms: {}
    }
  },
  getters: {
    getListeningsRooms (state) {
      return (id) => {
        return state.listeningsRooms?.[id]
      }
    }
  },
  mutations: {
    addChatRoom (_, data) {
      const collection = firebase
        .firestore()
        .collection('rooms')
        .doc(data.id)
        .collection(data.id)
      collection
        .where('roomID', '==', data.roomID)
        .get()
        .then(docs => {
          if (!docs.size) {
            collection.add({
              roomID: data.roomID,
              chatPerson: data.chatPerson
            })
          }
        })
    },
    addListeningRoom (state, id) {
      state.listeningsRooms[id] = id
    },
    sendMessage (_, message) {
      firebase
        .firestore()
        .collection('messages')
        .doc(message.roomID)
        .collection(message.roomID)
        .add(message)
    },
    readMessage (_, data) {
      firebase
        .firestore()
        .collection('messages')
        .doc(data.id)
        .collection(data.id)
        .doc(data.storageID)
        .set({ status: true }, { merge: true })
    }
  },
  actions: {}
}

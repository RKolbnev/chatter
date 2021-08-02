import firebase from '../../firebase'

export default {
  namespaced: false,
  state () {
    return {}
  },
  getters: {
    getChatRooms (_) {
      return (id) => {
        const chatRooms = []

        firebase
          .firestore()
          .collection('rooms')
          .doc(id)
          .collection(id)
          .get()
          .then(docs => {
            docs.forEach(doc => chatRooms.push(doc.data()))
          })

        return chatRooms
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
    sendMessage (state, message) {
      console.log(message)
      firebase
        .firestore()
        .collection('messages')
        .doc(message.roomID)
        .collection(message.roomID)
        .add(message)
    }

  },
  actions: {}
}

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCQb-al3_g82EZBrizQ1YbQCY-FtTxymgA',
  authDomain: 'chatter-df15a.firebaseapp.com',
  projectId: 'chatter-df15a',
  storageBucket: 'chatter-df15a.appspot.com',
  messagingSenderId: '796253157725',
  appId: '1:796253157725:web:8138a8d3ddc505232b50b4'
}

firebase.initializeApp(firebaseConfig)

export default firebase

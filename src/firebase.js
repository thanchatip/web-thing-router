import {
  firebase
} from '@firebase/app'
import '@firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyAJGizlnRRufuCoI4PDaH7Zi9mxyrVBOXQ',
  authDomain: 'mrtproject-386ae.firebaseapp.com',
  databaseURL: 'https://mrtproject-386ae.firebaseio.com',
  projectId: 'mrtproject-386ae',
  storageBucket: 'mrtproject-386ae.appspot.com',
  messagingSenderId: '392425188189',
  appId: '1:392425188189:web:9e8457bd7800515f2c96b4'
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db

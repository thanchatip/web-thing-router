import Vue from 'vue'
import Vuex from 'vuex'
import '@firebase/firestore'
import db from '../firebase.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    event: [],
    idols: [],
    locations: []
  },
  mutations: {
    'SET_IDOL' (state, idols) {
      state.idols = idols
    },
    'SET_LOCATION' (state, locations) {
      state.locations = locations
    }
  },
  actions: {
    addEvent ({ commit }, payload) {
      db.collection('Events').add({
        eventName: payload.eventName,
        idol: payload.selectedIdol,
        location: payload.selectedLocation,
        start: payload.startDate,
        end: payload.endDate
      })
    },
    loadIdol ({ commit }) {
      const idolList = []
      db.collection('Person').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const idol = {
            id: doc.id,
            name: doc.data().name
          }
          idolList.push(idol)
        })
      })
      commit('SET_IDOL', idolList)
    },
    loadLocation ({ commit }) {
      const locationList = []
      db.collection('Locations').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const location = {
            id: doc.id,
            locationName: doc.data().locationName
          }
          locationList.push(location)
        })
      })
      commit('SET_LOCATION', locationList)
    }
  },
  getters: {
    allIdols (state) {
      return state.idols
    },
    allLocations (state) {
      return state.locations
    }
  }
})

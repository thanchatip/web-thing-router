import Vue from 'vue'
import Vuex from 'vuex'
import '@firebase/firestore'
import db from '../firebase.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    idols: [],
    locations: []
  },
  mutations: {
    'SET_IDOL' (state, idols) {
      state.idols = idols
    },
    'SET_LOCATION' (state, locations) {
      state.locations = locations
    },
    'SET_EVENT' (state, events) {
      state.events = events
    }
  },
  actions: {
    async addEvent ({ commit }, payload) {
      try {
        console.log('saving...')
        await db.collection('Events').add({
          eventName: payload.eventName,
          idol: payload.selectedIdol,
          location: payload.selectedLocation,
          start: payload.startDate,
          end: payload.endDate
        })
        console.log('saved')
        return 'saved'
      } catch {
        return 'error'
      }
    },
    async loadIdol ({ commit }) {
      try {
        const idolList = []
        const querySnapshot = await db.collection('Person').get()
        querySnapshot.forEach(function (doc) {
          const idol = {
            id: doc.id,
            name: doc.data().name
          }
          idolList.push(idol)
        })
        commit('SET_IDOL', idolList)
        return 'loaded'
      } catch {
        return 'error'
      }
    },
    async loadLocation ({ commit }) {
      try {
        const locationList = []
        const querySnapshot = await db.collection('Locations').get()
        querySnapshot.forEach(function (doc) {
          const location = {
            id: doc.id,
            locationName: doc.data().locationName
          }
          locationList.push(location)
        })
        commit('SET_LOCATION', locationList)
        return 'loaded'
      } catch {
        return 'error'
      }
    },
    async loadEvent ({ commit }) {
      try {
        const eventList = []
        const querySnapshot = await db.collection('Events').get()
        querySnapshot.forEach(function (doc) {
          const event = {
            id: doc.id,
            eventName: doc.data().eventName,
            idol: doc.data().idol,
            location: doc.data().location,
            start: doc.data().start,
            end: doc.data().end
          }
          eventList.push(event)
        })
        commit('SET_EVENT', eventList)
        return 'loaded'
      } catch {
        return 'error'
      }
    },
    async getEventDetail ({ commit }, eventID) {
      const doc = await db.collection('Events').doc(eventID).get()
      if (doc.exists) {
        console.log(doc.data())
        return doc.data()
      }
    },
    async updateEvent ({ commit }, event) {
      try {
        await db.collection('Events').doc(event.id).set({
          eventName: event.eventName,
          idol: event.idol,
          location: event.location,
          start: event.start,
          end: event.end
        })
        console.log('updated')
        return 'updated'
      } catch {
        console.log('update failed')
        return 'error'
      }
    },
    async deleteEvent ({ commit }, eventID) {
      try {
        await db.collection('Events')
          .doc(eventID)
          .delete()
        console.log('deleted')
        return 'deleted'
      } catch {
        console.log('error')
        return 'error'
      }
    }
  },
  getters: {
    allIdols (state) {
      return state.idols
    },
    allLocations (state) {
      return state.locations
    },
    allEvents (state) {
      return state.events
    }
  }
})

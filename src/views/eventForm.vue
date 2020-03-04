<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1> Add Event Feature </h1>
    </div>
    <h5> Idol </h5>
    <select v-model="selectedIdol" id="idol" v-on:click="loadIdol()">
      <option value="null">Please Select Idol</option>
      <option v-for="(idol) in idols" v-bind:key="idol.id" value:key="idol.name"> {{idol.name}} </option>
    </select>
    <br><br>
    <h5>Location</h5>
    <select v-model="selectedLocation" id="location" v-on:click="loadLocation()">
      <option value="null"> Please Select Location </option>
      <option v-for="(location) in locations" v-bind:key="location.id" value:key="location.locationName">
        {{location.locationName}}
      </option>
    </select><br><br>
    <label for="startDate">
      <h5> Start Date </h5>
    </label><br>
    <input type="date" id="startDate" v-model="startDate"><br><br>
    <h5>End Date</h5>
    <input type="date" id="endDate" v-model="endDate"><br><br>
    <button type="button" class="btn btn-info" v-on:click="addEvent()"> Add Event </button><br><br>
    <h3> Result </h3>
    <div class="mt-2">Idol:<strong>{{selectedIdol}}</strong></div>
    <div class="mt-2">Location:<strong>{{selectedLocation}}</strong></div>
    <div class="mt-2"> Start:<strong>{{startDate}}</strong></div>
    <div class="mt-2"> End:<strong>{{endDate}}</strong></div>
  </div>
</template>

<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

<script>
  import {
    firebase
  } from "@firebase/app";
  import "@firebase/firestore";
  import db from '../firebase.js'

  export default {
    name: 'Event',
    data() {
      return {
        events: [],
        locations: '',
        idols: '',
        selectedIdol: null,
        selectedLocation: null,
        selectedStartDate: null,
        selectedEndDate: null,
        startDate: null,
        endDate: null
      }
    },
    firebase() {
      return {
        idols: db.collection('Person'),
        locations: db.collection('Locations'),
        events: db.collection('Events')
      }
    },
    methods: {
      loadIdol() {
        let idolList = [];
        db.collection('Person').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let idol = {
              id: doc.id,
              name: doc.data().name,
            }
            idolList.push(idol)
          });
        });
        this.idols = idolList;
      },
      loadLocation() {
        let locationList = [];
        db.collection('Locations').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let location = {
              id: doc.id,
              locationName: doc.data().locationName,
            }
            locationList.push(location)
          });
        });
        this.locations = locationList;
      },
    }
  }
</script>

<style>
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }
</style>

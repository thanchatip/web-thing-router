<template>
  <div>
      <div class="card w-75">
        <div class="card-body">
            <div class="card-title">
                <label>Event Name</label>
                <input v-model="event.eventName" type="text" class="form-control">
                <small class="form-text text-muted">Required*</small>
                <label>Idol</label><br>
        <select v-model="event.selectedIdol" id="idol" >
      <option value="null">Please Select Idol</option>
      <option v-for="(idol) in allIdols" v-bind:key="idol.id" value:key="idol.name"> {{idol.name}} </option>
    </select>
    <br><br>
    <label>Location</label><br>
    <select v-model="event.selectedLocation" id="location">
      <option value="null"> Please Select Location </option>
      <option v-for="(location) in allLocations" v-bind:key="location.id" value:key="location.locationName">
        {{location.locationName}}
      </option>
    </select><br><br>
    <label for="startDate">
      <h5> Start Date </h5>
    </label><br>
    <input type="date" id="startDate" v-model="event.startDate"><br><br>
    <h5>End Date</h5>
    <input type="date" id="endDate" v-model="event.endDate"><br><br>
        <button class="btn btn-primary" >Cancel</button>&nbsp;
      <button class="btn btn-primary" @click="addEvent(event)">Create Event</button>
            </div>
            </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Create',
  data () {
    return {
      event:
      {
        eventName: '',
        locations: '',
        idols: '',
        selectedIdol: null,
        selectedLocation: null,
        selectedStartDate: null,
        selectedEndDate: null,
        startDate: null,
        endDate: null
      }

    }
  },
  mounted () {
    this.loadIdol()
    this.loadLocation()
  },
  computed: {
    ...mapGetters({
      allLocations: 'allLocations',
      allIdols: 'allIdols'
    })
  },
  methods: {
    ...mapActions({
      addEvent: 'addEvent',
      loadIdol: 'loadIdol',
      loadLocation: 'loadLocation'
    })
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

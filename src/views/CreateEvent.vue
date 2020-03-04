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
      <button class="btn btn-primary" @click="save(event)">Save</button>
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
      },
      eventID: undefined

    }
  },
  async mounted () {
    const eventID = this.$route.params.id
    console.log(eventID)
    if (eventID !== undefined) {
      const event = await this.getEventDetail(eventID)
      this.event.eventName = event.eventName
      await this.loadIdol()
      await this.loadLocation()
    } else {
      await this.loadIdol()
      await this.loadLocation()
    }
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
      loadLocation: 'loadLocation',
      getEventDetail: 'getEventDetail',
      updateEvent: 'updateEvent'
    }),
    async save (event) {
      const result = await this.updateEvent({
        eventName: this.event.eventName
      })
      if (result === 'updated') { this.$router.push({ name: 'home' }) } else {
        const result = await this.addEvent(event)
        if (result === 'saved') { this.$router.push({ name: 'home' }) }
      }
    }
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

<template>
   <div class="home">
      <div class="card mb-2" v-for="(event,index) in allEvents" v-bind:key="event.id">
        <div class="card-body">
        <h4 class="card-title">Event {{index + 1}} : {{ event.eventName }}</h4>
        <h5 class="card-text">{{event.idol}} at {{event.location}}</h5>
        <p class="card-text">Event start {{event.start}} - {{event.end}}</p>
        </div>
         <div class="row">
          <div class="col-auto mr-auto">
            <button class="btn btn-primary"> Edit </button>
                &nbsp;
              <button class="btn btn-danger">Delete</button>&nbsp;
          </div>
         </div>
         <br>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  mounted () {
    this.loadEvent()
  },
  computed: {
    ...mapGetters({
      allEvents: 'allEvents'
    })
  },
  methods: {
    ...mapActions({
      loadEvent: 'loadEvent'
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

occupancy.data = {
  locations: [],
  img: occupancy.img,
  defaultImg: occupancy.config.defaultImg,
  config: occupancy.config
};

occupancy.app = new Vue({
  el: '#app',
  data: occupancy.data,
  methods: {
    'moment': moment
  }
})

axios.get(occupancy.config.server + '/api/v1/locations')
.then(function(response){
  console.log(response);
  occupancy.data.locations = response.data;
  return occupancy.data.locations;
})
.then(function(locations){
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    axios.get(occupancy.config.server + '/api/v1/locations/' + location.name + '/occupancy')
      .then(function(response){
        console.log(response)
        Vue.set(location, 'occupancy', response.data);
      });
  }
})

window.setInterval(function(){
  for (var i = 0; i < occupancy.data.locations.length; i++) {
    var location = occupancy.data.locations[i];
    axios.get(occupancy.config.server + '/api/v1/locations/' + location.name + '/occupancy')
      .then(function(response){
        console.log(response)
        Vue.set(location, 'occupancy', response.data);
      });
  }
}, occupancy.config.updateInterval * 1000)

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

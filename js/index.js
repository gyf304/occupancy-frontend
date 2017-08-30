occupancy.data = {
  locations: [],
  img: occupancy.img,
  defaultImg: occupancy.config.defaultImg,
  config: occupancy.config,
  infoCards: occupancy.config.infoCards.slice()
};

occupancy.populateLocations = function(){
  return axios.get(occupancy.config.server + '/api/v1/locations/')
  .then(function(response){
    occupancy.data.locations = response.data;
  });
};

occupancy.updateLocations = function(){
  for (var i = 0; i < occupancy.data.locations.length; i++) {
    var location = occupancy.data.locations[i];
    axios.get(occupancy.config.server + '/api/v1/locations/' + location.name + '/occupancy')
      .then(function(response){
        Vue.set(location, 'occupancy', response.data);
      });
  }
};

occupancy.app = new Vue({
  el: '#app',
  data: occupancy.data,
  methods: {
    'moment': moment
  }
});

window.onload = function(){
  // iOS detected, iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream) {
    if (window.navigator.standalone) { // web app
      document.getElementById('app').className += ' web-app';
      iNoBounce.enable();
    } else { // not web app, add install message
      occupancy.data.infoCards.push({
        title: 'Install as iOS App', 
        contentHtml: '<p>You can install Occupancy as an app:</p>' +
        '<p> 1. Tap share in bottom bar' +
        '<p> 2. Tap "Add to Home Screen"'
      });
    }
  }
  
  $('.modal').modal();
  FastClick.attach(document.body);

  occupancy.populateLocations().then(occupancy.updateLocations);
  
  window.setInterval(occupancy.updateLocations, occupancy.config.updateInterval * 1000);
};

occupancy.data = {
  locations: [],
  img: occupancy.img,
  defaultImg: occupancy.config.defaultImg,
  config: occupancy.config,
  infoCards: occupancy.config.infoCards.slice()
};

occupancy.app = new Vue({
  el: '#app',
  data: occupancy.data,
  methods: {
    'moment': moment
  }
})

if (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  document.body.className += ' web-app';
  window.addEventListener('touchmove', function(){});
  var html = document.getElementsByTagName('html')[0];
  var wrapper = document.getElementById('content-wrapper');
  var prevDef = function(e){e.preventDefault();};
  var stopProp = function(e){e.stopPropagation();e.cancelBubble=true;};
  html.ontouchmove = prevDef;
  html.ontouchcancel = prevDef;
  html.ontouchstart = prevDef;
  html.ontouchend = prevDef;
  wrapper.ontouchmove = stopProp;
  wrapper.ontouchcancel = stopProp;
  wrapper.ontouchstart = stopProp;
  wrapper.ontouchend = stopProp;
}

if (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream && !window.navigator.standalone) {
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  occupancy.data.infoCards.push({
    title: 'Install as iOS App', 
    contentHtml: '<p>You can install Occupancy as an app:</p>' +
    '<p> 1. Tap share in bottom bar' +
    '<p> 2. Tap "Add to Home Screen"'
  });
}

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  FastClick.attach(document.body);
});

occupancy.populateLocations = function(){
  return axios.get(occupancy.config.server + '/api/v1/locations/')
  .then(function(response){
    occupancy.data.locations = response.data;
  });
}

occupancy.updateLocations = function(){
  for (var i = 0; i < occupancy.data.locations.length; i++) {
    var location = occupancy.data.locations[i];
    axios.get(occupancy.config.server + '/api/v1/locations/' + location.name + '/occupancy')
      .then(function(response){
        Vue.set(location, 'occupancy', response.data);
      });
  }
};

occupancy.populateLocations()
.then(occupancy.updateLocations);

window.setInterval(occupancy.updateLocations, occupancy.config.updateInterval * 1000);

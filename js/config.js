occupancy = {};
occupancy.config = {
  server: 'http://cmu-occupancy.herokuapp.com:80',
  title: 'Occupancy',
  updateInterval: 30,
  infoCards: [{
    'title': 'More coming',
    'contentHtml': '<p>Other locations will be added soon</p>',
    'img': 'http://lorempixel.com/800/400/cats/'
  }],
  aboutHtml: '<p>Project made by Yifan Gu</p>' + 
    '<p>Donate using <a href="https://venmo.com/?txn=pay&recipients=yifan-gu&note=Donation%20for%20Occupancy%20App">Venmo</a></p>' +
    '<p>Frontend powered by Vue.js, Materialize, Axios, Moment</p>' +
    '<p>Contribute to project on <a href="https://github.com/gyf304">Github</a>: ' +
    '<a href="https://github.com/gyf304/occupancy-frontend">Frontend</a>, ' +
    '<a href="https://github.com/gyf304/occupancy">Server</a>, ' +
    '<a href="https://github.com/gyf304/wifisniffer">Sniffer</a></p>'
}

occupancy.img = {
  'sorrells': 'http://www.library.cmu.edu/sites/drupal-live.library.cmu.edu/files/Sorrells%20Library.jpg',
  'default': 'http://lorempixel.com/800/400/cats/'
}

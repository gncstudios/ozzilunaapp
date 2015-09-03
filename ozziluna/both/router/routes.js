Router.route('/', {
  name: 'home'
});

Router.route('/dashboard/:username', {
  name: 'dashboard',

  controller: 'DashboardController'
});

Router.route('/bioEdit', {
  name: 'bioEdit',

  controller: 'BioEditController'
});


Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

Router.route('/', {
  name: 'home'
});

Router.route('/dashboard/:username', {
  name: 'dashboard',

  controller: 'DashboardController'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

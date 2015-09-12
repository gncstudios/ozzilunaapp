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
Router.route('/friends', {
  name: 'friends',
});
Router.route('/photos/:username', {
  name: 'photos',
});
Router.route('/about', {
  name: 'about',
});
Router.plugin('ensureSignedIn', {
  only: ['dashboard', "about", "bioEdit", "friends"]
});

Router.route('/', {
  name: 'home'
});

Router.route('/dashboard/:username', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.route('/bioEdit/:username', {
  name: 'bioEdit',

  controller: 'BioEditController'
});
Router.route('/friends/:username', {
  name: 'friends',
});
Router.route('/photos/:username', {
  name: 'photos',
});
Router.route('/about/:username', {
  name: 'about',
});
Router.route('/search/:username', {
  name: 'search',
});
Router.plugin('ensureSignedIn', {
  only: ['dashboard', "about", "bioEdit", "friends", "pics"]
});

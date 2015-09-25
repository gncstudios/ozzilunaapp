Router.route('/', {
  name: 'home',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser){
      console.log("Logged in!");
      this.render("dashboard");
    }
    else {
      console.log("Not logged in.");
        this.next();
    }
  }
});

Router.route('/dashboard/:username', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.route('/bioEdit', {
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

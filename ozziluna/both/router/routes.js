Router.route('/', {
  name: 'home',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser){
      console.log("Logged in!");
      $('body').css('background-image', 'none');
      if (Meteor.user().profile.name) {
        Router.go('/dashboard/' + Meteor.user().username);
      }
      else {
        console.log("Name not set, go to bio edit");
        Router.go('/bioEdit/' + Meteor.user().username);

      }
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

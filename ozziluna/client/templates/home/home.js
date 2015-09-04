Template.home.rendered = function() {
$('body').css('background-image', "url('/images/cover-image.png')")

};
Template.home.helpers({
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Meteor.user().username});
    if (thisDog) {
        return thisDog;
    }
    else {
      return false;
    }
  }
});

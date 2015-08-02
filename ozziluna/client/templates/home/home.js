Template.home.rendered = function() {
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



Template.dashboard.rendered = function() {
  Meteor.typeahead();
  Meteor.typeahead.inject();
};

Template.dashboard.helpers({
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    if (thisDog) {
        return thisDog;
    }
    else {
      return false;
    }
  }



});

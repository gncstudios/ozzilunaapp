

Template.dashboard.rendered = function() {
  Meteor.typeahead();
  Meteor.typeahead.inject();
  Session.set('editMode', false);
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
  },
  'statsEditMode': function() {
    return Session.get('statsEditMode');
  },
  'statsEditMode': function() {
    return Session.get('statsEditMode');
  }




});

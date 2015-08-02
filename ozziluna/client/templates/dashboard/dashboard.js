

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


// dependancies

Template.statsDisplay.helpers({
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
  },
  'dogAge': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var dogBirthDate = new Date(thisDog.birthMonth + " " + thisDog.birthDay + ", " + thisDog.birthYear);
    var now = Date.now();
    var age = new Date(Date.now() - dogBirthDate);

    return Math.abs(age.getYear() - 70) + " Years " + age.getMonth() + " Months";
  }
});
Template.statsEdit.helpers({
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

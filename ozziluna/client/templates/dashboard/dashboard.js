

Template.dashboard.rendered = function() {
  Meteor.typeahead();
  Meteor.typeahead.inject();
  Session.set('statsEditMode', false);
  Session.set('philosophyEditMode', false);
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
  'philosophyEditMode': function() {
    return Session.get('philosophyEditMode');
  },
  'isDogInProfileFriend': function() {
    var myDog = Dogs.findOne({username: Meteor.user().username});
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var isFriend = false;
    if (myDog.friends) {
      for (var i = 0; i < myDog.friends.length; i++) {
        console.log("My dog is friends with: " + myDog.friends[i].friendName);
        if (myDog.friends[i].friendName === thisDog.username) {
          isFriend = true;
        }
      }
    }
    return isFriend;
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
  }
});

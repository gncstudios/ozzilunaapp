

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
  // for getting this dogs activities
  'thisDogsActivities': function(){
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var thisDogsUsername = thisDog.username;
    return Activities.find({dogsByUsernameWhoLikeThisActivity: {$elemMatch: {username: thisDogsUsername}}});
  },
  // for editing stats
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
        if (myDog.friends[i].friendUsername == thisDog.username) {
          isFriend = true;
        }
      }
    }
    return isFriend;
  },
  // For detecting who is on the profile
  'isMyProfile': function() {
    var myDog = Dogs.findOne({username: Meteor.user().username});
    return myDog.username === Router.current().params.username;
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

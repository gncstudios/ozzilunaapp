

Template.dashboard.rendered = function() {
  Meteor.typeahead();
  Meteor.typeahead.inject();
  Session.set('statsEditMode', false);
  Session.set('philosophyEditMode', false);
  Session.set('interactionsEditMode', false);
  Session.set('postingMode', false);
  Session.set('commentingMode', false);

};
Template.newPostTemplate.helpers({
  'postPicUpload': function() {
    return {
      finished: function(index, fileInfo, context) {
        console.log("File Uploaded!");
        console.log(fileInfo);

        var userId = Meteor.userId();
        var dogToEdit = Dogs.findOne({username: Meteor.user().username});
        var picUrl = fileInfo.url;
        $('#postImagePreview').attr("src", picUrl);
        Pics.insert({usernameOfDogWhoOwnsThisPicture: Meteor.user().username, source: picUrl});
      },

    }
  }
});
Template.dashboard.helpers({
  'profilePicUpload': function() {
    return {
      finished: function(index, fileInfo, context) {
        console.log("File Uploaded!");
        console.log(fileInfo);
        var userId = Meteor.userId();
        var dogToEdit = Dogs.findOne({username: Meteor.user().username});

        var picUrl = fileInfo.url;

        Dogs.update(dogToEdit._id, {$set: {profilePic: picUrl}});
        Pics.insert({usernameOfDogWhoOwnsThisPicture: Meteor.user().username, source: picUrl});

      },

    }
  },
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    if (thisDog) {
      return thisDog;
    }
    else {
      return false;
    }
  },
  'ageOfThisDog': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var dogBirthDate = new Date(thisDog.birthDate);
    var now = Date.now();
    var age = new Date(Date.now() - dogBirthDate);
    if (age) {
      return Math.abs(age.getYear() - 70) + " Years " + age.getMonth() + " Months old ";

    }
    else {
      return "";
    }
  },
  'friendProfilePic':function (friendUsername) {
    var thisDog = Dogs.findOne({username: friendUsername});
    if (thisDog.profilePic){
      return thisDog.profilePic;
    }
    else {
      return "#";
    }
  },
  'thisDogsPosts' : function(){
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var thisDogsUsername = thisDog.username;
    return Posts.find({dogUsernameOfProfilePostedTo: thisDogsUsername});
  },
  // for getting this dogs activities
  'thisDogsActivities': function(){
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var thisDogsUsername = thisDog.username;
    return Activities.find({dogsByUsernameWhoLikeThisActivity: {$elemMatch: {username: thisDogsUsername}}});
  },
  // this is for posting
  'postingMode': function() {
    return Session.get('postingMode');
  },
  // for editing stats
  'statsEditMode': function() {
    return Session.get('statsEditMode');
  },
  'interactionsEditMode': function() {
    return Session.get('interactionsEditMode');
  },
  'philosophyEditMode': function() {
    return Session.get('philosophyEditMode');
  },
  'Activities': function() {
    return Activities.find().fetch().map(function(it){ return it.name; });
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
  'hasFriendRequestBeenSent': function() {
    var myDog = Dogs.findOne({username: Meteor.user().username});
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var friendRequestSent = false;
    if (thisDog.friendRequests) {
      for (var i = 0; i < thisDog.friendRequests.length; i++) {
        if (thisDog.friendRequests[i].usernameOfRequestedFriend == myDog.username) {
          friendRequestSent = true;
        }
      }
    }
    return friendRequestSent;
  },
  // For detecting who is on the profile
  'isMyProfile': function() {
    var myDog = Dogs.findOne({username: Meteor.user().username});
    return myDog.username === Router.current().params.username;
  },
  'numberOfLikesForPostByPostId': function(postId) {
    var thisPost = Posts.findOne({_id: postId});
    if (thisPost && thisPost.dogsWhoLikeThisPost) {
      return " + " + thisPost.dogsWhoLikeThisPost.length;
    }
    else {
      return "";
    }
  },

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
    var dogBirthDate = new Date(thisDog.birthDate);
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
Template.interactionsDisplay.helpers({
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
Template.interactionsEdit.rendered = function() {
  $('.slider').slider();
};

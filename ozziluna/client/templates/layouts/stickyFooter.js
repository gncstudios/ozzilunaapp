Template.stickyFooter.helpers({
  'Dogfriends': function(){
    return Dogs.find().fetch().map(function(it){ return it.name + " ( " + it.username + " )"; });
  },
  'myDog':function(){
    var thisUser = Meteor.user();
    if (thisUser){
      return Dogs.findOne({username: thisUser.username});
    }
  },
  'friendProfilePic':function (friendUsername) {
    var thisDog = Dogs.findOne({username: friendUsername});
    if (thisDog){
      return thisDog.profilePic;
    }
    else {
      return "#";
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
  }
});

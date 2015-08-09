DashboardController = AppController.extend({
  waitOn: function() {

    return this.subscribe('dogs') && this.subscribe('images') && this.subscribe('activities');
  },
  data: {
    dogs: Dogs.find({})
  },

  onAfterAction: function () {
    Meta.setTitle('Profile');
  }
});

DashboardController.events({
  /**
  *
  * This is for adding posts
  *
  */
  'click [data-action=newPost]': function (event, template) {
    event.preventDefault();
    Session.set('postingMode', true);

  },
  'click [data-action=savePost]': function (event, template) {
    event.preventDefault();
    /* push to the posts
    *   dogUsername:    the username of the dog that this belongs to
    *   typeOfPost:     post or comment
    *   parentPostId:   the parentPostId.. if undefined, it is a parent post
    *   [dogsTagged]:   dogs tagged in the post
    *   date:           the current date time of the post
    *   text:           the text of the post
    *   [photos]        the photos to display along with the post
    *   [comments]:     postId's relating to this.... same thing as posts, but parent post
    *
    *
    */
    var myDog = Dogs.findOne({username: Meteor.user().username});
    var dogUsernameOfProfilePostedTo = Router.current().params.username;
    var postImgUrl = $('#postImagePreview').attr("src");
    var postText = $('#postText').val();



    $('#postText').val('');
    if (postImgUrl) {
      Posts.insert({dogWhoPosted: myDog.username, dogUsernameOfProfilePostedTo: dogUsernameOfProfilePostedTo, typeOfPost: "Post", postDate: moment().format('LLLL'), text: postText, postImgUrl: postImgUrl});
    }
    else {
      Posts.insert({dogWhoPosted: myDog.username, dogUsernameOfProfilePostedTo: dogUsernameOfProfilePostedTo, typeOfPost: "Post", postDate: moment().format('LLLL'), text: postText});
    }
    Session.set('postingMode', false);
  },
  'click [data-action=cancelPost]': function (event, template) {
    event.preventDefault();
    Session.set('postingMode', false);

  },
  /**
  *
  * This is for adding friend
  *
  */
  'click [data-action=sendFriendRequest]': function (event, template) {
    event.preventDefault();
    console.log("Sending friend request");
    var myDog = Dogs.findOne({username: Meteor.user().username});
    var dogInProfile =  Dogs.findOne({username: Router.current().params.username});
    if (dogInProfile.friendRequests) {
      Dogs.update(dogInProfile._id, {$addToSet: {friendRequests: {usernameOfRequestedFriend: myDog.username}}});
    }
    else {
      Dogs.update(dogInProfile._id, {$set: {friendRequests: []}});
    }
  },

  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  },
  /**
  *
  * This is for adding activities
  *
  */
  'click [data-action=addActivity]': function (event, template) {
    event.preventDefault();

    if (Meteor.user().username === Router.current().params.username) {
      var activityToAdd = $('#activityToAdd').val();
      $('#activityToAdd').val('');
      if (activityToAdd.length) {
        var dogInProfile =  Dogs.findOne({username: Router.current().params.username});
        var existingActivity = Activities.findOne({name: activityToAdd});
        if (existingActivity) {
          Activities.update(existingActivity._id, {$addToSet:{dogsByUsernameWhoLikeThisActivity:  {username: dogInProfile.username}}});
        }
        else {
          Activities.insert({name: activityToAdd, dogsByUsernameWhoLikeThisActivity: [{username: dogInProfile.username}]});
        }
      }
    }
  },
  /*
  *
  * This is for editing interactions
  *
  */
  'click [data-action=editInteractions]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('interactionsEditMode', true);
    }
  },
  'click [data-action=cancelInteractionsEdit]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('interactionsEditMode', false);
    }
  },
  'click [data-action=saveInteractions]': function (event, template) {
    event.preventDefault();
    var dogToEdit = Dogs.findOne({username: Meteor.user().username});
    if (dogToEdit) {
      // save off the new stats
      var energy = $('#energyValue').val();
      $('#energyValue').val('');

      var aggression = $('#aggressionValue').val();
      $('#aggressionValue').val('');

      var obedience = $('#obedienceValue').val();
      $('#obedienceValue').val('');

      Dogs.update(dogToEdit._id, {$set: {energy: energy, aggression: aggression, obedience: obedience}});
    }
    Session.set('interactionsEditMode', false);
  },
  /*
  * This is for editing stats
  */
  'click [data-action=editStats]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('statsEditMode', true);
    }
  },
  'click [data-action=cancelStatsEdit]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('statsEditMode', false);
    }
  },
  'click [data-action=saveStats]': function (event, template) {
    event.preventDefault();
    var dogToEdit = Dogs.findOne({username: Meteor.user().username});
    if (dogToEdit) {
      // save off the new stats
      var name = $('#statsName').val();
      $('#statsName').val('');

      var breed = $('#statsBreed').val();
      $('#statsBreed').val('');

      var gender = $('#statsGender').val();
      $('#statsGender').val('');

      var fixed = $('#statsFixed').val();
      $('#statsFixed').val('');

      var birthDate = $('#statsBirthDate').val();
      $('#statsBirthDate').val('');
      Dogs.update(dogToEdit._id, {$set: {name: name, breed: breed, gender: gender, fixed: fixed,birthDate: birthDate}});
    }
    Session.set('statsEditMode', false);
  },
  /*
  * This is for editing philosophy
  */
  'click [data-action=editPhilosophy]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('philosophyEditMode', true);
    }
  },
  'click [data-action=cancelPhilosophyEdit]': function (event, template) {
    event.preventDefault();
    if (Meteor.user().username === Router.current().params.username) {
      Session.set('philosophyEditMode', false);
    }
  },
  'click [data-action=savePhilosophy]': function (event, template) {
    event.preventDefault();
    var dogToEdit = Dogs.findOne({username: Meteor.user().username});
    if (dogToEdit) {
      // save off the new stats
      var philosophy = $('#philosophy').val();
      $('#philosophy').val('');
      Dogs.update(dogToEdit._id, {$set: {philosophy: philosophy}});
    }
    Session.set('philosophyEditMode', false);
  },
  'change #profilePicInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          // handle error
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var dogToEdit = Dogs.findOne({username: Meteor.user().username});
          var imageUrl = "/cfs/files/images/" + fileObj._id;
          var dogToEdit = Dogs.findOne({username: Meteor.user().username});
          Dogs.update(dogToEdit._id, {$set: {profilePic: imageUrl}});
        }
      });
    });
  },
  'change #postPicInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          // handle error
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var dogToEdit = Dogs.findOne({username: Meteor.user().username});
          var imageUrl = "/cfs/files/images/" + fileObj._id;
          $('#postImagePreview').attr("src", imageUrl);
        }
      });
    });
  }
});

Template.bioEdit.rendered = function() {
  var thisDog = Dogs.findOne({username: Meteor.user().username});
  if (thisDog) {
    // Set the datepicker for the name
    $('#statsBirthDate').datepicker();

    // set the fields
    $('#statsName').val(thisDog.name);
    $('#statsBreed').val(thisDog.breed);
    $('#statsBirthDate').val(thisDog.birthDate);
    $('#statsGender').val(thisDog.gender);
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    var profilePicUrl = thisDog.profilePic;
    $('body').css('background-image', 'url("' + profilePicUrl + '")');
    // turn on the gender

    // turn on the fixed checkbox
  }
  else {
  }
};

Template.bioEdit.helpers({
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    if (thisDog) {
      return thisDog;
    }
    else {
      return false;
    }
  },
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
      }
    }
  },
});

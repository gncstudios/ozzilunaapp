BioEditController = AppController.extend({
  waitOn: function() {

    return this.subscribe('dogs') && this.subscribe('images') &&  this.subscribe('pics');
  },
  data: {

  }
});

BioEditController.events({
  'click [data-action=saveStats]': function (event, template) {
    event.preventDefault();
    console.log("* Saving Bio");
    var dogToEdit = Dogs.findOne({username: Meteor.user().username});
    if (dogToEdit) {
      // save off the new stats
      var name = $('#statsName').val();


      var breed = $('#statsBreed').val();


      var gender = $('#statsGender').val();


      var birthDate = $('#statsBirthDate').val();
    
      Dogs.update(dogToEdit._id, {$set: {name: name, breed: breed, gender: gender,birthDate: birthDate}});
    }
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
});

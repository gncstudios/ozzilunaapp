DashboardController = AppController.extend({
  waitOn: function() {

    return this.subscribe('dogs') && this.subscribe('images');
  },
  data: {
    dogs: Dogs.find({})
  },

  onAfterAction: function () {
    Meta.setTitle('Profile');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  },
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

      var birthDay = $('#statsBirthDay').val();
      $('#statsBirthDay').val('');

      var birthMonth = $('#statsBirthMonth').val();
      $('#statsBirthMonth').val('');

      var birthYear = $('#statsBirthYear').val();
      $('#statsBirthYear').val('');



      Dogs.update(dogToEdit._id, {$set: {name: name, breed: breed, gender: gender, fixed: fixed,birthDay: birthDay, birthMonth: birthMonth, birthYear: birthYear}});
    }
    Session.set('statsEditMode', false);
  },
  'change .profilePicInput': function(event, template) {
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
   }





});

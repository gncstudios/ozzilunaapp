DashboardController = AppController.extend({
  waitOn: function() {

    return this.subscribe('dogs');
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

      var birthDay = $('statsBirthDay').val();
      $('#statsBirthDay').val('');

      var birthMonth = $('statsBirthMonth').val();
      $('#statsBirthMonth').val('');

      var birthYear = $('statsBirthYear').val();
      $('#statsBirthYear').val('');

      Dogs.update(dogToEdit._id, {$set: {name: name, breed: breed, gender: gender, birthDay: birthDay, birthMonth: birthMonth, birthYear: birthYear}});
    }
    Session.set('statsEditMode', false);
  }






});

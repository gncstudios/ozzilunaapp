Template._header.rendered = function() {
  Meteor.typeahead();
  Meteor.typeahead.inject();
};

Template._header.helpers({
  'Dogfriends': function(){
    return Dogs.find().fetch().map(function(it){ return it.name + " ( " + it.username + " )"; });
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
  'myDog': function() {
    var thisDog = Dogs.findOne({username: Meteor.user().username});
    if (thisDog) {
      return thisDog;
    }
    else {
      return false;
    }
  }
});
Template._header.events({
  'click [data-action=searchForDog]': function (event, template) {
    event.preventDefault();
    var dogToSearchFor = $('#dogToSearchFor').val();
    $('#dogToSearchFor').val('');
    dogToSearchFor = dogToSearchFor.split("( ")[1];
    dogToSearchFor = dogToSearchFor.replace(" )", "");
    Router.go('/dashboard/' + dogToSearchFor);
  },
});

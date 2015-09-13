Template.search.rendered = function() {

    $('body').css('background-image', 'none');
    Meteor.typeahead();
    Meteor.typeahead.inject();
};

Template.search.helpers({
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Router.current().params.username});
    if (thisDog) {
      return thisDog;
    }
    else {
      return false;
    }
  },
  'thisDogsPhotos': function() {
    var thisDogsUsername = Router.current().params.username;
    if (thisDogsUsername) {
      return Pics.find({usernameOfDogWhoOwnsThisPicture: thisDogsUsername});
    }
  },
  'Dogfriends': function(){
    return Dogs.find().fetch().map(function(it){ return it.name + " ( " + it.username + " )"; });
  }
});
Template.search.events({
  'click [data-action=searchForDog]': function (event, template) {
    event.preventDefault();
    var dogToSearchFor = $('#dogToSearchFor').val();
    $('#dogToSearchFor').val('');
    dogToSearchFor = dogToSearchFor.split("( ")[1];
    dogToSearchFor = dogToSearchFor.replace(" )", "");
    Router.go('/dashboard/' + dogToSearchFor);
  },
});

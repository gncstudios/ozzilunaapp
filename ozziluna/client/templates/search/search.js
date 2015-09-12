Template.photos.rendered = function() {

    $('body').css('background-image', 'none');


};

Template.photos.helpers({
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
  }
});

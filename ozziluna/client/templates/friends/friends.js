Template.friends.rendered = function() {

    $('body').css('background-image', 'none');
    clearInterval(dogScroller);


};

Template.friends.helpers({
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

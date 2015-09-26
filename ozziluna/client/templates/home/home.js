Template.home.rendered = function() {

  var imageNumber = 1;
  $('body').css('background-image', 'url("/images/bg-image-1.png")');
  window.setInterval(function(){
    imageNumber++;
    var slideNumber = (imageNumber % 5 + 1);
    var imagePath = "/images/bg-image-" + slideNumber + ".png";
    console.log("Background Image Path: " + imagePath);
    $('body').css('background-image', 'url("' + imagePath + '")');
  }, 6000);
};
Template.home.helpers({
  'thisDog': function() {
    var thisDog = Dogs.findOne({username: Meteor.user().username});
    if (thisDog) {
        return thisDog;
    }
    else {
      return false;
    }
  }
});

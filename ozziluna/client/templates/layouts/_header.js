template._header.events = function () {
  'click [data-action=toggle-side-nav]' : fucntion () {
    console.log('Toggling Side Nav');
    $('.side-nav').toggle('1000');

  }

}

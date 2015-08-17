Meteor.publishComposite("pics", function() {
  return {
    find: function() {
      return Pics.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

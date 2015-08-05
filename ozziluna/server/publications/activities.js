Meteor.publishComposite("activities", function() {
  return {
    find: function() {
      return Activities.find({});
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

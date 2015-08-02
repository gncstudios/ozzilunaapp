Meteor.publishComposite("dogs", function() {
  return {
    find: function() {
      return Dogs.find({});
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

Meteor.publish("images", function(){ return Images.find(); });

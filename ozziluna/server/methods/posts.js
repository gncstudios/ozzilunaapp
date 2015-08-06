Meteor.methods({
  'Posts.insert': function (params) {
    Items.insert(params);
  }
});

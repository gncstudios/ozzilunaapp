Meteor.methods({
  'Dogs.insert': function (params) {
    Items.insert(params);
  }
});

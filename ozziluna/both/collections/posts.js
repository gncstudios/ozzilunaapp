Posts = new Mongo.Collection('posts');

Posts.helpers({

});

Posts.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

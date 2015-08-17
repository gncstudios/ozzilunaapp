Pics = new Mongo.Collection('pics');

Pics.helpers({

});

Pics.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

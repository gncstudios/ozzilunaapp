Dogs = new Mongo.Collection('dogs');

Dogs.helpers({

});

Dogs.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

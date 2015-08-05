Activities = new Mongo.Collection('activities');

Activities.helpers({

});

Activities.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

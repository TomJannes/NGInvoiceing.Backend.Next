'use strict';

module.exports.id = "addLinkedSkusToCustomer";

module.exports.up = function (done) {
  var coll = this.db.collection('Customer');
  coll.update({ linkedSkus: { $exists: false } }, { $set: { linkedSkus: [] } }, { multi: true });
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
const mongoose = require('mongoose');
const User = mongoose.model('users');

async function create(user) {
  return await new User(user)
    .save()
    .then(user => user)
    .catch(err => err);
}

async function find(where) {
  return await User
    .findOne(where)
    .then(user => user)
    .catch(err => err);
}

module.exports = {
  create,
  find
};
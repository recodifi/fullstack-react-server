const mongoose = require('mongoose');
const User = mongoose.model('users');

async function create(user) {
  return await new User(user)
    .save()
    .then(user => user)
    .catch(err => err);
}

async function find(obj) {
  return await User
    .findOne(obj)
    .then(user => user)
    .catch(err => err);
}

module.exports = {
  create,
  find
};
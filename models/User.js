var mongoose = require('mongoose');
var moment = require('moment');

var userSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  username: { type: String, unique: true, lowercase: true, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  topCategory: { type: String, default: '' },
  aboutCata: { type: String, default: '' },
  hobbies: { type: Array, default: '' },
  dob: { type: String, default: '' },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  orientation: { type: String, default: '' },
  aboutMe: { type: String, default: '' },
  createdTimeStamp: { type: String, default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a") }
});

module.exports = mongoose.model('user', userSchema);
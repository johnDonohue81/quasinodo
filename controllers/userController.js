var User = require('../models/User');
const Like = require("../models/Like");
var bcrypt = require('bcryptjs');


module.exports = {
  createuser: function (param) {
    return new Promise(function (resolve, reject) {
      User
        .findOne({ email: param.email })
        .then(user => {
          if (user) {
            let errors = {}
            errors.email = 'Email already exists';
            errors.status = 400;
            return reject(errors);
          } else {
            const newUser = new User({
              username: param.username,
              email: param.email,
              password: param.password,
              firstName: param.firstName,
              lastName: param.lastName,
              topCategory: param.topCategory,
              aboutCata: param.aboutCata,
              hobbies: param.hobbies,
              dob: param.dob,
              age: param.age,
              gender: param.gender,
              orientation: param.orientation,
              aboutMe: param.aboutMe
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err)
                  throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => resolve(user))
                  .catch(err => reject(err));
              });
            });

          }
        });
    })

  },
  loginUser: function (params, callback) {
    User.findOne({ username: params.username }, function (err, user) {
      if (err) {
        callback(err, null);
        return;
      }
      bcrypt.compare(params.password, user.password, function (err, res) {
        // res === true
        if (err) {
          callback(err, null);
        }

        if (res === false) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      });
    });
  },

  fetchUsers: (params) => {
    return new Promise((resolve, reject) => {
      User.find(params)
        .then(users => resolve(users))
        .catch(error => reject(error));
    });
  },

  updateUserProfile: function (id, params, callback) {

    if (params.password) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(params.password, salt);
      params.password = hash;
    }

    User.findByIdAndUpdate(id, params, { new: true }, function (err, updated) {
      if (err) {
        callback(err, null)
        return;
      }
      callback(null, updated);
    })
  },

  deleteUser: function (params, callback) {
    User.findByIdAndRemove(params, function (err) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, 'Successfully Deleted');
      return;
    });

  },

  findUser: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });

  }


};
var User = require('../models/User');
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
    User.findOne({ email: params.email }, function (err, user) {
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
  }
};
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('location');
});

router.post('/createuser', function (req, res, next) {
  userController.createuser(req.body)
    .then((user) => {
      req.session.userID = user._id;

      const userInfo = {
        user: user.username,
        email: user.email,
        sessionID: req.session.userID
      }
      res.json({
        message: 'Success',
        data: user,
        user: userInfo
      });
      return;
    })

    .catch((error) => {
      res.json({
        message: 'Failure',
        data: error
      });
      return;
    });
});

router.get('/browse', function (req, res, next) {
  userController.fetchUsers({})
    .then((users) => {
      res.json({
        message: 'Success',
        data: users
      });
      return;
    })
    .catch((error) => {
      res.json({
        message: 'Failure',
        data: error
      });
      return;
    });
})

router.post('/login', function (req, res, next) {
  userController.loginUser(req.body, function (err, user) {
    if (err) {
      res.status(404).json({
        message: 'Fail',
        error: err
      });
      return;
    }

    if (user === null) {
      res.render('result', {
        message: 'Failure to login, Please check your username and password',
        error: 'Check your username and password'
      });
      return;
    }

    req.session.userID = user._id;

    const userInfo = {
      user: user.username,
      email: user.email,
      sessionID: req.session.userID
    }

    res.json({
      message: 'Hello ' + user.username + ", you've successfully logged in",
      user: userInfo
    })
    // res.render('index', {
    //   message: 'Hello ' + user.username + ", you've successfully logged in",
    //   currentUser: user
    // });
    return;
  });
});

router.put('/update-profile', function (req, res, next) {
  let userID = req.session.userID
  let newProfile = req.body;

  if (req.body.password.length < 6) {
    res.json({
      message: 'Your password must be longer than 6 characters'
    })
  }
  userController.updateUserProfile(userID, newProfile, function (err, updated) {
    if (err) {
      res.json({
        message: 'fail',
        data: err
      })
      return;
    }
    res.json({
      message: 'updated',
      data: updated
    })
    return;
  })

})

router.delete('/delete-user', function (req, res) {
  userController.deleteUser(req.session.userID, function (err) {
    if (err) {
      res.json({
        message: 'Fail to delete user',
        data: err
      });
    }
    res.json({
      message: 'user deleted',
    })
  })

});

router.post('/likes', function (req, res, next) {

  userController.createPost(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

module.exports = router;

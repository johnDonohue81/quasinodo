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
      res.json({
        message: 'Success',
        data: user
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

    res.render('index', {
      message: 'Hello ' + user.username + ", you've successfully logged in",
      currentUser: user
    });
    return;
  });
});

module.exports = router;

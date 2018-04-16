var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sessions/index');
});

router.post('/', (req, res, next) => {
  const app = module.parent.exports;
  const ncmb = app.get('ncmb');
  const secret = app.get('secret');
  ncmb.User
    .login(req.body.userId, req.body.password)
    .then(user => {
      console.log(user);
      const userHash = {
        userName: user.userName,
        objectId: user.objectId,
        mailAddress: user.mailAddress,
        sessionToken: user.sessionToken
      }
      var token= jwt.sign(userHash, secret, {
        expiresIn: '24h'
      });
      res.cookie('token', token);
      res.redirect('/');
    })
});

module.exports = router;

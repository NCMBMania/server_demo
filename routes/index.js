var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.cookies.token;
  const app = module.parent.exports;
  const ncmb = app.get('ncmb');
  let user = null;
  try {
    if (token) {
      const json = jwt.verify(token, app.get('secret'));
      user = new ncmb.User(json);
      ncmb.currentUser  = user;
      console.log(user)
      ncmb.sessionToken = json.sessionToken;
    }
  } catch (e) {
    console.log(e)
  }
  res.render('index', { title: 'Express', user: user });
});

module.exports = router;

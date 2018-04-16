var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const token = req.cookies.token;
  const app = module.parent.exports;
  const ncmb = app.get('ncmb');
  try {
    const json = jwt.verify(token, app.get('secret'));
    ncmb.sessionToken = json.token;
    ncmb.currentUser  = new ncmb.User(json)
    console.log(ncmb.currentUser)
  } catch (e) {
    console.log(e)
  }
});


module.exports = router;

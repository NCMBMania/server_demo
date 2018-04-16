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
    ncmb.currentUser  = new ncmb.User(json)
    ncmb.sessionToken = json.sessionToken;
    const Todo = ncmb.DataStore('Todo');
    Todo
      .fetchAll()
      .then(todos => {
        res.render('todos/index', {todos: todos});
      })
  } catch (e) {
    // セッション切れ
    res.cookie.token = null;
    res.redirect('/');
  }
});

router.post('/', (req, res, next) => {
  const token = req.cookies.token;
  const app = module.parent.exports;
  const ncmb = app.get('ncmb');
  try {
    const json = jwt.verify(token, app.get('secret'));
    ncmb.currentUser  = new ncmb.User(json)
    ncmb.sessionToken = json.sessionToken;
    const Todo = ncmb.DataStore('Todo');
    const acl = new ncmb.Acl;
    acl
      .setUserReadAccess(ncmb.currentUser, true)
      .setUserWriteAccess(ncmb.currentUser, true);
    const todo = new Todo;
    todo
      .set('txt', req.body.txt)
      .set('acl', acl)
      .save()
      .then(todo => {
        res.redirect('/todos');
      })
  } catch (e) {
    
  }
});

router.delete('/:objectId', (req, res, next) => {
  const token = req.cookies.token;
  const app = module.parent.exports;
  const ncmb = app.get('ncmb');
  try {
    const json = jwt.verify(token, app.get('secret'));
    ncmb.currentUser  = new ncmb.User(json)
    ncmb.sessionToken = json.sessionToken;
    const Todo = ncmb.DataStore('Todo');
    const todo = new Todo;
    todo
      .set('objectId', req.params.objectId)
      .delete()
      .then(() => {
        res.redirect('/todos');
      })
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

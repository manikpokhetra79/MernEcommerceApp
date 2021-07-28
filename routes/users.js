const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controller');
// routes for pages
router.get('/',usersController.user);
// route for login and register page
router.get('/login',usersController.login);
router.get('/register',usersController.register);
// user authentication and creation
router.post('/create',usersController.createUser);
router.post('/create-session',passport.authenticate(
    'local' ,{
         failureRedirect : '/users/login'
    }
),usersController.createSession);
router.get('/destroy-session',usersController.destroySession);
module.exports = router;
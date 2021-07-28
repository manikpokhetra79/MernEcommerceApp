const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');
// authentication strategy
passport.use(new localStrategy({
    usernameField : 'email'
},function(email,password,done){
    User.findOne({email : email},function(err,user){
        if (err) { 
            return done(err);
         }
        if (!user || user.password != password) {
            console.log("Incorrect E-mail || password");
          return done(null, false);
        }
         // if credentials are valid, provide call with the user that is authenticated
         console.log("User Authenticated");
        return done(null,user);
    });
}
))

// transfer user data after successful login

passport.serializeUser(function(user,done){
    done(null, user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        done(err, user);
    })
});

// create middlewares
passport.checkAuthentication= function(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }else{
        return res.redirect('/users/login');
    }
    next();
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;
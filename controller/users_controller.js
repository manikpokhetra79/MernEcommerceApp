const User = require('../models/users');
// pages
module.exports.user = function(req,res){
    if(req.user){
        return res.redirect('/users/login');
    }else{
        return res.redirect('/users/register');
    }
}
module.exports.login = function(req,res){
    if(req.user){
        return res.redirect('/');
    }else{
        return res.render('user_login',{
            title : "Login Page"
        });
    }
}
module.exports.register = function(req,res){
    if(req.user){
        return res.redirect('/');
    }else{
        return res.render('user_register',{
            title : "Register Page"
        });
    }
}
// create user
module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log("Passwords not same");
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error while checking user email");
            return;
        }
        if(!user){
            //create user
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error while creating user");
                    return;
                }
                return res.redirect('/users/login');
            })
        }else{
            console.log("User already registered");
            return res.redirect('/users/login');
        }
    });
}
// CREATE SESSION
module.exports.createSession = function(req,res){
    console.log('success',"Logged in successfully");
    return res.redirect('/');
}
//destroy session
module.exports.destroySession = function(req,res){
   req.logout();
    return res.redirect('/');
}
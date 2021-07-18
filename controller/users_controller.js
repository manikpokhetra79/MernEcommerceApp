
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
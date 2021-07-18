const express = require('express');
const port = 8000;
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
//cookieparser,session
const cookieParser = require('cookie-parser');
const session = require('express-session');
// passport,localStrategy,db
const passport = require('passport');
const localStrategy = require('./config/passport-local');
const db = require('./config/mongoose');
const app = express();
// use sass middleware
app.use(sassMiddleware({
    src : './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix : '/css'
}));
// use static files
app.use(express.static('./assets'));
// setup ejs
app.set('view engine','ejs');
app.set('views','./views');
// use expressLayouts
app.use(expressLayouts);
// extract scripts and stylesheets
app.set("layout extractScripts",true);
app.set("layout extractStyles",true);
// session
app.use(session({
    name : 'appUser',
    secret : 'notgonnatellyou',
    resave : 'false',
    saveUninitialized : true,
    cookie:{
        maxAge: (1000*60*100) 
    }
}))
// passport middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// route for homepage
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log("Error connecting to server",err);
        return;
    }
    console.log(`Successfully connected to server at port : ${port}`);
})
const express = require('express');
const port = 8000;
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
//cookieparser,session
const cookieParser = require('cookie-parser');
const session = require('express-session');
// we're running the method returned from the require('connect-mongo') with the session passed into it.
const mongoStore= require('connect-mongo')(session);
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
//parse form data to String
app.use(express.urlencoded());
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
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge: (1000*60*100) 
    },
    store: new mongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'

    },function(err){
        console.log("Err",err);
    })
}));
// passport middlewares
app.use(passport.initialize());
app.use(passport.session());
// set locals.user from req.user
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
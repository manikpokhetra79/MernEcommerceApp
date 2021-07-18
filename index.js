const express = require('express');
const port = 8000;
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');

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
// route for homepage
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log("Error connecting to server",err);
        return;
    }
    console.log(`Successfully connected to server at port : ${port}`);
})
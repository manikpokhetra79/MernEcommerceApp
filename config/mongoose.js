const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecom_app_db');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Database connection error:"));
db.once('open',function(){
    console.log("Successfully connected to database");
});
module.exports = db;
const express = require('express');
const port = 8000;
const app = express();


app.listen(port,function(err){
    if(err){
        console.log("Error connecting to server",err);
        return;
    }
    console.log(`Successfully connected to server at port : ${port}`);
})
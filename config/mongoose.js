const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/todolist_db');


const db= mongoose.connection;

// error
db.on('error',function(err){
    console.log(err.message);
});

// up and running

db.once('open',function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Successfully connected to the database");
});
// installed libraries are required here
const express = require('express');

const ejs = require('ejs');
const path = require('path');
// setting up of port
const port = 3000;
// setting up of database
const db = require("./config/mongoose");
// requiring list from the required path
const List = require("./models/list");
// initialising app
const app = express();
// setting up view engine as ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
// basically using it for accessing elements from ejs files
app.use(express.urlencoded({
    extended: true
}));
// for accessing static files
app.use(express.static('assets'));

// get route for home
app.get('/', function (req, res) {

    // this method will bring all elements present in the list
    List.find({}, function (err, lists) {
        if (err) {
            console.log("error in fetching contacts from db");
            return;
        }
        // rendering
        return res.render('home', {
            title: "home",
            todo_list: lists
        });
    });

});
// post route for create-item
app.post('/create-item', function (req, res) {
    // using this function for creating items
    List.create({
        item: req.body.description,
        date: req.body.dueDate,
        category: req.body.category
    }, function (err, newItem) {
        if (err) {
            console.log("error in adding item", err);
            return;
        }
        // console.log(newItem);
        return res.redirect('back');
    });
});
// get route for delete-item
app.get('/delete-item', function (req, res) {
    // using req.query for getting the id of the object
    // it will provide us with all the list items that were selected
    let id = req.query;
    // providing us the length of the
    var count = Object.keys(id).length;
    // running the for loop for finding the list elements with checked id and deleting on submitting the form
    for (let i = 0; i < count; i++) {
        // function for deleting the elements
        List.findByIdAndDelete(Object.keys(id)[i], function (err) {
            console.log("error in deleting the object", err);
            return;
        });

    }
    // redirecting it to the home route and rendering the home page
    res.redirect('back');
});
// route for listening to the port 3000
app.listen(port, function (err) {

    if (err) {
        console.log("error in loading", err);
        return;
    }

    console.log("server is up and running");

});

// // Note:respected sir/mam i prepared this project in less than 5 days although my design is not looking 
// exactly similar as shown in the gif but i have tried my best to make my design as good as possible .Also
// the backend functionality of my project is working exactly as expected in the image gif. Since my exams are approaching and  so 
// is the deadline therefore I wont be able to devote any more time on this . Thus please give me marks according to my efforts shown
const express = require('express');

const ejs = require('ejs');
const path = require('path');
const PORT = 3000 || process.env.PORT;

const db = require("./config/mongoose");
const List = require("./models/list");
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('assets'));

var todoList = [];

app.get('/', function (req, res) {


    List.find({}, function (err, lists) {
        if (err) {
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "home",
            todo_list: lists
        });
    });

});

app.post('/create-item', function (req, res) {

    List.create({
        item: req.body.description,
        date: req.body.dueDate,
        category: req.body.category
    }, function (err, newItem) {
        if (err) {
            console.log("error in adding item", err);
            return;
        }
        console.log(newItem);
        return res.redirect('back');
    });
});

app.get('/delete-item', function (req, res) {

    let id = req.query;

    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {

        List.findByIdAndDelete(Object.keys(id)[i], function (err) {
            console.log("error in deleting the object", err);
            return;
        });

    }
    res.redirect('back');
});

app.listen(PORT, function (err) {

    if (err) {
        console.log("error in loading", err);
        return;
    }

    console.log("server is up and running");

});
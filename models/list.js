const mongoose = require('mongoose');


const ListSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

});

const List = mongoose.model('List', ListSchema);

module.exports = List;
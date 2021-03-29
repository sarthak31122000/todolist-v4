// requiring mongoose
const mongoose = require('mongoose');
// declaring listschema for designing our list item

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
// exporting list to outer modules using exports

const List = mongoose.model('List', ListSchema);

module.exports = List;
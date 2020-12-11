const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE NEW DICTIONARY SCHEMA
const Dictionary = new Schema({
    // WORD THAT HAS TO BE STORED, REQUIRED WHILE CREATION OF DOCUMENT AND IS ALSO UNIQUE
    word: {
        type: String,
        required: true,
        unique: true
    },

    // WORD INFORMATION THAT CONTAINS THE ENTRIES
    information: {
        type: [Object],
    }
});

module.exports = mongoose.model("Dictionary", Dictionary);
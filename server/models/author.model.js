const mongoose = require("mongoose")

// DEFINE SCHEMA
const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [ true, 'ADD A NAME?']
    },
    read:{
        type:Boolean,
        required:[true, "have you read this  or nah"]
    },
    releaseDate:{
        type: Date,
        required:true
    }
}, {timestamps:true});

// REGISTER SHCEMA
const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
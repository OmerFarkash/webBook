const mongoose = require('mongoose');

/* the schema for the post model in the database
   working partly */
const Schema = mongoose.Schema;
const Post = new Schema({
    // works - come fromm current user
    name: {
        type: String,
        required: true
    },
    // need to make a transform method for the pictures - come from current user
    profilePic: { // This is a reference to the profilePic of the user who posted the post - it is not a string but a json object.
        type: String,
        required: true
    },
    // works
    date : {
        type: Date,
        default: Date.now
    },
    // works
    desc: {
        type: String,
    },
    // need to make a transform method for the pictures
    postPic: {
        type: String
    }
});

module.exports = mongoose.model('post', Post); // This is the model that will be used to interact with the database.
const mongoose = require('mongoose');


/* the schema for the user model in the database
   this is working good for part of it - not all tested*/
const Schema = mongoose.Schema;
const User = new Schema({
    // works
    name: {
        type: String,
        required: true
    },
    // works
    username: {
        type: String,
        required: true
    },
    // works
    password: {
        type: String,
        required: true
    },
    // works
    profilePic: {
        type: String,
        nullable: true,
    },
    // works
    androidToken: {
        type: String,
    },
    // not tested
    friends: {
        type: [String],
        default: []
    },
    // not tested
    friendRequests: {
        type: [String],
        default: []
    },
    // not tested
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('user', User); // This is the model that will be used to interact with the database.
const mongoose = require('mongoose');


/* the schema for the user model in the database
   this is working good for part of it - not all tested*/

// we don't save password in the database
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
    // works
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    // not tested
    likedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('user', User); // This is the model that will be used to interact with the database.
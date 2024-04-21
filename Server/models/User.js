const mongoose = require('mongoose');


/* the schema for the user model in the database */

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
    // works
    friends: {
        type: [String],
        default: []
    },
    // works
    friendRequests: {
        type: [String],
        default: []
    },
    friendRequestsSent: {
        type: [String],
        default: []
    },
    // works
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    // works
    likedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('user', User); // This is the model that will be used to interact with the database.
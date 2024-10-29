const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Plese add user name"]
    },
    email: {
        type: String,
        required: [true, "Plese add user name"],
        unique: [true, "Email addresss already taken"]
    },
    password: {
        type: String,
        required: [true, "Plese add user password"]
    },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;
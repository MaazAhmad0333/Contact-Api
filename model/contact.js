const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }

}, {timestamps: true});

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
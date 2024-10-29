const mongoose = require("mongoose");


async function connectMongoDb(){
    return mongoose.connect("mongodb://127.0.0.1:27017/first-project").then(() => console.log("Mongodb Connected"));
}

// .catch((err) => console.log("Mongodb Error", err))

module.exports = {
    connectMongoDb,
};

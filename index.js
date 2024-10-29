const express = require("express");

require('dotenv').config();

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Complex method
const dbArgIndex = process.argv.indexOf("--db");
global.dbType = dbArgIndex > -1 ? process.argv[dbArgIndex + 1] : 'mongodb';

if (dbType === "mysql") {
    const {db} = require("./mysqldb");
    console.log("Mysql Connected");
} else {
    const {connectMongoDb} = require("./connection");
    connectMongoDb();

}

app.use("/api/contacts",require("./routes/contact"));
app.use("/api/users", require("./routes/user"));


app.listen(8001, () => console.log("Server Started"));
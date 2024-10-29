const express = require("express");
const router = express.Router();
const { handleGetAllUsers, handleRegisterUser, handleUpdateUserById, handleDeleteUserById, handleCurrentUser, handleUserLogin} = require("../controller/user");
const authenticateToken = require("../middlewares/authMiddleware");

//Contacts Routes 
router.get("/:page?", handleGetAllUsers); //get all users

router.post("/", handleRegisterUser); // create new users

router.post("/login", handleUserLogin); // Login user

router.patch("/:id", handleUpdateUserById); // update users 
 
router.delete("/:id", handleDeleteUserById); // delete users

router.get("/current", authenticateToken ,handleCurrentUser); // Current user

module.exports = router;
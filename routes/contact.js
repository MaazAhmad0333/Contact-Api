const express = require("express");
const router = express.Router();
const {getDbProvider} = require("../contactProvider/dbProvider");
const {handleGetAllContacts, handleUpdateContactById, handleDeleteContactById, handleCreateContact} = require("../controller/contact");
const authenticateToken = require("../middlewares/authMiddleware");

//Contacts Routes 
router.use(authenticateToken);

router.get("/", handleGetAllContacts); //get all contacts

router.post("/", handleCreateContact); // create new contact

router.patch("/:id", handleUpdateContactById); // update contact 
 
router.delete("/:id", handleDeleteContactById); // delete contact


module.exports = router;
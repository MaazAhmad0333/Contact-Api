const Contact = require("../model/contact");
const dbquery = require("../contactProvider/dbProvider");

// Get all Contact
async function handleGetAllContacts(req, res) {
  try {
    const contacts = await dbquery.getAllContacts(req.user.id, dbType);
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving contacts", error });
  }
}

async function handleGetContactById(req, res) {
  try {
    const contact = await dbquery.getContactById(req.params.id, dbType);
    return res.json(contact);
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving contact", error });
  }
}

async function handleUpdateContactById(req, res) {
  try {
    const updatedContact = await dbquery.updateContactById(
      req.params.id,
      req.user.id,
      req.body,
      dbType
    );
    if (!updatedContact) {
      return res.json({
        msg: "Contact not found or you don't have permission",
      });
    }
    return res.json(updatedContact);
  } catch (error) {
    return res.status(500).json({ msg: "Error updating contact", error });
  }
}

async function handleDeleteContactById(req, res) {
  try {
    const success = await dbquery.deleteContactById(
      req.params.id,
      req.user.id,
      dbType
    );
    if (!success) {
      return res.json({
        msg: "Contact not found or you don't have permission",
      });
    }
    return res.json({ Success: "Contact Removed Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Error deleting contact", error });
  }
}

async function handleCreateContact(req, res) {
  try {
    const id = await dbquery.createContact(req.body, req.user.id, dbType);
    return res.json({ msg: "Contact Created Successfully", id });
  } catch (error) {
    return res.status(500).json({ msg: "Error creating contact", error });
  }
}

module.exports = {
  handleGetAllContacts,
  handleGetContactById,
  handleUpdateContactById,
  handleDeleteContactById,
  handleCreateContact,
};

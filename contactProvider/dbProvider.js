const Contact = require("../model/contact");
const { db } = require("../mysqldb");

async function getAllContacts(userId, dbType) {
  if (global.dbType === "mysql") {
    // MySQL: Get all contacts
    const [rows] = await db.query("SELECT * FROM contacts WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  } else {
    // MongoDB: Get all contacts
    return await Contact.find({ user_id: userId });
  }
}

async function getContactById(id, dbType) {
  if (global.dbType === "mysql") {
    // MySQL: Get contact by id
    const [rows] = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);
    return rows[0];
  } else {
    // MongoDB: Get contact by id
    return await Contact.findById(id);
  }
}

async function updateContactById(id, userId, body, dbType) {
  if (global.dbType === "mysql") {
    // MySQL: Update contact by id
    const [result] = await db.query(
      "UPDATE contacts SET ? WHERE id = ? AND user_id = ?",
      [body, id, userId]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    const [updatedContact] = await db.query(
      "SELECT * FROM contacts WHERE id = ?",
      [id]
    );
    return updatedContact[0];
  } else {
    // MongoDB: Update contact by id
    const contact = await Contact.findById(id);
    if (!contact || contact.user_id.toString() !== userId) {
      return null;
    }
    return await Contact.findByIdAndUpdate(id, body, { new: true });
  }
}

async function deleteContactById(id, userId, dbType) {
  if (global.dbType === "mysql") {
    // MySQL: Delete contact by id
    const [result] = await db.query(
      "DELETE FROM contacts WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result.affectedRows > 0;
  } else {
    // MongoDB: Delete contact by id
    const contact = await Contact.findById(id);
    if (!contact || contact.user_id.toString() !== userId) {
      return false;
    }
    await Contact.deleteOne({ _id: id });
    return true;
  }
}

async function createContact(body, userId, dbType) {
  if (global.dbType === "mysql") {
    // MySQL: Create new contact
    const { name, email, phone } = body;
    const [result] = await db.query(
      "INSERT INTO contacts (name, email, phone, user_id) VALUES (?, ?, ?, ?)",
      [name, email, phone, userId]
    );
    return result.insertId;
  } else {
    // MongoDB: Create new contact
    const { name, email, phone } = body;
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: userId,
    });
    return contact.id;
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  createContact,
};

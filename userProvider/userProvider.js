const User = require("../model/user");
const {db} = require("../mysqldb");

async function getAllUsers(dbType, page ) {
    
    if (dbType === 'mysql') {
        // MySQL: Get all users
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } else {
            // Pagination Part
            let newpage = parseInt(page) || 1 ;
            const limit = 2;
            const totalUsers = await User.countDocuments();
            const totalPage = Math.ceil(totalUsers/limit);
            const nextPage = newpage < totalPage ? newpage + 1 : null;
    // end
        // MongoDB: Get all users
        return await User.find({}).skip((page - 1) * limit).limit(limit);
    }
}


async function getUserById(id, dbType) {
    if (dbType === 'mysql') {
        // MySQL: Get user by id
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } else {
        // MongoDB: Get user by id
        return await User.findById(id);
    }
}


async function updateUserById(id, body, dbType) {
    if (dbType === 'mysql') {
        // MySQL: Update user by id
        const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [body, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        const [updatedUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return updatedUser[0];
    } else {
        // MongoDB: Update user by id
        const user = await User.findById(id);
        if (!user) {
            return null;
        }
        return await User.findByIdAndUpdate(id, body, { new: true });
    }
}


async function deleteUserById(id, dbType) {
    if (dbType === 'mysql') {
        // MySQL: Delete user by id
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } else {
        // MongoDB: Delete user by id
        const user = await User.findById(id);
        if (!user) {
            return false;
        }
        await User.deleteOne({ _id: id });
        return true;
    }
}


async function userLogin(email, dbType){
    if(dbType === 'mysql'){
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }else{
        return await User.findOne({ email });
    }
}

async function createUser(userdata, dbType){
    if(global.dbType === 'mysql'){
        const [result] = await db.query('INSERT INTO users SET ?', [userdata]);
        return result.insertId;
    }else{
        const user = await User.create(userdata);
        return user.id;
    }
}


module.exports = {getAllUsers, getUserById, updateUserById, deleteUserById, userLogin, createUser};
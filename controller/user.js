const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userquery = require('../userProvider/userProvider');
const dbType = global.dbType;

// Get all User
async function handleGetAllUsers(req, res){
    
    const allDbUsers = await userquery.getAllUsers(dbType, req.params.page);
    // return res.json(allDbUsers);
    return res.json({
        allDbUsers: allDbUsers,
        
    });
};

// Get Current User
async function handleCurrentUser(req, res){
    res.json(req.user);
}


// Get User by id
async function handleGetUserById(req , res){
    const user = await userquery.getUserById(req.params.id, dbType);
    return res.json(user);
};


// Update User by id
async function handleUpdateUserById(req, res){
    const updateUser = await userquery.updateUserById(req.params.id, req.body, dbType);
    res.json(updateUser);
}

// Delete User by id
async function handleDeleteUserById(req, res){
    // await User.findByIdAndDelete(req.params.id);
    await userquery.deleteUserById(req.params.id, dbType);
    res.json({msg: "Record Deleted"});
}

// Login user
async function handleUserLogin(req, res){
    // console.log(req.body);
    const {email, password} = req.body;


    if(!email || !password){
        res.status(400).json({msg: "All fields are required"});
    }

    const user = await userquery.userLogin(email, dbType);

    if(!user){
        res.json({msg: "No user found with this email"});
    }

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET, // 'shhh'
            {expiresIn: '2h'}
        );

        res.json({accessToken});
    }
    }


// Create/Register new User
async function handleRegisterUser(req, res){
    // console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({msg: "All fields are required"});
    }

    
    const existingUser = await userquery.userLogin(email, dbType);
    if(existingUser){
        res.json({msg: "User already exists with this email"});
    }

    const encryPassword = await bcrypt.hash(password, 10);

    // const result = await User.create({
    const result = await userquery.createUser({
        username,
        email,
        password: encryPassword,
    }, dbType);

    // console.log("Result", result);
    return res.json({msg: "User Created Successfully", id: result.id});

}

module.exports = {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleRegisterUser, handleCurrentUser, handleUserLogin, handleDeleteUserById};

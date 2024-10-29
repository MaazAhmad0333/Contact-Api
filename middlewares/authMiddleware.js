const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        res.status(401).json({msg: "Access Token Required"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.json({msg: "Invalid or expired token"});
        }
        

        if(!decodedToken || !decodedToken.id){
            return res.json({msg: "Invalid token payload"});
        }
        

        req.user = decodedToken;
        next();
    })
}


module.exports = authenticateToken;
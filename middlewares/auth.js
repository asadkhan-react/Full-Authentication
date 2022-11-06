const jwt = require('jsonwebtoken');
const auth = async(req , res , next) => {
    try {

        const reqheader = req.header('Authorization');

        if(!reqheader)return res.status(400).json({msg : "invalid Authorization"});

        jwt.verify(reqheader , process.env.ACCESS_TOKEN_SECRET , (err , success) => {
            if(err) return res.status(400).json({msg : "invalid Authorization"});

                req.success = success;
            next();        
        })
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth
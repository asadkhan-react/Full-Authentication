const Users = require('../models/userModel') ;
const Founders = require('../models/founderModel');

const authAdmin = async(req , res , next) => {
    try {
        var user = ''
        user = await Users.findById(req.success.id)

        if(!user){
            user = await Founders.findById(req.success.id)
        }
        if(user.role !== 1)
            return res.status(500).json("Admin Resources Access Denied");

        req.userInfo = user
        next();
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = authAdmin
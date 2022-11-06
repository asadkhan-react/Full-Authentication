const fs = require('fs');
const cloudinary = require('cloudinary');
const upload = require('../middlewares/uploadImage')
const multer = require('multer')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME ,
    api_key : process.env.CLOUD_API ,
    api_secret : process.env.CLOUD_SECRET
})

const uploadCtrl = {
    uploadAvatar : async (req , res) => {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            res.json(result.secure_url);
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    uploadVideo : async (req , res) => {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path , {resource_type : "video"});
            res.json(result.secure_url);
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    uploadDocs : async (req , res) => {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            res.json(result.secure_url);
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}
  
module.exports = uploadCtrl
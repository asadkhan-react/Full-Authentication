const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , " Please Fill Your Name"]
    } ,
    email : {
        type : String , 
        required : [true , "Please fill your Email"]
    } ,
    password : {
        type : String , 
        required : [true , "Please Enter the password"]
    } , 
    role : {
        type : Number ,
        default : 0
    } , 
    avatar : {
        type : String ,
        default : "https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=20&m=535695503&s=612x612&w=0&h=S16wHXc-b3AkL7YMrcFkR2pDGFJA1bRsPmAfQlfrwkc="
    } , 
    intro_video : {
        type : String ,
        default : "https://res.cloudinary.com/dnnkrcd0s/video/upload/v1665128796/z1xbamz6a871sl43fdtz.mp4"
    } , 
    official_doc : {
        type : String , 
        default : "https://res.cloudinary.com/dnnkrcd0s/image/upload/v1665136279/hnso262zqolf7lf9unlj.pdf"
    } ,
    profile_type : {
        type : String ,
        default : "Please fill this field"
    } ,
    company_name : {
        type : String ,
        default : "Please fill this field"
    } ,
    dba : {
        type : String ,
        default : "Please fill this field"
    } ,
    founder_website : {
        type : String ,
        default : "Please fill this field"
    } ,
    tagline : {
        type : String ,
        default : "Please fill this field"
    } ,
    sector : {
        type : String ,
        default : "Please fill this field"
    } , 
    specializtation : {
        type : String ,
        default : "Please fill this field"
    } ,
    revenue_stream : {
        type : String ,
        default : "Please fill this field"
    } ,
    founder_business_model : {
        type : String ,
        default : "Please fill this field"
    } ,
    founder_location : {
        type : String ,
        default : "Please fill this field"
    } ,
    contact_person : {
        type : String ,
        default : "Please fill this field"
    } ,
    contact_email : {
        type : String ,
        default : "Please fill this field"
    } ,
    company_linkedin : {
        type : String ,
        default : "Please fill this field"
    } ,
    problem : {
        type : String ,
        default : "Please fill this field"
    } ,
    solution : {
        type : String ,
        default : "Please fill this field"
    } ,
    sales_channel : {
        type : String ,
        default : "Please fill this field"
    } ,
    user_check : {
        type : Number ,
        default : 0
    } ,
    approved : {
        type: Boolean ,
        default : false
    } ,
    bio : {
        type : String ,
        default : "Please fill this field"
    }
})

module.exports = mongoose.model("Founders" , founderSchema);

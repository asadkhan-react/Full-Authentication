const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Please enter your name"] , 
        trim: true,
    } , 
    email : {
        type : String , 
        required : [true , "Please enter your Email Address"] ,
        trim : true , 
        unique : true,
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
    profile_type : {
        type : String 
    } , 
    expertise : {
        type : String ,
        default : "Please fill this field" 
    } , 
    location : {
        type : String ,
        default : "Please fill this field"
    } ,
    accredited_investor : {
        type : String ,
        default : "Please fill this field"
    } ,
    website_url : {
        type : String ,
        default : "Please fill this field"
    } ,
    linkedin : {
        type : String ,
        default : "Please fill this field"
    } ,
    currency : {
        type : String ,
        default : "Please fill this field"
    } ,
    min_investment : {
        type : Number ,
        default : "Please fill this field"
    } ,
    max_invesment : {
        type : Number ,
        default : "Please fill this field"
    } , 
    sectors : {
        type : String ,
        default : "Please fill this field"
    } ,
    business_model : {
        type : String ,
        default : "Please fill this field"
    } ,
    most_interested : {
        type : String ,
        default : "Please fill this field"
    } , 
    not_interested : {
        type : String ,
        default : "Please fill this field"
    } ,
    target_location : {
        type : String ,
        default : "Please fill this field"
    } , 
    user_check : {
        type : Number ,
        default : 1
    } ,
    approved : {
        type: Boolean ,
        default : false
    } ,
    bio : {
        type : String ,
        default : "Please fill this field"
    }
} , {
    timestamps : true ,
})

module.exports = mongoose.model("Users" , userSchema)
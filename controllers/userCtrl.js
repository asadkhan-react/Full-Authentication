const Users = require('../models/userModel') ;
const Founders = require('../models/founderModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
    return password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    )
}

const createUserActivationToken = (payload) => {
    return jwt.sign(payload , process.env.ACTIVATION_TOKEN_SECRET , {expiresIn : '5m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload , process.env.REFRESH_TOKEN_SECRET , {expiresIn : '15m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : "7d"})
}

const {CLIENT_URL} = process.env

const userCtrl = {

    register : async (req , res) => {
        try {
            const {name , email, password , profile_type} = req.body

            if(!name , !email , !password , !profile_type)
                return res.status(400).json({msg : "Please Fill All Fields"}) ;
            if(profile_type !== "founder" && profile_type !== "investor" )
                return res.status(400).json({msg : "invalid type"})
            if(profile_type === "investor"){
                const check = await Users.findOne({email})
                if(check) {
                    return res.status(400).json({msg : `email already exist`})
                }
            }
            if(profile_type === "founder"){
                const check = await Founders.findOne({email})
                if(check) {
                    return res.status(400).json({msg : `email already exist`})
                }
            }

            if(password.length < 6)
                return res.status(400).json({msg : "Password should greater than 8 characters"}) ;

            if(!validatePassword(password))
                return res.status(400).json({msg : "Password format should according to the instructions"})

            if(!validateEmail(email))
                return res.status(400).json({msg : "Please Enter Valid Email Address"});

            const passwordHash = await bcrypt.hash(password , 12)
            const newUser = {name , email ,  profile_type , password : passwordHash}
            // console.log(newUser)
            const user_Activation_Token = createUserActivationToken(newUser) ;
            console.log({user_Activation_Token})

            const url = `${CLIENT_URL}/activate/${user_Activation_Token}`

            const html = `            
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Asad channel.</h2>
                <p>Congratulations! You're almost set to start using Asad.
                    Just click the button below to validate your email address.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;"> Please Verify Your Email </a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>
                    <a href=${url}>Click Here</a>
                </div>
                </div>
            `            

            sendMail(email , html)

            res.json({msg : "Please Verify Your Email"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,

    activateUser : async (req , res) => {
        try {
            const {activate_User} = req.body;

            const verifyToken = jwt.verify(activate_User , process.env.ACTIVATION_TOKEN_SECRET);

            const {name , email , password , profile_type } = verifyToken
            
            // Check if the email is exist in Investor or Founder Database
            if(profile_type === "investor"){
                const check = await Users.findOne({email})
                if(check) {
                    return res.status(400).json({msg : `email already exist`})
                }
            }

            if(profile_type === "founder"){
                const check = await Founders.findOne({email})
                if(check) {
                    return res.status(400).json({msg : `Hello ${name}! your email (${email}) already exists`})
                }
            }

            // Save Data in Investor or Founder Database if condition matches
            if(profile_type === "investor"){
                const newuser = new Users({
                    name , email , password , profile_type
                })
                await newuser.save()
                console.log("Data Has been saved in Investor")
            }

            if(profile_type === "founder"){
                const newuser = new Founders({
                    name , email , password , profile_type
                })
                await newuser.save()
                console.log("Data Has been saved in Founder")
            }

            res.json({msg : `Congratulations ${name}! Your ${profile_type} Account has been Activated`});

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,

    login : async (req , res) => {
        try {
            const {email , password , profile_type} = req.body ;

            var user = "" ;

            if(profile_type === "investor"){
                user = await Users.findOne({email}) ;
            }
            if(profile_type === "founder"){
                user = await Founders.findOne({email}) ;
            }

            if(!email , !password , !profile_type)return res.status(400).json({msg: "Please Fill All Fields"})

            if(!user) return res.status(400).json({msg: "email does not exist"})
            
            const match = await bcrypt.compare(password , user.password)
            if(!match) return res.status(400).json({msg: "Password is incorrect"})

            
            const refresh_token = createRefreshToken({id : user._id});
            console.log({refresh_token})

            res.cookie('refreshtoken' , refresh_token , {
                httpOnly : true,
                path : '/user/refresh_token',
                maxAge : 7*24*60*60*1000
            })

            res.json({msg : "Login Success"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    meetingEmail : async (req , res) => {
        try {

            const {email , date , time , country , userName} = req.body
            console.log(email)
            console.log(date)
            console.log(time)
            console.log(country)
            console.log(userName)

            const html = `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Assistance Email.</h2>
                <p>Hi , ${userName}'s timezone is "${country}".He wants meeting at "${date} ${time}" according to "UTC Time". please let the user know if anyone available to assit him.</p>
            </div>
            `            
            sendMail(email , html)

            res.json("Your meeting request has been successfuly send")

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAccessToken : async(req , res) => {
        try {

            const get_cookie = req.cookies.refreshtoken;

            if(!get_cookie) return res.status(400).json("Please login now") ;

            jwt.verify(get_cookie , process.env.REFRESH_TOKEN_SECRET , (err , success) => {
                if(err) return res.status(400).json("Please Login Now");

                const access_token = createAccessToken({id : success.id})
                console.log({access_token})
                res.json({access_token})                
            })

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    forgotPassword : async (req , res) => {
        try {
            const {email , profile_type} = req.body;

            var user = ''
            
            if(profile_type === "investor"){
                user = await Users.findOne({email});
            }
            if(profile_type === "founder"){
                user = await Founders.findOne({email});
            }

            if(!user)return res.status(400).json({msg : "User Doesn't Exist"}) ;
            
            const access_token = createAccessToken({id : user._id})
            console.log(access_token)

            const url = `${CLIENT_URL}/reset/${access_token}`;

            const html = `            
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Asad channel.</h2>
                <p>Congratulations! You're almost set to start using Asad.
                    Just click the button below to validate your email address.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Please Reset Your Email</a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>
                    <a href=${url}>Click Here</a>
                </div>
                </div>
            `

            sendMail(email , html)

            res.json({msg : "Please Verify Your Email"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    resetPassword : async (req , res) => {
        try {
            const {password , profile_type} = req.body;
            const passwordHash = await bcrypt.hash(password , 12);
            console.log(req.success)

            if(profile_type === "investor"){
                await Users.findOneAndUpdate({_id : req.success.id} , {password : passwordHash})
            }
            if(profile_type === "founder"){
                await Founders.findOneAndUpdate({_id : req.success.id} , {password : passwordHash})
            }

            res.json({msg : "Password Updated Successfully"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getUserInfo : async(req , res) => {
        try {
        
            console.log(req.success)

            var user =''
            user = await Users.findById(req.success.id).select('-password')

            if(!user){
                user = await Founders.findById(req.success.id).select('-password')
            }
            res.json(user)
           
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAllUserIfo : async (req , res) => {
        try {
            const users = await Users.find()
            res.json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAllUserInfoTwo : async (req , res) => {
        try {
            const users = await Founders.find()
            res.json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAllUserIfoforAll : async (req , res) => {
        try {
            const users = await Users.find()
            res.json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAllUserInfoTwoforAll : async (req , res) => {
        try {
            const users = await Founders.find()
            res.json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    getAllUsersforVisitor : async (req , res) => {
        try {
            
            // console.log(req.usersforVisitors)
            var user = ''
            var users = ''

            // req.success is coming from auth and on this basis I fetched the logged user detail then I created a condition
            user = await Users.findById(req.success.id)
            if(!user){
                user = await Founders.findById(req.success.id)
            }

            if(user.profile_type === "investor"){
                users = await Founders.find({role : 0})
            }
            if(user.profile_type === "founder"){
                users = await Users.find({role : 0})
            }

            res.json(users)
        } catch (error) {
            return res.status(500).json({msg : error})
        }   
    } ,
    logout : async (req , res) => {
        try {
            res.clearCookie('refreshtoken' , {path : '/user/refresh_token'})
            res.json("logout")
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    updateinfo : async(req , res) => {
        try {
            const {name , avatar , intro_video , official_doc , profile_type} = req.body;
            
            if(profile_type === "investor"){
                await Users.findOneAndUpdate({_id : req.success.id} , {
                    name , avatar , intro_video , official_doc
                })
            }
            if(profile_type === "founder"){
                await Founders.findOneAndUpdate({_id : req.success.id} , {
                    name , avatar , intro_video , official_doc
                })
            }

            res.json({msg : "Update Successful"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    updateProfile : async (req , res) => {
        try {

            const {
                expertise , 
                location ,
                accredited_investor ,
                website_url ,
                linkedin ,
                currency ,
                min_investment ,
                max_invesment ,
                sectors ,
                business_model ,
                most_interested ,
                not_interested ,
                target_location ,
                // Starting Founder Fields
                company_name,
                dba ,
                founder_website ,
                tagline ,
                sector ,
                specializtation ,
                revenue_stream ,
                founder_business_model ,
                founder_location ,
                contact_person ,
                contact_email ,
                company_linkedin ,
                problem ,
                solution ,
                sales_channel ,
                // Common Fields in investors and founders
                bio
                
            } = req.body
        
        var user = ''
        user = await Users.findById(req.success.id)
        if(!user){
            user = await Founders.findById(req.success.id)
        }

        if(user.profile_type === "investor"){
            await Users.findOneAndUpdate({_id : req.success.id} , {
                bio , expertise , location , accredited_investor , website_url , linkedin , currency , min_investment , max_invesment , sectors , business_model , most_interested , not_interested , target_location
            })
        }
        if(user.profile_type === "founder"){
            await Founders.findOneAndUpdate({_id : req.success.id} , { 
                bio , company_name, dba , founder_website , tagline , sector , specializtation , revenue_stream , founder_business_model , founder_location , contact_person , contact_email , company_linkedin , problem , solution , sales_channel
            })
        }

        res.json("User Profile Updated")

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    updateUserRole : async (req , res) => {
        try {
            const {role , approved} = req.body;

            var user = ''
            user = await Users.findById(req.params.id)
            if(!user){
                user = await Founders.findById(req.params.id)
            }
            console.log(user.name)

            if(user.profile_type === "investor"){
                await Users.findByIdAndUpdate({_id : req.params.id} , {
                    role , approved
                })
            }
            if(user.profile_type === "founder"){
                await Founders.findByIdAndUpdate({_id : req.params.id} , {
                    role , approved
                })
            }
            res.json({msg : "Settings Changed"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } ,
    deleteUser : async(req , res) => {
        try {
            var user = ''
            user = await Users.findById(req.params.id)
            if(!user){
                user = await Founders.findById(req.params.id)
            }
            console.log(user.name)

            if(user.profile_type === "investor"){
                await Users.deleteOne({_id : req.params.id})
                res.json(`User Deleted from ${user.profile_type}`);
            }

            if(user.profile_type === "founder"){
                await Founders.deleteOne({_id : req.params.id})
                res.json(`User Deleted from ${user.profile_type}`)
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    } 

} 

module.exports = userCtrl

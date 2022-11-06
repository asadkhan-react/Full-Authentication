require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer')

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
// app.use(fileupload({useTempFiles: true}));

app.use(cookieParser());


// connect with MongoDB
const URI = process.env.MONGODB_URL
// const URI = "mongodb://localhost:27017/authentication"
mongoose.connect(URI).then(console.log("connected with mongodb"))

// Routes
app.use("/user" , require('./routes/userRoutes'));
app.use("/api" , require("./routes/upload"));


// production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*' , (req , res) => {
        res.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'))
    })
}

// App Listening
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , () => {
    console.log("Server Started")
})
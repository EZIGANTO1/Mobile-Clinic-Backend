const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary').v2
const cookieParser = require('cookie-parser')
const cors = require('cors')


dotenv.config();


const app = express();


const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO], 
    credentials: true,          
}));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, 
}));


//routes
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)
app.use('/api/appointment', appointmentRoutes)


app.get('/', (req, res) => {
    res.send('Welcome to Meditech Mobile Clinic')
});

mongoose
mongoose
  .connect(process.env.mongodb_url)
  .then(() => console.log('Database Connected'))
  .catch((error) => console.error('Database not Connected:', error));

  module.exports = app;
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
// importing Routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

// Routes
const app=express();

// to serve images for public
app.use(express.static('public'));
app.use('/images', express.static('images'))

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
dotenv.config();
app.use(cors()); 

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>app.listen(process.env.PORT, ()=>console.log("Listening"))).catch((error)=>console.log(error));

// usage of routes
app.use('/auth', AuthRoute);
// When we use the path /auth in our broser. it will take us to the AuthRoute file in our Routes folder.
app.use('/user', UserRoute);

app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

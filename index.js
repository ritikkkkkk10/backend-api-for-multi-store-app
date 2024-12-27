//import the express module
const express = require('express');

const mongoose = require("mongoose");
const dotenv = require('dotenv'); // Import dotenv to load environment variables

const authRouter = require('./routes/auth');

const helloRoute = require('./routes/hello');

const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subcategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');

// Load environment variables from .env file
dotenv.config();

// Define port and database from environment variables
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

//create an instance of an express application
//because it give us the starting point

const app = express();
//mongodb String
//c

//middleware - to register routes or to mount routes
app.use(helloRoute);
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(productRouter);


mongoose.connect(DB).then(()=>{
    console.log('mongodb connected');
});

//start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function() {
    //LOG THE NUMBER
    console.log(`server is running on port ${PORT}`);
} )
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');

dotenv.config();

//connect db
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,useNewUrlParser: true },
    () => console.log('connected to db!')
);

//middleware
app.use(express.json());


//route middleware
app.use('/api/user', authRoute);


app.listen(3000, () => console.log(`server up and running at http://localhost:3000`));

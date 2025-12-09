//runs every thing in the server
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

//middleware to parse JSON request bodies
app.use(express.json());
app.use (cors({
  origin: 'http://localhost:5177', // Adjust this to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  Credentials: true 

}));



app.listen(5000, () => {
    console.log('Server is running on port which is  5000');
})


//connect to database
connectDB();


//import student routes
app.use("/students", require('./routes/studentRoutes'));


//Default route (home_page)
app.get('/', (req, res) => {
  res.send('API Server for Express Js is up and running ');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
;







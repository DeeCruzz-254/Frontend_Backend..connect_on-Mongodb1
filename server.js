//runs every thing in the server
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

//middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files from public folder
app.use(express.static('frontend')); // Serve frontend folder
app.use(cors());



//import student routes
app.use("/students", require('./routes/studentRoutes'));


//Default route (home_page) — serve frontend index
app.get('/', (req, res) => {
  res.sendFile(path.resolve('frontend', 'index.html'), (err) => {
    if (err) {
      console.error('Failed to send index.html:', err);
      res.status(500).send('API Server is up but failed to serve frontend');
    }
  });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

console.log('Working directory:', process.cwd());
console.log('Resolved frontend path:', path.resolve('frontend'));

startServer();







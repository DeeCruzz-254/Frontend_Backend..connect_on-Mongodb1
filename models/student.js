const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,reqired: true
  },
  age: {
    type: Number,required: true
  },
  email: {
    type: String,required: true, unique: true
  }
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);

module.exports = mongoose.model('Student', studentSchema);
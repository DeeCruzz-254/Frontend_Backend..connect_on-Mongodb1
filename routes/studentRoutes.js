const express = require('express');
const router = express.Router();
const Student = require('../models/student');

//get all students
router.get('/', async (_req, res) => {
  try {
    const students = await Student.find();
    //RESPONSE FROM SERVER
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//create student
router.post('/', async (req, res) => {
    const { name, age, email } = req.body;
    try {
        const student = new Student({ name, age, email });
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // Add a check in case the ID is valid but not found
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        // 400 is appropriate if the update fails due to invalid data format
        res.status(400).json({ message: error.message });
    }
});

//delete student
//delete student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        // 500 is correct for a server/database error during deletion
        res.status(500).json({ message: error.message });
    }
});

        module.exports = router;
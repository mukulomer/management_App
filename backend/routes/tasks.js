const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

//router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    console.log(req.body)
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ data : tasks , message : 'Data fetched successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, deadline, status }, { new: true });
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

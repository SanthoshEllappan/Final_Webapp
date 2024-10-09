// routes/courses.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

// Define the routes for Courses
router.post('/', courseController.createCourse);
router.get('/all', courseController.getAllCourses);
router.get('/', courseController.getCourseById);
router.put('/up', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/:userId', courseController.getCourseByIdadmin);
module.exports = router;

// models/Course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  platform: { type: String, required: true },
  specialization: { type: String },
  totalCourses: { type: Number, required: true, min: 0 },
  courseDuration: { type: Number, required: true, min: 0 },
  courseType: { type: String, required: true },
  completionStatus: { type: String, required: true },
  additionalCourses: { type: String },
  verify: { type: Boolean, default: false },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, 
 {
timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;

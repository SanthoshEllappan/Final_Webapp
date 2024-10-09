// controllers/courseController.js
const jwt = require('jsonwebtoken');
const Course = require('../models/course');

// Create a new Course
exports.createCourse = async (req, res) => {
  try {
    const {data,token} = req.body
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const newCourse = new Course(data);
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully!', newCourse });
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error });
  }
};

// Get all Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};



// Retrieve a soft skills entry by ID
exports.getCourseById = async (req, res) => {
  const {userId} = req.query
  const { id } = jwt.verify(userId, process.env.JWT_SECRET);
  
  try {
    const CourseEntry = await Course.findOne({userId:id});
    
    if (!CourseEntry) {
      return res.status(200).json({});
    }
    
    res.status(200).json(CourseEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};





exports.updateCourse = async (req, res) => {
  try {
    const {token} = req.body
  console.log(token)

  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    // const { token } = req.body; // Extract the token from the request body
    // Verify the token to get the user ID
    
    // Find the soft skills entry by userId (instead of the entry ID from params)
    let CourseEntry = await Course.findOne({ userId });

    if (CourseEntry) {
      // Update the existing soft skills entry
      const { data } = req.body; // Extract the data from the request body
 
      // Update soft skills with new data
      Object.keys(data).forEach((key) => {
          CourseEntry[key] = data[key];
      });

      // // Save the updated soft skills entry
      await CourseEntry.save();
      return res.status(200).json({ message: 'Soft skills entry updated successfully', CourseEntry });
    } else {
      // If no entry exists, create a new one
      const newCourse = new Course({ ...req.body.data, userId });
      await newCourse.save();
      return res.status(201).json({ message: 'Soft skills entry created successfully', Course: newCourse });
    }
    
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};

// Delete a Course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};


exports.getCourse = async (req, res) => {

  const {userId} = req.params
  try {
    console.log(userId)
    const Courses = await Course.findOne({userId:userId});
    console.log(Course);
    res.status(200).json(Courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Retrieve a soft skills entry by ID
exports.getCourseByIdadmin = async (req, res) => {
  const {userId} = req.params
  try {
    const CourseEntry = await Course.findOne({userId:userId});
    
    if (!CourseEntry) {
      return res.status(200).json({});
    }
    
    res.status(200).json(CourseEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};
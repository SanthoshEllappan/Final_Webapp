// controllers/employeeController.js
const Employee = require('../models/personaldetails'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
// Create a new employee entry
exports.createEmployee = async (req, res) => {
  try {
    const {data,token} = req.body
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error: error.message });
  }
};

// Retrieve all employee entries
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error: error.message });
  }
};


exports.getEmployeeById = async (req, res) => {
  try {
    console.log("Get Employee By ID Function Called");
    const {userId} = req.query
    const { id } = jwt.verify(userId, process.env.JWT_SECRET);
   
 // Verify the token to get the user ID
    console.log("User ID:",id);

    // Find the employee by userId
    const employee = await Employee.findOne({userId:id});
    console.log("Employee Found:", employee);

    if (!employee) {
      return res.status(200).json({});
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error Retrieving Employee:", error.message); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving employee', error: error.message });
  }
};

exports.getEmployeeByIdAdmin = async (req, res) => {
  try {
    console.log("Get Employee By ID Function Called");
    const {id} = req.query

 // Verify the token to get the user ID
    console.log("User ID:",id);

    // Find the employee by userId
    const employee = await Employee.findOne({userId:id});
    console.log("Employee Found:", employee);

    if (!employee) {
      return res.status(200).json({});
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error Retrieving Employee:", error.message); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving employee', error: error.message });
  }
};

 // Ensure you have the correct path to your Employee model

exports.updateEmployee = async (req, res) => {
  try {
    console.log("Update Employee Function Called");
    
    const { token } = req.body; // Extract the token from the request body
    console.log("Token Received:", token);
    
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token to get the user ID
    console.log("User ID:", userId);
    
    // Find the soft skills entry by userId
    let employee = await Employee.findOne({ userId });
    console.log("Employee Found:", employee);
    
    const requestData = req.body.data; // Extract the data from the request body
    console.log("Form Data Being Sent:", requestData);
    
    if (employee) {
      // Update the existing soft skills entry
      Object.keys(requestData).forEach((key) => {
        employee[key] = requestData[key];
      });

      // Save the updated soft skills entry
      await employee.save();
      return res.status(200).json({ message: 'Personal details entry updated successfully', employee });
    } else {
      console.log("Employee Found:", employee);
      // If no entry exists, create a new one
      const newEmployee = new Employee({ ...requestData, userId });
      
      await newEmployee.save();
      return res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    }
  } catch (error) {
    console.error("Error Updating Employee:", error.message); // Log the error for debugging
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};


// Delete an employee entry by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};

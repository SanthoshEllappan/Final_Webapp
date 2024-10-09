// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Invalid phone number'] },
  position: { type: String },
  employeeid:{type: String, required: true},
  startDate: { type: Date },
  dateOfBirth: { type: Date },
  gender: { type: String },
  address: { type: String },
  employmentStatus: { type: String },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
},
{timestamps: true // Automatically adds createdAt and updatedAt fields
  });

// Create the model
const Employee = mongoose.model('Employee', employeeSchema);

// Export the model
module.exports = Employee;


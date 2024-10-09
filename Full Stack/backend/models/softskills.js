const mongoose = require('mongoose');

// Define the SoftSkills schema
const softSkillsSchema = new mongoose.Schema({
  communication: {
    type: Number, // Assuming proficiency is rated numerically (1-10)
    required: true,
    min: 1,
    max: 10
  },
  teamwork: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  problemSolving: {
    type: Number, // Assuming proficiency is rated numerically (1-10)
    required: true,
    min: 1,
    max: 10
  },
  adaptability: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  timeManagement: {
    type: Number, // Assuming proficiency is rated numerically (1-10)
    required: true,
    min: 1,
    max: 10
  },
  criticalThinking: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  creativity: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  leadership: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  interpersonalSkills: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  emotionalIntelligence: {
    type: String, // Using categorical rating
    required: true,
    enum: [
      'Not at all proficient',
      'Slightly proficient',
      'Moderately proficient',
      'Very proficient',
      'Extremely proficient',
      'Expert',
      'Master',
      'Leader',
      'Innovator',
      'Visionary'
    ]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model
const SoftSkills = mongoose.model('SoftSkills', softSkillsSchema);

// Export the model
module.exports = SoftSkills;

// models/ProjectSkill.js

const mongoose = require('mongoose');

const ProjectSkillSchema = new mongoose.Schema({
  softwareEngineerProjects: { type: Number, required: true, min: 0 },
  consultantProjects: { type: Number, required: true, min: 0 },
  fullStackProjects: { type: Number, required: true, min: 0 },
  dataAnalystProjects: { type: Number, required: true, min: 0 },
  dataEngineerProjects: { type: Number, required: true, min: 0 },
  dataScienceProjects: { type: Number, required: true, min: 0 },
  otherProjects: { type: Number, required: true, min: 0 },
  projectType: { type: String, required: true },
  toolsUsed: { type: String, required: true },
  favoriteProject: { type: String, required: true },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, 
 {
timestamps: true // Automatically adds createdAt and updatedAt fields
});

const ProjectSkill = mongoose.model('ProjectSkill', ProjectSkillSchema);

module.exports = ProjectSkill;

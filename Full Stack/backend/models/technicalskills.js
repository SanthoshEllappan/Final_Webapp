const mongoose = require('mongoose');

const technicalSkillSchema = new mongoose.Schema({
  programmingLanguages: { type: Number, required: true },
  webDevelopment: { type: Number, required: true },
  databaseManagement: { type: Number, required: true },
  cloudComputing: { type: String, required: true },
  versionControl: { type: String, required: true },
  machineLearning: { type: String, required: true },
  dataAnalysis: { type: String, required: true },
  cybersecurity: { type: String, required: true },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, 
 {
timestamps: true // Automatically adds createdAt and updatedAt fields
});

const TechnicalSkill = mongoose.model('TechnicalSkill', technicalSkillSchema);

module.exports = TechnicalSkill;

const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  achievementTitle: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  dateAchieved: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  additionalAchievements: {
    type: String,
    default: '',
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;

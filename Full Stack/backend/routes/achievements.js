const express = require('express');
const { addAchievement, getAchievements,getAllAchievements, getAchievementsById, updateAchievements } = require('../controllers/achievements');
const router = express.Router();

// POST route to add an achievement
router.post('/achievements', addAchievement);

// GET route to retrieve all achievements
router.get('/achievements/:userId', getAchievements);
router.get('/all', getAllAchievements);
router.get('/id', getAchievementsById); 
router.put('/up', updateAchievements)
module.exports = router;

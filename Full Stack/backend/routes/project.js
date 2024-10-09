// routes/projectSkills.js

const express = require('express');
const router = express.Router();
const projectSkillController = require('../controllers/project');

// Define the routes for Project Skills
router.post('/', projectSkillController.createProjectSkill);
router.get('/all', projectSkillController.getAllProjectSkills);
router.get('/', projectSkillController.getProjectSkillById);
router.put('/', projectSkillController.updateProjectSkill);
router.delete('/:id', projectSkillController.deleteProjectSkill);
router.get('/:userId', projectSkillController.getProjectSkillByIdadmin);
module.exports = router;

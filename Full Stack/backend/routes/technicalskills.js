const express = require('express');
const {
  createTechnicalSkill,
  getAllTechnicalSkills,
  getTechnicalSkillById,
  updateTechnicalSkill,
  deleteTechnicalSkill,
  getTechnicalSkillByIdadmin,
} = require('../controllers/technicalskills');

const router = express.Router();

router.post('/', createTechnicalSkill);            // Create a new Technical Skill
router.get('/all', getAllTechnicalSkills);            // Get all Technical Skills
router.get('/', getTechnicalSkillById);         // Get a Technical Skill by ID
router.put('/', updateTechnicalSkill);          // Update a Technical Skill
router.delete('/:id', deleteTechnicalSkill);       // Delete a Technical Skill
router.get('/:userId',getTechnicalSkillByIdadmin)
module.exports = router;

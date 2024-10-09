const express = require('express')
const { createSoftSkills, updateSoftSkills, getSoftSkillsByIdadmin } = require('../controllers/softskills')
const { getSoftSkillsById, getSoftSkill } = require('../controllers/softskills')
const route = express.Router()

route.post("/s",createSoftSkills)
route.get('/', getSoftSkillsById); 
route.get('/all',getSoftSkill)
route.put("/",updateSoftSkills)
route.get("/:userId",getSoftSkillsByIdadmin)
module.exports = route;
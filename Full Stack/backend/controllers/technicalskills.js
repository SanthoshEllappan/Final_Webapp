const TechnicalSkill = require('../models/technicalskills');
const jwt = require('jsonwebtoken');
// Create a new Technical Skill
const createTechnicalSkill = async (req, res) => {
  try {
    const {data,token} = req.body
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const technicalSkill = new TechnicalSkill(data);
    await technicalSkill.save();
    res.status(201).json(technicalSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Technical Skills
const getAllTechnicalSkills = async (req, res) => {
  try {
    const skills = await TechnicalSkill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Technical Skill by ID
const getTechnicalSkillByIdadmin = async (req, res) => {
  const {userId} = req.params
  try {
    const skill = await TechnicalSkill.findOne({userId:userId});
    if (!skill) return res.status(200).json({});
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a soft skills entry by ID
const getTechnicalSkillById = async (req, res) => {
  const {userId} = req.query
  const { id } = jwt.verify(userId, process.env.JWT_SECRET);

  try {
    const TechnicalSkillsEntry = await TechnicalSkill.findOne({userId:id});
    
    if (!TechnicalSkillsEntry) {
      return res.status(200).json({});
    }
    
    res.status(200).json(TechnicalSkillsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Technical skills entry', error: error.message });
  }
};


// Update an existing soft skills entry
const updateTechnicalSkill = async (req, res) => {
  try {
    const { token } = req.body; // Extract the token from the request body
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token to get the user ID

    // Find the soft skills entry by userId (instead of the entry ID from params)
    let skill = await TechnicalSkill.findOne({ userId });

    if (skill) {
      // Update the existing soft skills entry
      const { data } = req.body; // Extract the data from the request body
 
      // Update soft skills with new data
      Object.keys(data).forEach((key) => {
          skill[key] = data[key];
      });

      // // Save the updated soft skills entry
      await skill.save();
      return res.status(200).json({ message: 'Soft skills entry updated successfully', TechnicalSkill });
    } else {
      // If no entry exists, create a new one
      const newTechnicalSkill = new TechnicalSkill({ ...req.body.data, userId });
      await newTechnicalSkill.save();
      return res.status(201).json({ message: 'Soft skills entry created successfully', TechnicalSkill: newTechnicalSkill });
    }
    
  } catch (error) {console.log(error.message)
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};

// Delete a Technical Skill
const deleteTechnicalSkill = async (req, res) => {
  try {
    const skill = await TechnicalSkill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTechnicalSkill,
  getAllTechnicalSkills,
  getTechnicalSkillById,
  updateTechnicalSkill,
  deleteTechnicalSkill,
  getTechnicalSkillByIdadmin,
};

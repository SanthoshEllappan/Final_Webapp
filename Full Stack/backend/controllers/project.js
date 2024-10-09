// controllers/projectSkillController.js
const jwt = require('jsonwebtoken');
const ProjectSkill = require('../models/project');

// Create a new ProjectSkill
exports.createProjectSkill = async (req, res) => {
  try {
    const {data,token} = req.body
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const newProjectSkill = new ProjectSkill(data);
    await newProjectSkill.save();
    res.status(201).json({ message: 'Project Skill created successfully!', newProjectSkill });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Project Skill', error });
  }
};

// Get all ProjectSkills
exports.getAllProjectSkills = async (req, res) => {
  try {
    const projectSkills = await ProjectSkill.find();
    res.status(200).json(projectSkills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Project Skills', error });
  }
};

// Get a ProjectSkill by ID
exports.getProjectSkillById = async (req, res) => {
  const {userId} = req.query
  const { id } = jwt.verify(userId, process.env.JWT_SECRET);
  try {
    
    const projectSkill = await ProjectSkill.findOne({userId:id});
    if (!projectSkill) {
      return res.status(200).json({});
    }
    res.status(200).json(projectSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Project Skill', error });
  }
};


exports.updateProjectSkill = async (req, res) => {
  try {
    const { token } = req.body; // Extract the token from the request body
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token to get the user ID
    // Find the soft skills entry by userId (instead of the entry ID from params)
    let Project = await ProjectSkill.findOne({ userId });
    console.log(req.body)
    if (Project) {
      // Update the existing soft skills entry
      const { data } = req.body; // Extract the data from the request body
     
      // Update soft skills with new data
      Object.keys(data).forEach((key) => {
          Project[key] = data[key];
      });

      // // Save the updated soft skills entry
      await Project.save();
      return res.status(200).json({ message: 'Soft skills entry updated successfully', Project });
    } else {
      // If no entry exists, create a new one
      const newProjectSkill = new ProjectSkill({ ...req.body.data, userId });
      await newProjectSkill.save();
      return res.status(201).json({ message: 'Soft skills entry created successfully', softSkills: newProjectSkill });
    }
    
  } catch (error) {
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};


// Delete a ProjectSkill by ID
exports.deleteProjectSkill = async (req, res) => {
  try {
    const deletedProjectSkill = await ProjectSkill.findByIdAndDelete(req.params.id);
    if (!deletedProjectSkill) {
      return res.status(404).json({ message: 'Project Skill not found' });
    }
    res.status(200).json({ message: 'Project Skill deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Project Skill', error });
  }
};



// Retrieve a soft skills entry by ID
exports.getProjectSkillByIdadmin = async (req, res) => {
  const {userId} = req.params
  try {
    const getProjectSkillByIdadmin = await ProjectSkill.findOne({userId:userId});
    
    if (!getProjectSkillByIdadmin) {
      return res.status(200).json({});
    }
    
    res.status(200).json(getProjectSkillByIdadmin);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};
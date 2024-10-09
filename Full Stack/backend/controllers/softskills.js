const SoftSkills = require('../models/softskills'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Create a new soft skills entry
 const createSoftSkills = async (req, res) => {
  try {

    const {data,token} = req.body

    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const softSkills = new SoftSkills(data);
    await softSkills.save();
    res.status(201).json({ message: 'Soft skills entry created successfully', softSkills });
  } catch (error) {
    res.status(400).json({ message: 'Error creating soft skills entry', error: error.message });
  }
};


// Update an existing soft skills entry
const updateSoftSkills = async (req, res) => {
  try {
    const { token } = req.body; // Extract the token from the request body
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token to get the user ID

    // Find the soft skills entry by userId (instead of the entry ID from params)
    let softSkills = await SoftSkills.findOne({ userId });

    if (softSkills) {
      // Update the existing soft skills entry
      const { data } = req.body; // Extract the data from the request body
 
      // Update soft skills with new data
      Object.keys(data).forEach((key) => {
          softSkills[key] = data[key];
      });

      // // Save the updated soft skills entry
      await softSkills.save();
      return res.status(200).json({ message: 'Soft skills entry updated successfully', softSkills });
    } else {
      // If no entry exists, create a new one
      
      const newSoftSkills = new SoftSkills({ ...req.body.data, userId });
      await newSoftSkills.save();
      return res.status(201).json({ message: 'Soft skills entry created successfully', softSkills: newSoftSkills });
    }
    
  } catch (error) {
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};




// Retrieve all soft skills entries
 const getSoftSkill = async (req, res) => {
  try {
    const softSkillsEntries = await SoftSkills.find();
    res.status(200).json(softSkillsEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entries', error: error.message });
  }
};

// Retrieve a soft skills entry by ID
const getSoftSkillsById = async (req, res) => {
  const {userId} = req.query
  const { id } = jwt.verify(userId, process.env.JWT_SECRET);
  console.log("djf")
  try {
    const softSkillsEntry = await SoftSkills.findOne({userId:id});
    
    if (!softSkillsEntry) {
      return res.status(200).json({});
    }
    
    res.status(200).json(softSkillsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};

// Retrieve a soft skills entry by ID
const getSoftSkillsByIdadmin = async (req, res) => {
  const {userId} = req.params
  try {
    const softSkillsEntry = await SoftSkills.findOne({userId});
    
    if (!softSkillsEntry) {
      return res.status(200).json({});
    }
    
    res.status(200).json(softSkillsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};



// Update a soft skills entry by ID


// Delete a soft skills entry by ID
const deleteSoftSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const softSkillsEntry = await SoftSkills.findByIdAndDelete(id);
    
    if (!softSkillsEntry) {
      return res.status(404).json({ message: 'Soft skills entry not found' });
    }
    
    res.status(200).json({ message: 'Soft skills entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting soft skills entry', error: error.message });
  }
};

module.exports= {
    deleteSoftSkills,createSoftSkills,updateSoftSkills,getSoftSkill,getSoftSkillsById,
    getSoftSkillsByIdadmin
}

const Certification = require('../models/certifications');
const jwt = require('jsonwebtoken');
// Add a new certification
exports.addCertification = async (req, res) => {
  try {
    const {data,token} = req.body
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = id
    const newCertification = new Certification(data);
    await newCertification.save();
    res.status(201).json({ message: 'Certification added successfully', certification: newCertification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all certifications
exports.getCertifications = async (req, res) => {
  const {userId} = req.params
  
  try {
    const certifications = await Certification.findOne({userId:userId});
    if (!certifications) {
      return res.status(200).json({});
    }
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ProjectSkills
exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Project Skills', error });
  }
};


// Retrieve a soft skills entry by ID
exports.getCertificationsById = async (req, res) => {
  const {userId} = req.query
  const { id } = jwt.verify(userId, process.env.JWT_SECRET);
  console.log("djf")
  try {
    const CertificationsEntry = await Certification.findOne({userId:id});
    
    if (!CertificationsEntry) {
      return res.status(200).json({}); 
  }
    
    res.status(200).json(CertificationsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving soft skills entry', error: error.message });
  }
};


// Update an existing soft skills entry
exports.updateCertifications = async (req, res) => {
  try {
    const { token } = req.body; // Extract the token from the request body
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token to get the user ID

    // Find the soft skills entry by userId (instead of the entry ID from params)
    let CertificationsEntry = await Certification.findOne({ userId });

    if (CertificationsEntry) {
      // Update the existing soft skills entry
      const { data } = req.body; // Extract the data from the request body
 
      // Update soft skills with new data
      Object.keys(data).forEach((key) => {
          CertificationsEntry[key] = data[key];
      });

      // // Save the updated soft skills entry
      await CertificationsEntry.save();
      return res.status(200).json({ message: 'Soft skills entry updated successfully', CertificationsEntry });
    } else {
      // If no entry exists, create a new one
      
      const newCertificationsEntry = new Certification({ ...req.body.data, userId });
      await newCertificationsEntry.save();
      return res.status(201).json({ message: 'Soft skills entry created successfully', CertificationsEntry: newCertificationsEntry });
    }
    
  } catch (error) {
    res.status(400).json({ message: 'Error updating or creating soft skills entry', error: error.message });
  }
};

const express = require('express');
const { addCertification, getCertifications,getAllCertifications, getCertificationsById,updateCertifications } = require('../controllers/certifications');
const router = express.Router();

// POST route to add a certification
router.post('/certifications', addCertification);

// GET route to retrieve all certifications
router.get('/:userId', getCertifications);
router.get('/certifications/all', getAllCertifications);
router.get('/certifications/id', getCertificationsById);
router.put('/certifications/up',updateCertifications)
module.exports = router;

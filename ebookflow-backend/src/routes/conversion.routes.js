const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { convertToPDF, convertToEPUB, convertToHTML, convertToSlides } = require('../controllers/conversion.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Conversion routes
router.post('/pdf', convertToPDF);
router.post('/epub', convertToEPUB);
router.post('/html', convertToHTML);
router.post('/slides', convertToSlides);

module.exports = router;
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { enhanceContent, structureContent, summarizeContent, generateImage, clearAICache } = require('../controllers/ai.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// AI routes
router.post('/enhance', enhanceContent);
router.post('/structure', structureContent);
router.post('/summarize', summarizeContent);
router.post('/generate-image', generateImage);
router.delete('/cache', clearAICache);

module.exports = router;
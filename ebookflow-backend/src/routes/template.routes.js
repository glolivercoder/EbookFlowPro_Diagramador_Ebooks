const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getAvailableTemplates, loadTemplate, addTemplateVersion, clearCache } = require('../controllers/template.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Template routes
router.get('/available', getAvailableTemplates);
router.get('/:templateName/:version?', loadTemplate);
router.post('/:templateName/:version', addTemplateVersion);
router.delete('/cache', clearCache);

module.exports = router;
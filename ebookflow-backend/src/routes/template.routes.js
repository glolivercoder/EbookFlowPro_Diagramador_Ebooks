const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getAvailableTemplates,
  loadTemplate,
  addTemplateVersion,
  clearCache,
  getMarkdownTemplates,
  getMarkdownTemplate
} = require('../controllers/template.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Template routes
router.get('/available', getAvailableTemplates);
router.get('/:templateName/:version?', loadTemplate);
router.post('/:templateName/:version', addTemplateVersion);
router.delete('/cache', clearCache);

// Markdown template routes for frontend
router.get('/markdown/list', getMarkdownTemplates);
router.get('/markdown/:templateName', getMarkdownTemplate);

module.exports = router;
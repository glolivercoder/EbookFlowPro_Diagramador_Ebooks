const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadImage, upload } = require('../controllers/upload.controller');

// Rota para upload de imagem
router.post('/image', auth, upload.single('image'), uploadImage);

module.exports = router;
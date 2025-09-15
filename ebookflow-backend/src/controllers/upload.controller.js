const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middleware/auth');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/images');
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome de arquivo único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Controller para upload de imagens
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const imagePath = req.file.path;
    const fileName = req.file.filename;
    
    // Otimizar imagem com Sharp
    const optimizedImagePath = path.join(path.dirname(imagePath), `optimized-${fileName}`);
    
    await sharp(imagePath)
      .resize(1200, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 80 })
      .toFile(optimizedImagePath);
    
    // Remover imagem original
    fs.unlinkSync(imagePath);
    
    // Renomear arquivo otimizado para o nome original
    fs.renameSync(optimizedImagePath, imagePath);
    
    // Retornar URL da imagem
    const imageUrl = `/uploads/images/${fileName}`;
    
    res.json({
      message: 'Imagem enviada com sucesso',
      imageUrl: imageUrl,
      fileName: fileName
    });
  } catch (error) {
    console.error('Erro no upload de imagem:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
};

module.exports = {
  uploadImage,
  upload,
};
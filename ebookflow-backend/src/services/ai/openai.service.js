const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Para otimização de imagens

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY não configurada');
    }
    this.openai = new OpenAI({ apiKey: this.apiKey });
    this.cacheDir = path.join(__dirname, '../../../uploads/images');
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
    this.cache = new Map();
    this.model = 'dall-e-3';
  }

  async generateImage(prompt, options = {}) {
    const {
      size = '1024x1024',
      quality = 'standard',
      style = 'vivid',
      n = 1,
      context = 'ebook'
    } = options;

    const cacheKey = `${crypto.createHash('md5').update(prompt + size + quality).digest('hex')}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Build contextual prompt
    const contextualPrompt = this.buildContextualPrompt(prompt, context, size);

    try {
      const response = await this.openai.images.generate({
        model: this.model,
        prompt: contextualPrompt,
        n,
        size,
        quality,
        style,
        response_format: 'url'
      });

      const imageUrl = response.data[0].url;
      const imageBuffer = await this.downloadImage(imageUrl);
      const optimizedPath = await this.optimizeImage(imageBuffer, cacheKey, size);

      const result = {
        success: true,
        imageUrl,
        localPath: optimizedPath,
        prompt: contextualPrompt,
        model: this.model,
        timestamp: new Date()
      };

      // Cache result
      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      console.error('Erro na geração de imagem:', error);
      throw new Error('Falha na geração de imagem');
    }
  }

  buildContextualPrompt(basePrompt, context, size) {
    const specs = {
      ebook: 'Gere uma imagem profissional para um eBook sobre o tópico. Estilo: Moderno, minimalista, com cores harmoniosas. Contexto: Capa ou ilustração. Resolução: 1024x1024. Estilo visual: Clean, profissional, adequado para publicação. Cores: Paleta consistente com design editorial moderno.',
      presentation: 'Gere uma imagem para apresentação. Estilo: Profissional, clean, focado em conteúdo visual.',
      academic: 'Gere uma imagem acadêmica, diagrama ou ilustração conceitual, estilo formal.',
      creative: 'Gere uma imagem criativa, artística, inspiradora para história ou conteúdo criativo.'
    };

    const spec = specs[context] || specs.ebook;
    return `${basePrompt}. ${spec}`;
  }

  async downloadImage(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha no download da imagem');
    return Buffer.from(await response.arrayBuffer());
  }

  async optimizeImage(buffer, filename, size) {
    const ext = size.includes('1024x1024') ? 'png' : 'jpeg';
    const outputPath = path.join(this.cacheDir, `${filename}.${ext}`);
    
    await sharp(buffer)
      .resize({ width: parseInt(size.split('x')[0]), height: parseInt(size.split('x')[1]), fit: 'cover' })
      .toFormat(ext === 'png' ? 'png' : 'jpeg')
      .jpeg({ quality: 80 })
      .png({ quality: 80 })
      .toFile(outputPath);

    return outputPath;
  }

  clearCache() {
    this.cache.clear();
    // Clear disk cache if needed
    const files = fs.readdirSync(this.cacheDir);
    files.forEach(file => fs.unlinkSync(path.join(this.cacheDir, file)));
  }

  async generateContextualImage(content, type = 'cover') {
    let prompt;
    if (type === 'cover') {
      prompt = `Crie uma capa para eBook baseada neste conteúdo: ${content.substring(0, 200)}`;
    } else if (type === 'illustration') {
      prompt = `Gere uma ilustração contextual para este conteúdo: ${content.substring(0, 100)}`;
    }

    return this.generateImage(prompt, { context: 'ebook', size: '1024x1024' });
  }
}

module.exports = new OpenAIService();
const OpenRouterService = require('../services/ai/openrouter.service');
const GeminiService = require('../services/ai/gemini.service');
const OpenAIService = require('../services/ai/openai.service');

exports.enhanceContent = async (req, res) => {
  try {
    const { content, format, type = 'structure' } = req.body;
    const userId = req.user.userId;

    if (!content || !format) {
      return res.status(400).json({ error: 'Conteúdo e formato são obrigatórios' });
    }

    const result = await OpenRouterService.routeContent(content, format, type);
    const enhancedContent = result.choices[0].message.content;

    res.json({
      success: true,
      enhancedContent,
      modelUsed: result.model,
      usage: result.usage
    });
  } catch (error) {
    console.error('Erro na melhoria de conteúdo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.structureContent = async (req, res) => {
  try {
    const { content, format = 'ebook' } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const structured = await GeminiService.structureContent(content, format);
    res.json({
      success: true,
      structuredContent: structured,
      format,
      model: 'gemini-1.5-flash'
    });
  } catch (error) {
    console.error('Erro na estruturação de conteúdo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.summarizeContent = async (req, res) => {
  try {
    const { content, format } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const result = await OpenRouterService.routeContent(content, format, 'summarize');
    const summary = result.choices[0].message.content;

    res.json({
      success: true,
      summary,
      modelUsed: result.model
    });
  } catch (error) {
    console.error('Erro no resumo de conteúdo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.generateImage = async (req, res) => {
  try {
    const { prompt, size = '1024x1024', context = 'ebook' } = req.body;
    const userId = req.user.userId;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório' });
    }

    const result = await OpenAIService.generateImage(prompt, { size, context });
    res.json({
      success: true,
      imageUrl: result.imageUrl,
      localPath: result.localPath,
      prompt: result.prompt,
      model: result.model
    });
  } catch (error) {
    console.error('Erro na geração de imagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.clearAICache = async (req, res) => {
  try {
    OpenRouterService.clearCache();
    OpenAIService.clearCache();
    res.json({ success: true, message: 'Cache de IA limpo' });
  } catch (error) {
    console.error('Erro ao limpar cache AI:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
const TemplateService = require('../services/template.service');

exports.getAvailableTemplates = async (req, res) => {
  try {
    const templates = TemplateService.getAvailableTemplates();
    res.json({ success: true, templates });
  } catch (error) {
    console.error('Erro ao listar templates:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.loadTemplate = async (req, res) => {
  try {
    const { templateName, version = 'latest' } = req.params;

    if (!templateName) {
      return res.status(400).json({ error: 'Nome do template é obrigatório' });
    }

    const template = await TemplateService.loadTemplate(templateName, version);
    res.json({ success: true, template });
  } catch (error) {
    console.error('Erro ao carregar template:', error);
    res.status(404).json({ error: 'Template não encontrado' });
  }
};

exports.addTemplateVersion = async (req, res) => {
  try {
    const { templateName, version } = req.params;
    const { content } = req.body;

    if (!templateName || !version || !content) {
      return res.status(400).json({ error: 'Nome do template, versão e conteúdo são obrigatórios' });
    }

    const result = await TemplateService.addTemplateVersion(templateName, content, version);
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    console.error('Erro ao adicionar versão do template:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.clearCache = async (req, res) => {
  try {
    const { templateName } = req.query;
    TemplateService.clearCache(templateName || null);
    res.json({ success: true, message: 'Cache limpo' });
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
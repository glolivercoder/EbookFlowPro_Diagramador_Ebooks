const PandocService = require('../services/conversion/pandoc.service');
const fs = require('fs');
const path = require('path');

exports.convertToPDF = async (req, res) => {
  try {
    const { markdown, title, author, template } = req.body;
    const userId = req.user.userId;

    if (!markdown) {
      return res.status(400).json({ error: 'Conteúdo Markdown é obrigatório' });
    }

    const outputPath = path.join(__dirname, '../../../uploads', `${userId}-ebook.pdf`);
    
    const result = await PandocService.convertToPDF(markdown, {
      title: title || 'Meu eBook',
      author: author || 'Autor',
      template: template || 'modern-ebook',
      outputPath
    });

    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Conversão para PDF realizada com sucesso',
        filePath: outputPath 
      });
    } else {
      res.status(500).json({ error: 'Erro na conversão para PDF' });
    }
  } catch (error) {
    console.error('Erro na conversão PDF:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.convertToEPUB = async (req, res) => {
  try {
    const { markdown, title, author } = req.body;
    const userId = req.user.userId;

    if (!markdown) {
      return res.status(400).json({ error: 'Conteúdo Markdown é obrigatório' });
    }

    const outputPath = path.join(__dirname, '../../../uploads', `${userId}-ebook.epub`);
    
    const result = await PandocService.convertToEPUB(markdown, {
      title: title || 'Meu eBook',
      author: author || 'Autor',
      outputPath
    });

    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Conversão para EPUB realizada com sucesso',
        filePath: outputPath 
      });
    } else {
      res.status(500).json({ error: 'Erro na conversão para EPUB' });
    }
  } catch (error) {
    console.error('Erro na conversão EPUB:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.convertToHTML = async (req, res) => {
  try {
    const { markdown, title, template } = req.body;
    const userId = req.user.userId;

    if (!markdown) {
      return res.status(400).json({ error: 'Conteúdo Markdown é obrigatório' });
    }

    const outputPath = path.join(__dirname, '../../../uploads', `${userId}-ebook.html`);
    
    const result = await PandocService.convertToHTML(markdown, {
      title: title || 'Meu eBook',
      template: template || 'default',
      outputPath
    });

    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Conversão para HTML realizada com sucesso',
        filePath: outputPath 
      });
    } else {
      res.status(500).json({ error: 'Erro na conversão para HTML' });
    }
  } catch (error) {
    console.error('Erro na conversão HTML:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.convertToSlides = async (req, res) => {
  try {
    const { markdown, template } = req.body;
    const userId = req.user.userId;

    if (!markdown) {
      return res.status(400).json({ error: 'Conteúdo Markdown é obrigatório' });
    }

    const outputPath = path.join(__dirname, '../../../uploads', `${userId}-slides.html`);
    
    const result = await PandocService.convertToSlides(markdown, {
      template: template || 'reveal',
      outputPath
    });

    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Conversão para slides realizada com sucesso',
        filePath: outputPath 
      });
    } else {
      res.status(500).json({ error: 'Erro na conversão para slides' });
    }
  } catch (error) {
    console.error('Erro na conversão slides:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
const fetch = require('node-fetch');

class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseUrl = 'https://openrouter.ai/api/v1';
    this.cache = new Map();
    this.modelFallbacks = {
      'ebook': ['anthropic/claude-3.5-sonnet', 'openai/gpt-4-turbo'],
      'presentation': ['openai/gpt-4-turbo', 'google/gemini-pro-1.5'],
      'academic': ['google/gemini-pro-1.5', 'anthropic/claude-3.5-sonnet'],
      'creative': ['anthropic/claude-3-opus', 'openai/gpt-4-turbo']
    };
  }

  async routeContent(content, targetFormat, promptType = 'structure') {
    const model = this.selectOptimalModel(targetFormat);
    const prompt = this.buildPrompt(content, targetFormat, promptType);
    const cacheKey = `${model}-${crypto.createHash('md5').update(prompt).digest('hex')}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3001',
          'X-Title': 'EbookFlow Pro'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      this.monitorUsage(model, data.usage);
      return data;
    } catch (error) {
      console.error('Erro OpenRouter:', error);
      return await this.tryFallback(model, prompt, targetFormat);
    }
  }

  selectOptimalModel(format) {
    const models = this.modelFallbacks[format] || this.modelFallbacks['ebook'];
    return models[0];
  }

  buildPrompt(content, format, type) {
    const prompts = {
      structure: `Estrutura este conteúdo para ${format}: ${content}`,
      enhance: `Melhore este conteúdo para ${format} com elementos visuais: ${content}`,
      summarize: `Resuma este conteúdo para ${format}: ${content}`
    };
    return prompts[type] || prompts.structure;
  }

  async tryFallback(model, prompt, format) {
    const models = this.modelFallbacks[format] || this.modelFallbacks['ebook'];
    for (let i = 1; i < models.length; i++) {
      try {
        const fallbackModel = models[i];
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: fallbackModel,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 4000
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`Fallback para ${fallbackModel} bem-sucedido`);
          return data;
        }
      } catch (fallbackError) {
        console.error(`Fallback ${i} falhou:`, fallbackError);
        continue;
      }
    }
    throw new Error('Todos os modelos falharam');
  }

  monitorUsage(model, usage) {
    // Log usage for monitoring
    console.log(`Uso do modelo ${model}:`, usage);
    // Aqui pode ser integrado com um sistema de monitoramento mais robusto
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new OpenRouterService();
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!this.apiKey) {
      throw new Error('GOOGLE_AI_API_KEY não configurada');
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.modelName = 'gemini-1.5-flash';
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  async structureContent(content, format = 'ebook') {
    const prompt = this.buildStructurePrompt(content, format);
    const result = await this.generateContentWithRetry(prompt);
    return this.validateAndSanitize(result);
  }

  buildStructurePrompt(content, format) {
    const basePrompt = `
Você é um especialista em estruturação de conteúdo para eBooks e apresentações profissionais.

CONTEXTO: O usuário forneceu o seguinte texto bruto que precisa ser transformado em um eBook bem estruturado:

${content}

TAREFA: Transforme este conteúdo em uma estrutura markdown otimizada para conversão via Pandoc, seguindo estas diretrizes:

1. **Estrutura Hierárquica**:
   - Use # para capítulos principais
   - Use ## para seções
   - Use ### para subseções

2. **Elementos Visuais**:
   - Identifique onde adicionar imagens (marque com [IMAGEM: descrição])
   - Adicione caixas de destaque para informações importantes
   - Inclua citações e exemplos quando apropriado

3. **Formatação**:
   - Use **negrito** para termos importantes
   - Use *itálico* para ênfase
   - Crie listas quando apropriado
   - Adicione tabelas para dados estruturados

4. **Metadados**:
   - Sugira título, subtítulo e descrição
   - Identifique palavras-chave principais
   - Determine categoria/gênero do conteúdo

FORMATO DE SAÍDA:
\`\`\`yaml
metadados:
  titulo: ""
  subtitulo: ""
  autor: ""
  categoria: ""
  palavras_chave: []
  descricao: ""

estrutura_sugerida:
  - capitulo: ""
    secoes: []

conteudo_formatado: |
  # Título Principal
  
  ## Introdução
  [conteúdo estruturado aqui]
\`\`\`

Processe o conteúdo e retorne a estrutura otimizada para formato ${format}.
`;

    return basePrompt;
  }

  async generateContentWithRetry(prompt, attempt = 1) {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error(`Tentativa ${attempt} falhou:`, error);
      if (attempt < this.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.generateContentWithRetry(prompt, attempt + 1);
      }
      throw error;
    }
  }

  validateAndSanitize(content) {
    if (!content || content.length < 10) {
      throw new Error('Resposta inválida do modelo');
    }

    // Sanitização básica - remover tags HTML indesejadas, etc.
    const sanitized = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/on\w+=\w+/gi, '') // Remove event handlers
      .trim();

    // Validação de estrutura YAML básica
    if (sanitized.includes('metadados:') && sanitized.includes('conteudo_formatado:')) {
      return sanitized;
    }

    // Se não tem estrutura YAML, tenta extrair o conteúdo formatado
    const yamlMatch = sanitized.match(/conteudo_formatado:\s*\|\s*(.*)/s);
    if (yamlMatch) {
      return yamlMatch[1].trim();
    }

    return sanitized;
  }

  // Sistema de prompts para diferentes tipos de conteúdo
  getPromptTemplate(type) {
    const templates = {
      ebook: this.buildStructurePrompt,
      presentation: (content) => this.buildStructurePrompt(content, 'presentation'),
      academic: (content) => this.buildStructurePrompt(content, 'academic'),
      creative: (content) => this.buildStructurePrompt(content, 'creative')
    };
    return templates[type] || templates.ebook;
  }

  async generateStructuredContent(content, type = 'ebook') {
    const buildPrompt = this.getPromptTemplate(type);
    const prompt = buildPrompt(content);
    return this.structureContent(content, type);
  }
}

module.exports = new GeminiService();
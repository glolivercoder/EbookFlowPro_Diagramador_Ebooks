const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class TemplateService {
  constructor() {
    this.templatesPath = path.join(__dirname, '../../templates');
    this.cache = new Map();
    this.baseTemplates = {
      'modern-ebook': '1.0.0',
      'business-report': '1.0.0',
      'academic-paper': '1.0.0',
      'creative-story': '1.0.0',
      'technical-manual': '1.0.0',
      'newsletter': '1.0.0',
      'resume-cv': '1.0.0',
      'presentation-outline': '1.0.0',
      'blog-post': '1.0.0',
      'product-description': '1.0.0'
    };
    this.initializeMarkdownTemplates();
  }

  // Initialize markdown templates with comprehensive examples
  initializeMarkdownTemplates() {
    this.markdownTemplates = {
      'modern-ebook': `# Título do Seu Ebook

**Autor:** Seu Nome
**Data:** ${new Date().toLocaleDateString('pt-BR')}

---

## Prefácio

Bem-vindo ao seu ebook! Este é um template moderno e profissional para criar ebooks incríveis.

---

## Introdução

Escreva aqui a introdução do seu ebook. Este espaço é perfeito para apresentar o tema principal e os objetivos do seu trabalho.

---

## Capítulo 1: Título do Primeiro Capítulo

### Seção 1.1

Conteúdo da primeira seção do capítulo 1.

#### Subseção 1.1.1

- Ponto importante 1
- Ponto importante 2
- Ponto importante 3

---

## Capítulo 2: Desenvolvimento

Aqui você pode desenvolver seus argumentos principais.

> **Dica:** Use citações em bloco para destacar informações importantes.

### Lista de Tópicos

1. Primeiro tópico
2. Segundo tópico
3. Terceiro tópico

---

## Conclusão

Finalize seu ebook com uma conclusão impactante.

---

## Sobre o Autor

Conte um pouco sobre você e sua expertise no assunto.`,
      'business-report': `# Relatório Empresarial

**Empresa:** Nome da Empresa
**Período:** ${new Date().toLocaleDateString('pt-BR')}
**Preparado por:** Seu Nome

---

## Resumo Executivo

Este relatório apresenta uma análise abrangente do desempenho da empresa durante o período analisado.

---

## Introdução

### Objetivos do Relatório

- Apresentar resultados financeiros
- Analisar tendências de mercado
- Identificar oportunidades de melhoria

---

## Análise de Mercado

### Cenário Atual

O mercado apresenta as seguintes características:

- **Crescimento:** Taxa de crescimento anual
- **Concorrência:** Principais concorrentes
- **Tendências:** Novas tecnologias emergentes

---

## Resultados Financeiros

### Receitas

| Mês | Valor (R$) | Variação (%) |
|-----|------------|--------------|
| Janeiro | 150.000 | +5% |
| Fevereiro | 175.000 | +17% |
| Março | 160.000 | -9% |

---

## Recomendações

### Ações Imediatas

1. **Otimização de Processos:** Implementar automação
2. **Treinamento:** Capacitação da equipe
3. **Marketing:** Campanhas digitais

---

## Conclusão

Os resultados demonstram um desempenho positivo com oportunidades de crescimento futuro.`,
      'academic-paper': `# Artigo Acadêmico

**Título:** Análise da Implementação de Novas Tecnologias
**Autor:** Seu Nome
**Instituição:** Universidade/Institution
**Data:** ${new Date().toLocaleDateString('pt-BR')}

---

## Resumo

Este artigo apresenta uma análise detalhada sobre a implementação de novas tecnologias no contexto acadêmico. O estudo aborda os desafios, benefícios e implicações para a educação moderna.

**Palavras-chave:** tecnologia, educação, inovação, metodologia

---

## Introdução

### Contextualização

A incorporação de tecnologias digitais no ambiente acadêmico representa uma transformação significativa nos processos educacionais tradicionais.

### Problema de Pesquisa

Como as novas tecnologias impactam o processo de aprendizagem?

### Objetivos

- Analisar os benefícios da tecnologia na educação
- Identificar desafios na implementação
- Propor soluções para otimização

---

## Revisão de Literatura

### Estudos Anteriores

Vários pesquisadores têm investigado o impacto das tecnologias digitais:

#### Benefícios Identificados

- **Acessibilidade:** Ampliação do acesso à educação
- **Interatividade:** Maior engajamento do aluno
- **Personalização:** Adaptação ao ritmo individual

#### Desafios Encontrados

- **Resistência à Mudança:** Dificuldade de adaptação
- **Custos de Implementação:** Investimentos necessários
- **Treinamento:** Capacitação de professores

---

## Metodologia

### Abordagem

Este estudo utilizou uma abordagem mista, combinando:

1. **Pesquisa Quantitativa:** Questionários aplicados
2. **Pesquisa Qualitativa:** Entrevistas em profundidade
3. **Análise Documental:** Revisão de políticas institucionais

---

## Resultados

### Dados Coletados

A pesquisa revelou os seguintes achados:

#### Estatísticas Principais

- 85% dos estudantes reportaram melhoria no engajamento
- 70% dos professores identificaram benefícios pedagógicos
- 60% das instituições enfrentaram desafios técnicos

---

## Discussão

### Interpretação dos Resultados

Os dados sugerem que, apesar dos desafios iniciais, as tecnologias digitais proporcionam benefícios significativos para o processo educacional.

### Implicações

- **Para Estudantes:** Maior autonomia no aprendizado
- **Para Professores:** Novos recursos pedagógicos
- **Para Instituições:** Modernização dos processos

---

## Conclusão

### Síntese dos Achados

A implementação de tecnologias digitais no ambiente acadêmico apresenta um potencial transformador, desde que acompanhada de estratégias adequadas.

### Recomendações

1. **Planejamento Estratégico:** Definir objetivos claros
2. **Capacitação:** Treinamento contínuo
3. **Avaliação:** Monitoramento dos resultados

---

## Referências

[1] Silva, J. (2023). *Tecnologia na Educação*. São Paulo: Editora Universitária.

[2] Santos, M. (2024). *Inovação Pedagógica Digital*. Rio de Janeiro: Editora Acadêmica.`,
      'creative-story': `# Minha História Criativa

**Título:** A Jornada Inesperada
**Autor:** Seu Nome
**Gênero:** Ficção / Fantasia
**Data:** ${new Date().toLocaleDateString('pt-BR')}

---

## Capítulo 1: O Início da Jornada

Era uma vez, em uma vila pacata às margens de um rio antigo, vivia um jovem chamado Elias. Aos 17 anos, Elias sonhava com aventuras além dos limites da vila.

### A Vila dos Sonhos

A vila de Eldoria era conhecida por suas casas coloridas e ruas de pedra antiga. O rio Eldor corria mansamente, refletindo as cores do pôr do sol como um espelho mágico.

- **População:** Aproximadamente 500 habitantes
- **Atividades:** Pescaria, agricultura e comércio local
- **Tradições:** Festival da Lua Cheia

---

## Capítulo 2: O Encontro Misterioso

Uma tarde de outono, enquanto explorava a floresta proibida, Elias encontrou algo extraordinário.

> *"O que é isso?"* - murmurou Elias, aproximando-se cautelosamente.

### A Criatura Mística

A criatura tinha olhos brilhantes como estrelas e pele que mudava de cor conforme a luz. Ela falou com uma voz suave e melodiosa:

*"Venho de um mundo além do seu. Você foi escolhido para uma missão especial."*

---

## Capítulo 3: A Missão Revelada

A criatura revelou a Elias que a vila corria perigo. Uma sombra antiga ameaçava consumir tudo.

### Os Perigos

- **A Sombra Devoradora:** Criatura que consome luz e alegria
- **Os Guardiões Esquecidos:** Protetores adormecidos há séculos
- **O Cristal da Luz:** Artefato capaz de banir as trevas

---

## Capítulo 4: A Busca pelo Cristal

Elias partiu em uma jornada perigosa pelas montanhas geladas e florestas sombrias.

### Desafios Encontrados

#### A Ponte Suspensa

A ponte rangia sob seus pés, ameaçando desabar a qualquer momento. O vento uivava como lobos famintos.

#### O Vale dos Ecos

*"Quem ousa entrar no meu domínio?"* - ecoou uma voz profunda.

---

## Capítulo 5: O Clímax

No topo da Montanha Sagrada, Elias enfrentou a Sombra Devoradora.

### A Batalha Final

A batalha foi intensa e cheia de magia. Elias usou não apenas força física, mas também coragem e inteligência.

- **Golpe 1:** Usou o fogo mágico contra as trevas
- **Golpe 2:** Invocou os espíritos da floresta
- **Golpe Final:** Usou o amor pela vila como arma mais poderosa

---

## Capítulo 6: O Renascimento

Com a vitória, a vila floresceu mais do que nunca. Elias tornou-se um herói lendário.

### As Lições Aprendidas

- A coragem supera qualquer obstáculo
- A amizade é a magia mais poderosa
- Cada desafio é uma oportunidade de crescimento

---

## Epílogo

Elias continuou sua vida na vila, mas agora com olhos diferentes. Ele sabia que aventuras extraordinárias podem acontecer nos lugares mais comuns.

> E assim termina nossa história, mas quem sabe quais outras aventuras aguardam por aí?

---

**Fim**`,
      'technical-manual': `# Manual Técnico

**Produto:** Sistema de Gestão Empresarial
**Versão:** 2.1.0
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Autor:** Equipe de Desenvolvimento

---

## Pré-requisitos do Sistema

### Hardware Mínimo

- **Processador:** Intel Core i5 ou equivalente
- **Memória RAM:** 8 GB
- **Armazenamento:** 500 GB SSD
- **Sistema Operacional:** Windows 10/11, Linux Ubuntu 18.04+, macOS 10.15+

### Software Necessário

- **Navegador Web:** Chrome 90+, Firefox 88+, Safari 14+
- **Servidor Web:** Apache 2.4+ ou Nginx 1.18+
- **Banco de Dados:** MySQL 8.0+, PostgreSQL 12+
- **PHP:** Versão 8.0+

---

## Instalação

### Passo 1: Download dos Arquivos

1. Acesse o portal de downloads
2. Faça login com suas credenciais
3. Baixe o arquivo de instalação: \`sistema-gestao-v2.1.0.zip\`

### Passo 2: Preparação do Ambiente

\\\`bash
# Criar diretório do projeto
mkdir /var/www/sistema-gestao
cd /var/www/sistema-gestao

# Extrair arquivos
unzip ~/Downloads/sistema-gestao-v2.1.0.zip
\\\`

### Passo 3: Configuração do Banco de Dados

\\\`sql
-- Criar banco de dados
CREATE DATABASE sistema_gestao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar usuário
CREATE USER 'sistema_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON sistema_gestao.* TO 'sistema_user'@'localhost';
FLUSH PRIVILEGES;
\\\`

---

## Configuração

### Arquivo de Configuração

Localize o arquivo \`config.php\` e edite as seguintes configurações:

\\\`php
<?php
// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'sistema_gestao');
define('DB_USER', 'sistema_user');
define('DB_PASS', 'senha_segura');

// Configurações de segurança
define('ENCRYPTION_KEY', 'chave-aleatoria-segura');
define('SESSION_TIMEOUT', 3600);

// URLs do sistema
define('BASE_URL', 'https://empresa.com/sistema');
?>
\\\`

---

## Funcionalidades Principais

### Módulo de Vendas

#### Gestão de Pedidos

1. **Criar Pedido**
  - Adicionar itens
  - Aplicar descontos
  - Calcular impostos

2. **Aprovação de Pedidos**
  - Workflow de aprovação
  - Notificações automáticas
  - Relatórios de status

### Módulo Financeiro

#### Contas a Receber

- **Emissão de Boletos:** Geração automática
- **Controle de Vencimentos:** Alertas configuráveis
- **Relatórios Financeiros:** Análises detalhadas

---

## Solução de Problemas

### Problemas Comuns

#### Erro de Conexão com Banco de Dados

**Sintomas:**
- Página não carrega
- Erro: "Connection failed"

**Solução:**
1. Verificar credenciais no arquivo config.php
2. Testar conexão com o banco
3. Verificar permissões do usuário

#### Performance Lenta

**Causas Possíveis:**
- Servidor sobrecarregado
- Consultas não otimizadas
- Cache não configurado

**Soluções:**
1. Otimizar consultas SQL
2. Implementar sistema de cache
3. Verificar recursos do servidor

---

## Manutenção

### Backup Regular

\\\`bash
# Script de backup diário
#!/bin/bash
DATE=$(date +%Y%m%d)
mysqldump -u sistema_user -p sistema_gestao > backup_$DATE.sql
\\\`

### Monitoramento

#### Métricas Importantes

- **Uptime do Sistema:** > 99.9%
- **Tempo de Resposta:** < 2 segundos
- **Taxa de Erro:** < 1%

---

## Suporte Técnico

### Canais de Suporte

- **Email:** suporte@empresa.com
- **Telefone:** (11) 9999-9999
- **Chat Online:** Disponível 24/7
- **Base de Conhecimento:** docs.empresa.com

### Horário de Atendimento

- **Segunda a Sexta:** 8h às 18h
- **Sábado:** 8h às 12h
- **Domingo:** Plantão (emergências)

---

## Anexos

### A. Glossário de Termos

- **API:** Application Programming Interface
- **CRUD:** Create, Read, Update, Delete
- **REST:** Representational State Transfer

### B. Diagramas de Arquitetura

[Diagramas disponíveis na pasta /docs/architecture]

### C. Scripts de Migração

[Scripts disponíveis na pasta /migrations]`
    };
  }

  // Load and parse template
  async loadTemplate(templateName, version = 'latest') {
    const cacheKey = `${templateName}-${version}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check if it's a markdown template first
    if (this.markdownTemplates[templateName]) {
      const cached = {
        content: this.markdownTemplates[templateName],
        version,
        parsedAt: new Date(),
        type: 'markdown'
      };
      this.cache.set(cacheKey, cached);
      return cached;
    }

    const templateDir = path.join(this.templatesPath, templateName);
    const versionDir = version === 'latest' ? templateName : `${templateName}/${version}`;
    const templatePath = path.join(this.templatesPath, versionDir, 'main.tex');

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template ${templateName} versão ${version} não encontrado`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Parse template - replace placeholders like $title$, $author$, etc.
    const parsedTemplate = this.parseTemplate(templateContent);

    // Cache the parsed template
    const cached = { content: parsedTemplate, version, parsedAt: new Date(), type: 'latex' };
    this.cache.set(cacheKey, cached);

    return cached;
  }

  parseTemplate(content) {
    // Basic parser for placeholders
    return content
      .replace(/\$title\$/g, '{{title}}')
      .replace(/\$author\$/g, '{{author}}')
      .replace(/\$date\$/g, '{{date}}')
      .replace(/\$body\$/g, '{{body}}')
      // Add more placeholders as needed
      .replace(/\[IMAGEM: (.*?)\]/g, '![$1]({{image-$1}})');
  }

  // Get available templates
  getAvailableTemplates() {
    const templates = {};
    for (const [name, latestVersion] of Object.entries(this.baseTemplates)) {
      templates[name] = {
        versions: [latestVersion],
        latest: latestVersion,
        type: this.getTemplateType(name)
      };
    }
    return templates;
  }

  getTemplateType(name) {
    if (name.includes('ebook')) return 'ebook';
    if (name.includes('business')) return 'business';
    if (name.includes('academic')) return 'academic';
    if (name.includes('creative')) return 'creative';
    return 'general';
  }

  // Add new template version
  async addTemplateVersion(templateName, content, version) {
    const versionDir = path.join(this.templatesPath, templateName, version);
    fs.mkdirSync(versionDir, { recursive: true });

    const mainPath = path.join(versionDir, 'main.tex');
    fs.writeFileSync(mainPath, content);

    // Update base templates
    this.baseTemplates[templateName] = version;

    // Clear cache for this template
    for (const key of this.cache.keys()) {
      if (key.startsWith(templateName)) {
        this.cache.delete(key);
      }
    }

    return { success: true, version, templateName };
  }

  // Clear cache
  clearCache(templateName = null) {
    if (templateName) {
      for (const key of this.cache.keys()) {
        if (key.startsWith(templateName)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // Get template content for a specific version
  getTemplateContent(templateName, version = 'latest') {
    const cached = this.cache.get(`${templateName}-${version}`);
    if (cached) {
      return cached.content;
    }
    return null;
  }

  // Get all markdown templates
  getMarkdownTemplates() {
    const templates = {};
    for (const [name, content] of Object.entries(this.markdownTemplates)) {
      templates[name] = {
        name: this.getTemplateDisplayName(name),
        category: this.getTemplateCategory(name),
        description: this.getTemplateDescription(name),
        icon: this.getTemplateIcon(name),
        content: content.substring(0, 200) + '...' // Preview first 200 chars
      };
    }
    return templates;
  }

  // Get specific markdown template
  getMarkdownTemplate(templateName) {
    return this.markdownTemplates[templateName] || null;
  }

  // Helper methods for template metadata
  getTemplateDisplayName(name) {
    const names = {
      'modern-ebook': 'Ebook Moderno',
      'business-report': 'Relatório Empresarial',
      'academic-paper': 'Artigo Acadêmico',
      'creative-story': 'História Criativa',
      'technical-manual': 'Manual Técnico',
      'newsletter': 'Newsletter',
      'resume-cv': 'Currículo',
      'presentation-outline': 'Apresentação',
      'blog-post': 'Post de Blog',
      'product-description': 'Descrição de Produto'
    };
    return names[name] || name;
  }

  getTemplateCategory(name) {
    const categories = {
      'modern-ebook': 'ebook',
      'business-report': 'business',
      'academic-paper': 'academic',
      'creative-story': 'creative',
      'technical-manual': 'technical',
      'newsletter': 'marketing',
      'resume-cv': 'personal',
      'presentation-outline': 'business',
      'blog-post': 'content',
      'product-description': 'marketing'
    };
    return categories[name] || 'general';
  }

  getTemplateDescription(name) {
    const descriptions = {
      'modern-ebook': 'Template profissional para ebooks com estrutura completa',
      'business-report': 'Relatório executivo com análise de dados e métricas',
      'academic-paper': 'Formatação acadêmica com seções científicas padrão',
      'creative-story': 'Estrutura narrativa para histórias e contos',
      'technical-manual': 'Documentação técnica com exemplos e código',
      'newsletter': 'Boletim informativo corporativo',
      'resume-cv': 'Currículo profissional moderno',
      'presentation-outline': 'Estrutura para apresentações de negócio',
      'blog-post': 'Post otimizado para blogs e conteúdo web',
      'product-description': 'Descrição comercial de produtos e serviços'
    };
    return descriptions[name] || 'Template personalizado';
  }

  getTemplateIcon(name) {
    const icons = {
      'modern-ebook': '📖',
      'business-report': '📊',
      'academic-paper': '🎓',
      'creative-story': '✨',
      'technical-manual': '🔧',
      'newsletter': '📰',
      'resume-cv': '👔',
      'presentation-outline': '📋',
      'blog-post': '✍️',
      'product-description': '🛍️'
    };
    return icons[name] || '📄';
  }
}

module.exports = new TemplateService();
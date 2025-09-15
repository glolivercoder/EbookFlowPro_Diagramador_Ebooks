# 📚 EbookFlow Pro - Plataforma de Diagramação Automática

## 🎯 Visão Geral
Uma plataforma moderna para criação automática de eBooks e apresentações com diagramação profissional, utilizando IA para estruturação de conteúdo e geração de elementos visuais.

## 🏗️ Arquitetura do Sistema

```ascii
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Tailwind)              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │   Editor    │  │   Template   │  │    Preview &        │ │
│  │   Panel     │  │   Sidebar    │  │    Export Panel     │ │
│  │             │  │              │  │                     │ │
│  │ • Text Edit │  │ • Drag&Drop  │  │ • Live Preview      │ │
│  │ • Markdown  │  │ • Templates  │  │ • Export Options    │ │
│  │ • AI Assist │  │ • Elements   │  │ • Format Selection  │ │
│  └─────────────┘  └──────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API (Node.js/Express)            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   AI Router     │  │  Content AI     │  │ Image Gen AI │ │
│  │  (OpenRouter)   │  │   (Gemini)      │  │  (OpenAI)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                              │                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Processing Pipeline                        │ │
│  │  Text → LLM → Structure → Pandoc → Template → Output   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONVERSION ENGINE                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Pandoc    │  │   LaTeX     │  │    Template         │ │
│  │   Core      │  │  Templates  │  │    System           │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Output Generators                          │ │
│  │  • PDF (eBook) • EPUB • HTML • Reveal.js Slides       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Desenvolvimento - Checklist Completo

### 📋 Fase 1: Infraestrutura Base
- [ ] **Backend Setup**
  - [ ] Configurar servidor Node.js/Express
  - [ ] Implementar sistema de autenticação JWT
  - [ ] Configurar base de dados (MongoDB/PostgreSQL)
  - [ ] Setup de ambiente Docker
  - [ ] Configurar variáveis de ambiente

- [ ] **Frontend Setup**
  - [ ] Criar projeto React com TypeScript
  - [ ] Configurar Tailwind CSS
  - [ ] Implementar sistema de roteamento
  - [ ] Configurar estado global (Redux/Zustand)
  - [ ] Setup de testes (Jest + Testing Library)

### 📋 Fase 2: Core da Conversão
- [ ] **Pandoc Integration**
  - [ ] Instalar e configurar Pandoc no servidor
  - [ ] Criar wrapper Node.js para Pandoc
  - [ ] Implementar conversão Markdown → PDF
  - [ ] Implementar conversão Markdown → EPUB
  - [ ] Implementar conversão Markdown → HTML
  - [ ] Configurar templates LaTeX customizados

- [ ] **Template System**
  - [ ] Criar sistema de templates modulares
  - [ ] Implementar parser de templates
  - [ ] Criar biblioteca de templates base
  - [ ] Sistema de versionamento de templates
  - [ ] Cache de templates compilados

### 📋 Fase 3: Integração IA
- [ ] **OpenRouter Integration**
  - [ ] Configurar cliente OpenRouter API
  - [ ] Implementar roteamento inteligente de modelos
  - [ ] Sistema de fallback entre modelos
  - [ ] Cache de respostas IA
  - [ ] Monitoramento de uso e custos

- [ ] **Content AI (Gemini Flash 2.5)**
  - [ ] Configurar Google AI Studio
  - [ ] Implementar estruturação de conteúdo
  - [ ] Sistema de prompts para diferentes tipos de conteúdo
  - [ ] Validação e sanitização de output IA
  - [ ] Sistema de retry e error handling

- [ ] **Image Generation (OpenAI)**
  - [ ] Configurar OpenAI API para DALL-E
  - [ ] Implementar geração de imagens contextuais
  - [ ] Sistema de cache de imagens
  - [ ] Otimização automática de imagens
  - [ ] Integração com Canvas API

### 📋 Fase 4: Interface Usuário
- [ ] **Editor Principal**
  - [ ] Editor de texto rico com Markdown
  - [ ] Syntax highlighting
  - [ ] Auto-save funcionalidade
  - [ ] Undo/Redo system
  - [ ] Collaborative editing (opcional)

- [ ] **Sidebar Drag & Drop**
  - [ ] Componente de elementos arrastáveis
  - [ ] Sistema de drop zones
  - [ ] Preview em tempo real
  - [ ] Biblioteca de elementos (texto, imagem, gráficos)
  - [ ] Customização de propriedades

- [ ] **Template Gallery**
  - [ ] Interface de seleção de templates
  - [ ] Preview de templates
  - [ ] Categorização (Business, Academic, Creative, etc.)
  - [ ] Sistema de favoritos
  - [ ] Templates customizados do usuário

### 📋 Fase 5: Preview & Export
- [ ] **Live Preview**
  - [ ] Preview em tempo real do eBook
  - [ ] Preview de apresentações
  - [ ] Navegação por páginas/slides
  - [ ] Zoom e ferramentas de visualização
  - [ ] Modo comparativo (antes/depois)

- [ ] **Export System**
  - [ ] Export para PDF otimizado
  - [ ] Export para EPUB com metadados
  - [ ] Export para apresentação Reveal.js
  - [ ] Export para HTML standalone
  - [ ] Sistema de queue para processamento

### 📋 Fase 6: Recursos Avançados
- [ ] **Collaboration**
  - [ ] Sistema de comentários
  - [ ] Controle de versões
  - [ ] Compartilhamento de projetos
  - [ ] Permissions management

- [ ] **Analytics & Insights**
  - [ ] Métricas de uso
  - [ ] Análise de performance de templates
  - [ ] Feedback loop para IA
  - [ ] Dashboard de estatísticas

## 💻 Estrutura de Código

### Backend Structure
```
ebookflow-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── ai.controller.js
│   │   └── conversion.controller.js
│   ├── services/
│   │   ├── ai/
│   │   │   ├── openrouter.service.js
│   │   │   ├── gemini.service.js
│   │   │   └── openai.service.js
│   │   ├── conversion/
│   │   │   ├── pandoc.service.js
│   │   │   ├── template.service.js
│   │   │   └── export.service.js
│   │   └── utils/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── config/
├── templates/
│   ├── latex/
│   ├── html/
│   └── reveal-js/
└── assets/
```

### Frontend Structure
```
ebookflow-frontend/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   ├── Sidebar/
│   │   ├── Preview/
│   │   ├── Templates/
│   │   └── UI/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── utils/
│   └── styles/
├── public/
└── templates/
```

## 🔧 Exemplos de Implementação

### 1. OpenRouter Integration
```javascript
// services/ai/openrouter.service.js
class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseUrl = 'https://openrouter.ai/api/v1';
  }

  async routeContent(content, targetFormat) {
    const model = this.selectOptimalModel(targetFormat);
    
    const prompt = this.buildPrompt(content, targetFormat);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4000
        })
      });

      return await response.json();
    } catch (error) {
      throw new Error(`OpenRouter API Error: ${error.message}`);
    }
  }

  selectOptimalModel(format) {
    const modelMap = {
      'ebook': 'anthropic/claude-3.5-sonnet',
      'presentation': 'openai/gpt-4-turbo',
      'academic': 'google/gemini-pro-1.5',
      'creative': 'anthropic/claude-3-opus'
    };
    return modelMap[format] || 'anthropic/claude-3.5-sonnet';
  }
}
```

### 2. Pandoc Conversion Service
```javascript
// services/conversion/pandoc.service.js
const { exec } = require('child_process');
const path = require('path');

class PandocService {
  constructor() {
    this.templatesPath = path.join(__dirname, '../../templates');
  }

  async convertToEbook(markdown, options = {}) {
    const {
      template = 'default',
      format = 'pdf',
      title = 'Untitled',
      author = 'Unknown'
    } = options;

    const templatePath = path.join(this.templatesPath, 'latex', `${template}.tex`);
    
    const pandocCommand = [
      'pandoc',
      '--from=markdown',
      `--to=${format}`,
      `--template=${templatePath}`,
      `--metadata title="${title}"`,
      `--metadata author="${author}"`,
      '--pdf-engine=xelatex',
      '--include-in-header=header.tex',
      '--toc',
      '--number-sections',
      '-o output.pdf'
    ].join(' ');

    return new Promise((resolve, reject) => {
      exec(pandocCommand, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Pandoc conversion failed: ${error.message}`));
          return;
        }
        resolve({ success: true, output: stdout });
      });
    });
  }

  async convertToSlides(markdown, template = 'reveal') {
    const slideTemplate = path.join(this.templatesPath, 'reveal-js', `${template}.html`);
    
    const pandocCommand = [
      'pandoc',
      '--from=markdown',
      '--to=revealjs',
      `--template=${slideTemplate}`,
      '--slide-level=2',
      '--variable=theme:black',
      '--variable=transition:slide',
      '-s',
      '-o slides.html'
    ].join(' ');

    return this.executeCommand(pandocCommand);
  }
}
```

### 3. React Editor Component
```jsx
// components/Editor/MainEditor.jsx
import React, { useState, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { aiService } from '../../services/ai.service';

const MainEditor = ({ onContentChange, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const debouncedContent = useDebounce(content, 1000);

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
    onContentChange(newContent);
  }, [onContentChange]);

  const enhanceWithAI = async () => {
    if (!content.trim()) return;
    
    setIsAiProcessing(true);
    try {
      const enhanced = await aiService.enhanceContent(content, {
        type: 'structure',
        format: 'ebook'
      });
      handleContentChange(enhanced);
    } catch (error) {
      console.error('AI Enhancement failed:', error);
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
        <button
          onClick={enhanceWithAI}
          disabled={isAiProcessing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isAiProcessing && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          ✨ AI Enhance
        </button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
        placeholder="Start writing your content here... You can use Markdown formatting."
      />
      
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
          <span>Characters: {content.length}</span>
          {debouncedContent !== content && (
            <span className="text-blue-600">● Saving...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainEditor;
```

### 4. Drag & Drop Sidebar
```jsx
// components/Sidebar/TemplateSidebar.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableElement = ({ id, type, preview, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 border rounded-lg cursor-move hover:shadow-md transition-shadow bg-white"
    >
      {children}
    </div>
  );
};

const TemplateSidebar = () => {
  const elements = [
    { id: 'heading', type: 'text', name: 'Heading', icon: '📝' },
    { id: 'paragraph', type: 'text', name: 'Paragraph', icon: '📄' },
    { id: 'image', type: 'media', name: 'Image', icon: '🖼️' },
    { id: 'chart', type: 'visual', name: 'Chart', icon: '📊' },
    { id: 'quote', type: 'text', name: 'Quote', icon: '💬' },
    { id: 'divider', type: 'layout', name: 'Divider', icon: '➖' }
  ];

  const templates = [
    { id: 'business', name: 'Business Report', thumbnail: '/templates/business.png' },
    { id: 'academic', name: 'Academic Paper', thumbnail: '/templates/academic.png' },
    { id: 'creative', name: 'Creative Story', thumbnail: '/templates/creative.png' },
    { id: 'technical', name: 'Technical Manual', thumbnail: '/templates/technical.png' }
  ];

  return (
    <div className="w-80 bg-gray-50 border-r h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Templates</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="relative group cursor-pointer"
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all">
                <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-medium">Use Template</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate">{template.name}</p>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-gray-900 mb-4">Elements</h3>
        <div className="space-y-3">
          {elements.map((element) => (
            <DraggableElement
              key={element.id}
              id={element.id}
              type={element.type}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{element.icon}</span>
                <span className="text-sm font-medium">{element.name}</span>
              </div>
            </DraggableElement>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">AI Tools</h3>
          <div className="space-y-2">
            <button className="w-full p-3 text-left bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span className="text-sm font-medium">Generate Images</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <div className="flex items-center gap-2">
                <span>✍️</span>
                <span className="text-sm font-medium">Improve Content</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
              <div className="flex items-center gap-2">
                <span>🎨</span>
                <span className="text-sm font-medium">Suggest Layout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSidebar;
```

### 5. LaTeX Template Example
```latex
% templates/latex/modern-ebook.tex
\documentclass[11pt,a4paper]{book}

% Packages
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{microtype}
\usepackage{graphicx}
\usepackage{xcolor}
\usepackage{tikz}
\usepackage{geometry}
\usepackage{fancyhdr}
\usepackage{titlesec}
\usepackage{tcolorbox}
\usepackage{hyperref}

% Geometry
\geometry{
  top=2.5cm,
  bottom=2.5cm,
  left=3cm,
  right=3cm,
  marginparwidth=2cm,
  marginparsep=0.5cm
}

% Colors
\definecolor{primary}{RGB}{59, 130, 246}
\definecolor{secondary}{RGB}{99, 102, 241}
\definecolor{accent}{RGB}{236, 254, 255}

% Title formatting
\titleformat{\chapter}[display]
{\normalfont\huge\bfseries\color{primary}}
{\tikz\node[circle,fill=primary,text=white,font=\Large] {\thechapter};}{20pt}{\Huge}

\titleformat{\section}
{\normalfont\Large\bfseries\color{secondary}}
{\thesection}{1em}{}

% Header and footer
\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\textcolor{primary}{\thepage}}
\fancyhead[LO]{\textcolor{secondary}{\rightmark}}
\fancyhead[RE]{\textcolor{secondary}{\leftmark}}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\headrule}{\hbox to\headwidth{\color{primary}\leaders\hrule height \headrulewidth\hfill}}

% Custom boxes
\newtcolorbox{infobox}{
  colback=accent,
  colframe=primary,
  boxrule=1pt,
  arc=3pt,
  left=10pt,
  right=10pt,
  top=10pt,
  bottom=10pt
}

% Metadata
\title{$title$}
\author{$author$}
\date{$date$}

\begin{document}

% Title page
\begin{titlepage}
  \centering
  \vspace*{2cm}
  
  \tikz\node[rectangle,fill=primary,text=white,font=\huge\bfseries,minimum width=10cm,minimum height=2cm] {$title$};
  
  \vspace{2cm}
  
  {\LARGE\textcolor{secondary}{$author$}}
  
  \vspace{1cm}
  
  {\large\textcolor{gray}{$date$}}
  
  \vfill
  
  \tikz\draw[primary,thick] (0,0) -- (10,0);
  
\end{titlepage}

% Table of contents
\tableofcontents
\cleardoublepage

% Content
$body$

\end{document}
```

## 🔍 Prompts para IA

### Prompt para Estruturação de Conteúdo (Gemini Flash 2.5)
```
Você é um especialista em estruturação de conteúdo para eBooks e apresentações profissionais.

CONTEXTO: O usuário forneceu o seguinte texto bruto que precisa ser transformado em um eBook bem estruturado:

[CONTEÚDO_ORIGINAL]

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
```yaml
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
```

Processe o conteúdo e retorne a estrutura otimizada.
```

### Prompt para Geração de Imagens (OpenAI DALL-E)
```
Gere uma imagem profissional para um eBook sobre [TÓPICO].

Estilo: Moderno, minimalista, com cores harmoniosas
Contexto: Esta imagem será usada como [capa/ilustração/diagrama]
Especificações:
- Resolução: 1024x1024 (ou 1792x1024 para landscape)
- Estilo visual: Clean, profissional, adequado para publicação
- Cores: Paleta consistente com design editorial moderno
- Elementos: [descrever elementos específicos necessários]

A imagem deve ser adequada para impressão e visualização digital, com alta qualidade e sem texto sobreposto (exceto se especificamente solicitado).
```

## 🎨 UI/UX Mockup (ASCII)

```ascii
┌─────────────────────────────────────────────────────────────────────────────────┐
│ EbookFlow Pro                                    👤 User  🔔  ⚙️  📤 Export     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ ┌───────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────┐ │
│ │   TEMPLATES   │  │         EDITOR               │  │        PREVIEW          │ │
│ │               │  │                             │  │                         │ │
│ │ 📄 Business   │  │  # My eBook Title          │  │ ┌─────────────────────┐ │ │
│ │ 🎓 Academic   │  │                             │  │ │                     │ │ │
│ │ 🎨 Creative   │  │  ## Chapter 1: Introduction │  │ │    My eBook Title   │ │ │
│ │ 🔧 Technical  │  │  Lorem ipsum dolor sit...   │  │ │                     │ │ │
│ │               │  │                             │  │ │  Chapter 1: Intro   │ │ │
│ │   ELEMENTS    │  │  [IMAGEM: book cover]       │  │ │  Lorem ipsum...     │ │ │
│ │               │  │                             │  │ │                     │ │ │
│ │ 📝 Heading    │  │  ## Chapter 2: Content      │  │ │  [Generated Image]  │ │ │
│ │ 📄 Paragraph  │  │                             │  │ │                     │ │ │
│ │ 🖼️  Image     │  │  **Important note:** This   │  │ │  Chapter 2: Content │ │ │
│ │ 📊 Chart      │  │  is a key concept...        │  │ │                     │ │ │
│ │ 💬 Quote      │  │                             │  │ └─────────────────────┘ │ │
│ │ ➖ Divider    │  │  ✨ AI ENHANCE  💾 SAVE     │  │                         │ │
│ │               │  │                             │  │ 📖 eBook  📊 Slides    │ │
│ │   AI TOOLS    │  │                             │  │                         │ │
│ │               │  └─────────────────────────────┘  └─────────────────────────┘ │
│ │ 🤖 Gen Images │                                                               │
│ │ ✍️  Improve   │                                                               │
│ │ 🎨 Layout     │                                                               │
│ └───────────────┘                                                               │
│                                                                                 │
│ Status: ● Ready to export | Words: 1,247 | AI Credits: 95 remaining            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Configuração de Desenvolvimento

### Environment Variables
```env
# AI Services
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_gemini_key

# Database
DATABASE_URL=mongodb://localhost:27017/ebookflow
REDIS_URL=redis://localhost:6379

# Application
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000

# File Storage
UPLOAD_
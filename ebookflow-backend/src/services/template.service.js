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
      'creative-story': '1.0.0'
    };
  }

  // Load and parse template
  async loadTemplate(templateName, version = 'latest') {
    const cacheKey = `${templateName}-${version}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
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
    const cached = { content: parsedTemplate, version, parsedAt: new Date() };
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
}

module.exports = new TemplateService();
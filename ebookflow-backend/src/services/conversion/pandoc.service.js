const { exec } = require('child_process');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

class PandocService {
  constructor() {
    this.templatesPath = path.join(__dirname, '../../templates');
  }

  async convertToPDF(markdownContent, options = {}) {
    const {
      template = 'default',
      title = 'Untitled',
      author = 'Unknown',
      outputPath = 'output.pdf'
    } = options;

    const templatePath = path.join(this.templatesPath, 'latex', `${template}.tex`);
    
    const pandocCommand = [
      'pandoc',
      '-f', 'markdown',
      '-t', 'pdf',
      '--template', templatePath,
      '--metadata', `title="${title}"`,
      '--metadata', `author="${author}"`,
      '--pdf-engine', 'xelatex',
      '--toc',
      '--number-sections',
      '-o', outputPath
    ].join(' ');

    return this.executeCommand(pandocCommand, markdownContent);
  }

  async convertToEPUB(markdownContent, options = {}) {
    const {
      title = 'Untitled',
      author = 'Unknown',
      outputPath = 'output.epub'
    } = options;

    const pandocCommand = [
      'pandoc',
      '-f', 'markdown',
      '-t', 'epub3',
      '--metadata', `title="${title}"`,
      '--metadata', `author="${author}"`,
      '--toc',
      '-o', outputPath
    ].join(' ');

    return this.executeCommand(pandocCommand, markdownContent);
  }

  async convertToHTML(markdownContent, options = {}) {
    const {
      template = 'default',
      title = 'Untitled',
      outputPath = 'output.html'
    } = options;

    const templatePath = path.join(this.templatesPath, 'html', `${template}.html`);
    
    const pandocCommand = [
      'pandoc',
      '-f', 'markdown',
      '-t', 'html',
      '--template', templatePath,
      '--metadata', `title="${title}"`,
      '--standalone',
      '-o', outputPath
    ].join(' ');

    return this.executeCommand(pandocCommand, markdownContent);
  }

  async convertToSlides(markdownContent, options = {}) {
    const {
      template = 'reveal',
      outputPath = 'slides.html'
    } = options;

    const templatePath = path.join(this.templatesPath, 'reveal-js', `${template}.html`);
    
    const pandocCommand = [
      'pandoc',
      '-f', 'markdown',
      '-t', 'revealjs',
      '--template', templatePath,
      '--slide-level', '2',
      '--variable', 'theme:black',
      '--variable', 'transition:slide',
      '--standalone',
      '-o', outputPath
    ].join(' ');

    return this.executeCommand(pandocCommand, markdownContent);
  }

  async executeCommand(command, inputContent = '') {
    const { stdin, stdout, stderr } = await execPromise(command, { 
      encoding: 'utf8',
      input: inputContent
    });

    if (stderr) {
      console.warn('Pandoc stderr:', stderr);
    }

    return { success: true, stdout, stderr };
  }

  // Method to write input to temp file if needed for large content
  async convertFromFile(inputPath, outputPath, format = 'pdf', options = {}) {
    const command = [
      'pandoc',
      inputPath,
      '-o', outputPath,
      '-t', format
    ].concat(Object.entries(options).flatMap(([key, value]) => ['--' + key.replace(/_/g, '-'), value]));

    return this.executeCommand(command.join(' '));
  }
}

module.exports = new PandocService();
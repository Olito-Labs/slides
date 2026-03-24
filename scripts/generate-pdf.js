#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { readdir, writeFile, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join, basename, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_PDF_OPTIONS = {
  width: '1920px',
  height: '1080px',
  printBackground: true,
  preferCSSPageSize: false,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    input: null,
    output: null,
    order: null,
    individual: false,
    width: 1920,
    height: 1080,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--input':
      case '-i':
        config.input = args[++i];
        break;
      case '--output':
      case '-o':
        config.output = args[++i];
        break;
      case '--order':
        config.order = args[++i]?.split(',').map(s => s.trim());
        break;
      case '--individual':
        config.individual = true;
        break;
      case '--width':
        config.width = parseInt(args[++i], 10);
        break;
      case '--height':
        config.height = parseInt(args[++i], 10);
        break;
      case '--help':
      case '-h':
        config.help = true;
        break;
      default:
        if (!config.input && arg.endsWith('.html')) {
          config.input = arg;
        }
    }
  }

  return config;
}

function printHelp() {
  console.log(`
Slides PDF Generator — Generate PDFs from HTML presentations

USAGE:
  node generate-pdf.js [options]

OPTIONS:
  -i, --input <path>     Input HTML file or directory containing slides
  -o, --output <path>    Output PDF file or directory (for --individual)
  --order <files>        Comma-separated list of HTML files in order
  --individual           Generate separate PDFs for each slide
  --width <px>           Slide width in pixels (default: 1920)
  --height <px>          Slide height in pixels (default: 1080)
  -h, --help             Show this help message

EXAMPLES:
  # Combined deck from directory
  node generate-pdf.js -i ./slides -o deck.pdf --order cover.html,intro.html,main.html

  # Single slide
  node generate-pdf.js -i slide.html -o slide.pdf

  # Individual PDFs
  node generate-pdf.js -i ./slides -o ./pdfs --individual
`);
}

async function isDirectory(path) {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function findHtmlFiles(dir) {
  const files = await readdir(dir);
  return files
    .filter(f => f.endsWith('.html') && !f.includes('complete-'))
    .sort();
}

async function generatePDF(config) {
  const { input, output, order, individual, width, height } = config;

  if (!input) {
    console.error('Error: --input is required');
    process.exit(1);
  }

  const inputPath = resolve(input);
  const isDir = await isDirectory(inputPath);

  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--force-color-profile=srgb',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.emulateMediaType('screen');

    const pdfOptions = {
      ...DEFAULT_PDF_OPTIONS,
      width: `${width}px`,
      height: `${height}px`,
    };

    if (isDir) {
      let htmlFiles = order || await findHtmlFiles(inputPath);

      if (individual) {
        const outputDir = output ? resolve(output) : inputPath;
        for (const file of htmlFiles) {
          const filePath = join(inputPath, file);
          const outputPath = join(outputDir, file.replace('.html', '.pdf'));
          console.log(`Generating: ${file}`);
          await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
          await page.pdf({ ...pdfOptions, path: outputPath });
          console.log(`  -> ${outputPath}`);
        }
      } else {
        const outputPath = output ? resolve(output) : join(inputPath, 'deck.pdf');
        const mergedPdf = await PDFDocument.create();

        for (const file of htmlFiles) {
          const filePath = join(inputPath, file);
          console.log(`Processing: ${file}`);
          await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
          await new Promise(r => setTimeout(r, 200));
          const pdfBytes = await page.pdf(pdfOptions);
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [0]);
          mergedPdf.addPage(copiedPage);
        }

        const mergedPdfBytes = await mergedPdf.save();
        await writeFile(outputPath, mergedPdfBytes);
        console.log(`\nCombined PDF saved to:\n  ${outputPath}`);
      }
    } else {
      const outputPath = output
        ? resolve(output)
        : inputPath.replace('.html', '.pdf');

      console.log(`Generating: ${basename(inputPath)}`);
      await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' });
      await page.pdf({ ...pdfOptions, path: outputPath });
      console.log(`  -> ${outputPath}`);
    }

    console.log('Done!');
  } finally {
    await browser.close();
  }
}

export { generatePDF };

const config = parseArgs();

if (config.help) {
  printHelp();
  process.exit(0);
}

generatePDF(config).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

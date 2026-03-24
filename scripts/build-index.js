#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const splitDir = path.join(root, 'templates', 'index-split');
const outputFile = path.join(root, 'templates', 'index.html');

const parts = [
  'index-head.html',
  'index-body-main.html',
  'index-script-main.html',
  'index-body-modals.html',
  'index-script-extras.html',
  'index-tail.html',
];

function readPart(file) {
  const filePath = path.join(splitDir, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing split part: templates/index-split/${file}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function buildHtml() {
  const html = parts.map(readPart).join('');
  return html.endsWith('\n') ? html : `${html}\n`;
}

function main() {
  const mode = process.argv.includes('--check') ? 'check' : 'write';
  const html = buildHtml();

  if (mode === 'check') {
    if (!fs.existsSync(outputFile)) {
      console.error('templates/index.html does not exist. Run npm run build:index first.');
      process.exit(1);
    }
    const current = fs.readFileSync(outputFile, 'utf8');
    if (current !== html) {
      console.error('templates/index.html is out of date. Run: npm run build:index');
      process.exit(1);
    }
    console.log('templates/index.html is up to date.');
    return;
  }

  fs.writeFileSync(outputFile, html);
  console.log(`Built ${path.relative(root, outputFile)} from ${parts.length} split files.`);
}

main();

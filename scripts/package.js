#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const outputName = `visual-excellence-v${pkg.version}`;

// Clean and create dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Files and directories to include in the package
const includes = [
  'index.html',
  'README.md',
  'css',
  'js',
  'pages',
  'assets',
  'package.json'
];

// Copy files to a staging directory inside dist
const stagingDir = path.join(distDir, outputName);
fs.mkdirSync(stagingDir, { recursive: true });

for (const item of includes) {
  const src = path.join(root, item);
  if (!fs.existsSync(src)) continue;

  const dest = path.join(stagingDir, item);
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    copyDirSync(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Create zip archive
const zipFile = `${outputName}.zip`;
try {
  execSync(`cd "${distDir}" && zip -r "${zipFile}" "${outputName}"`, { stdio: 'inherit' });
  console.log(`\nPackage created: dist/${zipFile}`);
} catch {
  // Fallback to tar if zip is not available
  const tarFile = `${outputName}.tar.gz`;
  execSync(`cd "${distDir}" && tar -czf "${tarFile}" "${outputName}"`, { stdio: 'inherit' });
  console.log(`\nPackage created: dist/${tarFile}`);
}

// Print summary
const files = listFiles(stagingDir);
console.log(`\nVisual Excellence v${pkg.version}`);
console.log(`Files included: ${files.length}`);
files.forEach(f => console.log(`  ${path.relative(stagingDir, f)}`));

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function listFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      results.push(...listFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname: string = dirname(fileURLToPath(import.meta.url));
const CV_DIR: string = resolve(__dirname, '../../public/cv');
const SRC: string = resolve(CV_DIR, 'Christopher Smith - CV.md');
const OUT: string = resolve(CV_DIR, 'Christopher Smith - CV.html');

const markdown: string = readFileSync(SRC, 'utf-8');
const bodyHtml: string = marked.parse(markdown) as string;

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chris Smith - CV</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: Inter, system-ui, -apple-system, sans-serif;
      max-width: 760px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
      line-height: 1.65;
      color: #1a1a1a;
      background: #ffffff;
    }
    h1, h2, h3 { font-family: 'Poppins', sans-serif; line-height: 1.3; }
    h1 { font-size: 2rem; margin-bottom: 0.25rem; }
    h2 { font-size: 1.35rem; margin-top: 2rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.35rem; }
    a { color: #516856; }
    code { background: #f2f2f2; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.9em; }
    pre { background: #f2f2f2; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    ul { padding-left: 1.25rem; }
    @media print {
      body { max-width: none; }
    }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>
`;

writeFileSync(OUT, page, 'utf-8');
console.log(`✓ Wrote ${OUT}`);
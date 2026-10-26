// 회사 소개 페이지에 실제로 쓰인 글자만 남긴 Pretendard 가변 글꼴 하나를 만든다
// 글꼴 조각 여러 개를 받는 대신 한 파일만 받게 해 느린 모바일 회선에서도 첫 화면이 빨리 뜬다.
// 사용법: cd tools && npm install && node build-font.mjs   (build-about.mjs로 페이지를 만든 뒤 실행)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const TOOLS = dirname(fileURLToPath(import.meta.url));
const ROOT = join(TOOLS, '..');
const SRC = join(TOOLS, 'node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2');

// build-about.mjs가 만드는 페이지들
const pages = ['index.html', 'service/index.html', 'news/index.html', 'company/index.html',
  ...readdirSync(join(ROOT, 'news'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => `news/${d.name}/index.html`)]
  .filter(p => existsSync(join(ROOT, p)));

// 화면에 보이는 글자: 스크립트·스타일·SVG·태그를 걷어낸 본문 + 기본 라틴 문자
const chars = new Set();
for (let c = 0x20; c < 0x7f; c++) chars.add(String.fromCharCode(c));
for (const p of pages) {
  const text = readFileSync(join(ROOT, p), 'utf8')
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  for (const ch of text) if (ch.codePointAt(0) > 0x20) chars.add(ch);
}
const list = [...chars].sort().join('');

const out = await subsetFont(readFileSync(SRC), list, { targetFormat: 'woff2' });
writeFileSync(join(ROOT, 'assets/fonts/pretendard-jm.woff2'), out);
writeFileSync(join(ROOT, 'assets/fonts/pretendard-jm.chars.txt'), list, 'utf8');
console.log('pages', pages.length, 'chars', [...list].length, 'woff2', out.length, 'bytes');

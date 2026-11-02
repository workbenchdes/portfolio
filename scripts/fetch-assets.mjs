import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://www.duingzforge.site/kit/portfolio/';
const dataFiles = [
  ['Asset/data/projects.json', 'src/data/projects.json'],
  ['Asset/data/brands.json', 'src/data/brands.json'],
];
const assets = [
  'Asset/cv/Renando_Editor_VFX.pdf.pdf',
  'Asset/img/SERTIFIKAT/dalang.jpg',
  'Asset/img/SERTIFIKAT/juara2.jpg',
  'Asset/img/SERTIFIKAT/mindplace2.jpg',
  'Asset/img/SERTIFIKAT/peringkat2.jpg',
  'Asset/img/SERTIFIKAT/shortmovie.jpeg',
  'Asset/img/SERTIFIKAT/videolabs.jpg',
  'Asset/img/favicon.svg',
  'Asset/img/gwe.jpeg',
  'Asset/img/renando-portrait.png',
  'Asset/svg/CUI.svg',
  'Asset/svg/EBS.svg',
  'Asset/svg/EG.svg',
  'Asset/svg/PF.svg',
  'Asset/svg/SB.svg',
  'Asset/svg/SD.svg',
  'Asset/svg/UE.svg',
  'Asset/svg/ae.svg',
  'Asset/svg/ai.svg',
  'Asset/svg/am.svg',
  'Asset/svg/bl.svg',
  'Asset/svg/brand/Extrajoss.png',
  'Asset/svg/brand/Netflix.svg',
  'Asset/svg/brand/SevenDragon.png',
  'Asset/svg/brand/Whatsin.png',
  'Asset/svg/brand/diskominfo.png',
  'Asset/svg/brand/dpmptsp.png',
  'Asset/svg/brand/hara.png',
  'Asset/svg/brand/jeta.png',
  'Asset/svg/brand/logogatsu.png',
  'Asset/svg/brand/magma.png',
  'Asset/svg/brand/mbc.png',
  'Asset/svg/brand/pemda.png',
  'Asset/svg/brand/raincreation.png',
  'Asset/svg/brand/seven.png',
  'Asset/svg/brand/sma1seragen.png',
  'Asset/svg/brand/sma2indramayu.png',
  'Asset/svg/brand/unwir.png',
  'Asset/svg/brand/vianos.png',
  'Asset/svg/cc.svg',
  'Asset/svg/cv.svg',
  'Asset/svg/cx.svg',
  'Asset/svg/ibis.svg',
  'Asset/svg/is.svg',
  'Asset/svg/km.svg',
  'Asset/svg/lr.svg',
  'Asset/svg/lrc.svg',
  'Asset/svg/pa.svg',
  'Asset/svg/pl.svg',
  'Asset/svg/pr.svg',
  'Asset/svg/ps.svg',
  'Asset/svg/vn.svg',
  'Asset/svg/vs.svg',
  'Asset/svg/vsco.svg',
];
const tasks = [
  ...dataFiles.map(([remote, local]) => ({ remote, local })),
  ...assets.map(remote => ({ remote, local: remote })),
];
let failed = 0;
let cursor = 0;
async function worker() {
  while (cursor < tasks.length) {
    const task = tasks[cursor++];
    try {
      const response = await fetch(new URL(task.remote, base));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      const destination = path.join(root, task.local);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, bytes);
      console.log(`OK   ${task.local} (${bytes.byteLength.toLocaleString()} bytes)`);
    } catch (error) {
      failed++;
      console.error(`FAIL ${task.remote}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 5 }, () => worker()));
console.log(`Finished: ${tasks.length - failed}/${tasks.length} files retrieved.`);
if (failed) process.exitCode = 1;

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const project=JSON.parse(fs.readFileSync(path.join(root,'src/generated/current-project.json'),'utf8'));
const slug=String(project.slug||'video').replace(/[^a-zA-Z0-9_-]/g,'-');
const target=path.join(root,'output',`${slug}.mp4`);
fs.mkdirSync(path.dirname(target),{recursive:true});
const cmd=process.platform==='win32'?'npx.cmd':'npx';
const args=['remotion','render','src/index.ts','EditorialVideo',target,'--codec=h264'];
console.log('Xuất video:',target);
const run=spawnSync(cmd,args,{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
if(run.error){console.error(run.error.message);process.exit(1)}
if(run.status!==0)process.exit(run.status||1);
if(!fs.existsSync(target)||fs.statSync(target).size<1000){console.error('Không tìm thấy video xuất hợp lệ');process.exit(1)}
console.log('THÀNH CÔNG:',target);

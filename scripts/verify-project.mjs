import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd();
const p=JSON.parse(fs.readFileSync(path.resolve(root,'src/generated/current-project.json'),'utf8'));
const fail=s=>{console.error('LỖI:',s);process.exitCode=1;};
if(p.fps!==30||p.width!==1080||p.height!==1920)fail('Thông số video không phải 1080x1920 30fps');
if(!p.captions?.length)fail('Chưa có captions');
if(!p.scenes?.length)fail('Chưa có scenes');
const valid=[
  'cover','photo-story','photo-stack','timeline','comparison','statistic','ending',
  'illustrated-hook','illustrated-progress','illustrated-compare','illustrated-features',
  'illustrated-arrow-flow','illustrated-bar-chart','illustrated-decision-fork','illustrated-verdict',
  'cyber-hook','cyber-fake-chat','cyber-anatomy','cyber-red-flags','cyber-compare','cyber-loss-stat','cyber-shield-defense','cyber-hotline'
];
let end=0;
for(const s of p.scenes??[]){
 if(!valid.includes(s.type))fail(`Scene ${s.id}: type không hợp lệ`);
 if(s.startFrame!==end)fail(`Scene ${s.id}: timeline hở/chồng tại frame ${end}`);
 if(s.durationFrames<1)fail(`Scene ${s.id}: duration không hợp lệ`);
 end=s.startFrame+s.durationFrames;
 for(const x of s.images??[])if(!fs.existsSync(path.resolve(root,'public',x)))fail('Thiếu ảnh: '+x);
}
if(end!==p.durationInFrames)fail(`Scene kết thúc frame ${end}, duration tổng ${p.durationInFrames}`);
if(p.audioPath){
 const full=path.resolve(root,'public',p.audioPath);
 if(!fs.existsSync(full))fail('Thiếu audio: '+p.audioPath);
 else try{
   const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','json',full],{encoding:'utf8'}));
   const audioMs=1000*Number(info.format?.duration);
   const cueMs=p.captions.at(-1).endMs;
   if(Number.isFinite(audioMs) && Math.abs(audioMs-cueMs)>500)console.warn('CẢNH BÁO: Audio và SRT lệch '+(Math.abs(audioMs-cueMs)/1000).toFixed(2)+' giây. Hãy kiểm tra trước khi render.');
 }catch(e){ console.warn('Chưa thể kiểm tra thời lượng audio bằng ffprobe: '+e.message);}
}
for(const c of p.captions??[])if(!(c.startMs>=0&&c.endMs>c.startMs))fail('Caption bị lỗi timestamp');
if(!process.exitCode)console.log('OK: Dữ liệu, timeline và tài nguyên đã kiểm tra (chưa kiểm chứng kích thước hình, audio/SRT và render).');

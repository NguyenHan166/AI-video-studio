#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv=process.argv.slice(2);
const flag=(name, fallback=null)=>{const i=argv.indexOf('--'+name);return i<0?fallback:(argv[i+1]??fallback)};
if(argv.includes('--help')||argv.includes('-h')) {
 console.log('node scripts/prepare-project.mjs --topic "..." --srt input/voice.srt [--audio input/voice.mp3] [--assets input/assets] [--slug ten-video]'); process.exit(0);
}
const topic=flag('topic','Video tư liệu');
const template=flag('template','vintage-editorial');
const slug=flag('slug','project-'+new Date().toISOString().slice(0,10)).replace(/[^a-zA-Z0-9_-]/g,'-');
const srtPath=path.resolve(root,flag('srt','input/demo.srt'));
const audioArg=flag('audio');
const assetsArg=flag('assets','input/assets');
if (!fs.existsSync(srtPath)) throw new Error('Không tìm thấy SRT: '+srtPath);
const raw=fs.readFileSync(srtPath,'utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').replace(/\r/g,'\n').trim();
const parseTime=s=>{const m=s.trim().match(/^(\d{2,}):(\d{2}):(\d{2})[,.](\d{3})$/);if(!m||Number(m[2])>59||Number(m[3])>59)throw Error('Timestamp không hợp lệ: '+s);return ((Number(m[1])*3600+Number(m[2])*60+Number(m[3]))*1000)+Number(m[4]);};
const captions=[];
for(const block of raw.split(/\n\s*\n/)) {
 const lines=block.split('\n').map(x=>x.trim()).filter(Boolean);
 const timeIndex=lines.findIndex(x=>x.includes('-->'));
 if(timeIndex<0) throw new Error('Khối SRT không có --> : '+block);
 const m=lines[timeIndex].match(/^(.+?)\s*-->\s*(\d{2,}:\d{2}:\d{2}[,.]\d{3})/);
 if(!m) throw new Error('Dòng thời gian sai: '+lines[timeIndex]);
 const startMs=parseTime(m[1]);const endMs=parseTime(m[2]);
 if(endMs<=startMs) throw Error('Cue kết thúc trước khi bắt đầu');
 const text=lines.slice(timeIndex+1).join(' ').replace(/<[^>]*>/g,'').trim();
 if(!text) throw Error('Cue không có lời thoại');
 captions.push({startMs,endMs,text});
}
if(!captions.length) throw new Error('SRT không có cue');
for(let i=1;i<captions.length;i++)if(captions[i].startMs<captions[i-1].startMs)throw Error('Thứ tự SRT không tăng dần');
const fps=30, durationInFrames=Math.ceil(captions.at(-1).endMs*fps/1000);
const mediaDir=path.resolve(root,'public','media',slug);
fs.mkdirSync(mediaDir,{recursive:true});
const copyFile=(source)=>{
 const full=path.resolve(root,source);
 if(!fs.existsSync(full))throw new Error('Không tìm thấy tài nguyên: '+full);
 const dest=path.join(mediaDir,path.basename(full));
 fs.copyFileSync(full,dest);
 return `media/${slug}/${path.basename(full)}`;
};
const audioPath=audioArg?copyFile(audioArg):null;
const assetDir=path.resolve(root,assetsArg);let images=[];
if(fs.existsSync(assetDir)) images=fs.readdirSync(assetDir).filter(x=>/\.(png|jpg|jpeg|webp)$/i.test(x)).sort().map(x=>copyFile(path.join(assetDir,x)));
// Simple deterministic fallback. The agent should review/edit the resulting storyboard.
// A visual scene can span multiple subtitle cues. Boundaries are on exact caption starts/ends.
const beats=[];let group=[];
for(const c of captions){
 if(group.length && c.endMs-group[0].startMs>7500){beats.push(group);group=[]}
 group.push(c);
}if(group.length) beats.push(group);
const kinds=['cover','photo-story','timeline','photo-stack','comparison','statistic','ending'];
const scenes=beats.map((beat,i)=>{
 const startMs=beat[0].startMs;
 const endMs=i<beats.length-1?beats[i+1][0].startMs:captions.at(-1).endMs;
 const startFrame=Math.round(startMs*fps/1000);
 const nextFrame=i===beats.length-1?durationInFrames:Math.round(endMs*fps/1000);
 const title=i===0?topic:beat.map(c=>c.text).join(' ').slice(0,55);
 const sceneKind=i===0?'cover':i===beats.length-1?'ending':kinds[Math.min(i,kinds.length-2)];
 return {id:'scene-'+String(i+1).padStart(2,'0'),type:sceneKind,title,subtitle:topic,
   startFrame,durationFrames:Math.max(1,nextFrame-startFrame),images:images.length?[images[i%images.length],images[(i+1)%images.length]]:[],
   items:beat.map(c=>c.text).slice(0,4)};
});
if(scenes[0].startFrame>0){scenes[0].durationFrames+=scenes[0].startFrame;scenes[0].startFrame=0;}
const project={version:1,slug,topic,template,fps,width:1080,height:1920,durationInFrames,audioPath,captions,scenes};
const out=path.resolve(root,'src/generated/current-project.json');
fs.writeFileSync(out,JSON.stringify(project,null,2)+'\n','utf8');
fs.writeFileSync(path.resolve(root,'output',`${slug}-storyboard.json`),JSON.stringify(project,null,2)+'\n','utf8');
console.log(`Đã tạo storyboard: ${scenes.length} cảnh; ${captions.length} câu SRT; ${(durationInFrames/fps).toFixed(2)}s`);
console.log('File:',out);
console.log('Lưu ý: Đây là storyboard khởi tạo theo quy tắc. Yêu cầu Agent biên tập lại scene cho hợp nội dung.');
if(!audioPath) console.warn('CHƯA CÓ AUDIO: video sẽ không có tiếng đọc.');

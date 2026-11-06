// Validate Gemini proposals in memory. Never modifies game data or generated packs.
const fs=require('node:fs');
const {loadData}=require('./load');
const {validate}=require('./validate');
const E=require('../engine');
function checkDraft(draft,base=loadData()){
 const errors=[];
 if(!draft||Array.isArray(draft)||typeof draft!=='object')return ['Gốc JSON phải là {origins:[],events:[]}.'];
 for(const key of Object.keys(draft))if(!['origins','events'].includes(key))errors.push(`Trường gốc chưa hỗ trợ: ${key}`);
 for(const key of ['origins','events'])if(!Array.isArray(draft[key]))errors.push(`${key} phải là mảng.`);
 if(errors.length)return errors;
 const data={...base,origins:[...base.origins,...draft.origins],events:[...base.events,...draft.events]};
 errors.push(...validate(data));
 const seen=new Set([...base.origins,...base.events].map(x=>x.id));
 const flags=new Set();
 function visit(x,cb){if(!x||typeof x!=='object')return;cb(x);for(const v of Object.values(x))if(v&&typeof v==='object')visit(v,cb);}
 visit([...base.events,...base.origins,...base.quests],x=>{for(const f of x.effects?.flags||[])flags.add(f);});
 visit(draft,x=>{for(const f of x.effects?.flags||[])flags.add(f);});
 for(const item of [...draft.origins,...draft.events]){if(seen.has(item.id))errors.push(`${item.id}: ID đã tồn tại.`);seen.add(item.id);if(!item.races?.length)errors.push(`${item.id}: cần races tường minh.`);}
 for(const e of draft.events){
  if(e.pack!==true)errors.push(`${e.id}: cần pack:true để không bị pack độc quyền loại bỏ.`);
  if(!Array.isArray(e.choices)||e.choices.length<2||e.choices.length>4)errors.push(`${e.id}: cần 2–4 lựa chọn.`);
  if(e.effects||e.death)errors.push(`${e.id}: không đặt hậu quả/lời chết trước khi người chơi chọn.`);
  if(e.once===false&&!(e.cooldownYears>0))errors.push(`${e.id}: sự kiện lặp cần cooldownYears > 0.`);
  for(const raceId of e.races||[]){const race=base.races.find(r=>r.id===raceId);if(!race)continue;const stages=E.stagesOf(race);if(e.stages?.length&&!e.stages.some(id=>{const i=stages.findIndex(s=>s.id===id);return i>=0&&(e.maxAge??Infinity)>=stages[i].start&&(e.minAge??0)<(stages[i+1]?.start??Infinity);} ))errors.push(`${e.id}: khoảng tuổi không giao giai đoạn của ${raceId}.`);}
  visit(e,x=>{
   for(const key of ['flags','anyFlags'])for(const f of x.require?.[key]||[])if(f.startsWith('gm_')&&!flags.has(f))errors.push(`${e.id}: cờ ${f} không có nguồn cấp.`);
   if(x.label){if(x.check&&(!x.success?.text||!x.fail?.text))errors.push(`${e.id}: check cần success.text và fail.text.`);if(!x.check&&!x.text)errors.push(`${e.id}: lựa chọn thường cần text kết quả.`);}
  });
 }
 return [...new Set(errors)];
}
module.exports={checkDraft};
if(require.main===module){try{const path=process.argv[2];if(!path)throw Error('Dùng: node tools/check-content-draft.js /đường/dẫn/ban-thao.json');const draft=JSON.parse(fs.readFileSync(path,'utf8'));const errors=checkDraft(draft);if(errors.length){console.error(errors.map(x=>'✗ '+x).join('\n'));process.exitCode=1;}else console.log(`✓ Bản thảo hợp lệ về cấu trúc: ${draft.origins.length} xuất thân, ${draft.events.length} sự kiện. Cần đọc và mô phỏng nhánh trước khi tích hợp.`);}catch(e){console.error(e.message);process.exitCode=1;}}

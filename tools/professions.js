// Expand authored family conflicts into exact-job events and two three-step
// career quests per available profession. Used by every loader, not just build.
const content = require('../content/careers');
const progression = require('../content/progression');
const longLives = require('../content/long-lives');
const variety = require('../content/career-variety');
const { stepWords } = variety;
const fam = (job) => {
  if(content.jobFamilies?.[job.id])return content.jobFamilies[job.id];
  const suffix=job.id.replace(/^[a-z]+_/, '');
  const exact=Object.entries(content.families).find(([,p])=>p.jobs.includes(suffix));
  if(exact)return exact[0];
  const text=job.name+' '+job.desc;
  if(/merchant|thương|ngân|thuế|kho báu/i.test(text))return 'merchant';
  if(/rèn|chế tạo|kỹ sư|khắc|nấu rượu/i.test(text))return 'smith';
  if(/đưa tin|đưa thư|giao liên|courier|messenger/i.test(text))return 'courier';
  if(/bí thư|giám sát|secretary|overseer/i.test(text))return 'administrator';
  if(/tư tế|priest|shaman/i.test(text))return 'priest';
  if(/thuần|ấp trứng|chăn|cưỡi/i.test(text))return 'tamer';
  return job.look==='phapsu'?'mage':job.look==='tho'?'smith':job.stat==='STR'?'warrior':job.stat==='AGI'?'ranger':job.stat==='LUCK'?'bard':'scholar';
};

function installProfessions(data) {
 const jobs=data.jobs.filter(j=>data.races.some(r=>(!j.races||j.races.includes(r.id))&&!(j.excludeRaces||[]).includes(r.id)));
 const families=new Map(jobs.map(j=>[j.id,fam(j)]));
 for(const j of jobs){
  const family=families.get(j.id);j.family=family;
  const long=longLives.profile(j,(j.races||[])[0],family);
  const p={...content.families[family],...(long||{}),...content.overrides[j.id]};
  if(p.promoXp)j.promoXp=p.promoXp.slice();
  if(p.practiceFocus)j.practiceFocus={...p.practiceFocus};
  const style=family==='merchant'?'commerce':family==='assassin'?'independent':family==='smith'?'craft':null;
  if(long){j.progression=long.progression;j.promo=long.promo.slice(0,j.ranks.length-1);j.promotionCopy=long.promotionCopy;
   if(long.epic){j.income=j.income.map(()=>0);j.epochPath=long.way;}
  } else if(style){j.progression=style;j.promo=progression[style].promo.slice(0,j.ranks.length-1);j.promotionCopy=progression[style];}
  const races=j.races||data.races.filter(r=>!(j.excludeRaces||[]).includes(r.id)).map(r=>r.id);
  const patron=content.patrons[j.id]||'những người cùng nghề';
  const fill=t=>{const v=t.replaceAll('[[patron]]',patron);return v.charAt(0).toUpperCase()+v.slice(1);};
  const integrity=`${j.id}_professional_integrity`,compromise=`${j.id}_professional_compromise`;
  data.events.push({id:`professional_${j.id}_dilemma`,_file:'careers',pack:true,races,focus:['work'],stages:['teen','adult','middle','elder','ancient'],once:false,epoch:!!long,cooldownYears:long?(long.epic?300:30):undefined,weight:35,require:{job:j.id,free:true},text:`${long?.epic?'Trên con đường':'Trong công việc của một'} ${j.name}, bạn gặp một lựa chọn khó khăn. ${fill(p.dilemma)}`,choices:[
   {label:p.safe,check:{stat:j.stat,target:6},success:{text:p.good,effects:{jobXp:2,fame:4,flags:[integrity]}},fail:{text:p.bad,effects:{health:-8,wealth:-5,flags:[integrity]}}},
   {label:p.tempt,check:{stat:j.stat,target:5},success:{text:p.temptGood,effects:{wealth:15,jobXp:2,joy:-5,...p.temptEffects,flags:[compromise]}},fail:{text:p.temptBad,effects:{...p.loss,flags:[compromise]}}},
  ]});
  data.events.push({id:`professional_${j.id}_fallout`,_file:'careers',pack:true,races,focus:['work'],stages:['teen','adult','middle','elder','ancient'],once:false,epoch:!!long,cooldownYears:long?(long.epic?300:30):undefined,weight:45,require:{job:j.id,free:true,flags:[p.falloutOn==='integrity'?integrity:compromise]},text:fill(p.fallout),choices:[
   {label:long?.epic?'Vận dụng quyền năng ổn định cục diện':'Dùng chuyên môn lật lại tình thế',check:{stat:j.stat,target:8},success:{text:`Kinh nghiệm ${j.name} giúp bạn khắc phục hậu quả và lấy lại uy tín.`,effects:{jobXp:3,fame:6}},fail:{text:'Bạn không kiểm soát được tình hình, buộc phải trả giá để kết thúc tranh chấp.',effects:{health:-15,wealth:-15,joy:-5}}},
   {label:long?.epic?'Nhượng quyền lợi để giữ thế cân bằng':'Nhận trách nhiệm và chịu bồi thường',text:'Bạn chấp nhận tổn thất để không kéo thêm người khác vào hậu quả.',effects:{wealth:-12,fame:-3}},
  ]});
  if(j.finance==='commerce') data.events.push({id:`professional_${j.id}_trade`,_file:'careers',pack:true,races,focus:['work'],stages:['teen','adult','middle','elder','ancient'],once:false,weight:55,require:{job:j.id,free:true},text:long ? `Một giao ước trao đổi tại ${longLives.domains[races[0]].place} cần vốn bảo đảm. Bạn cân nhắc vật tư, lời thề của các bên và phần lợi tức sau khi hoàn tất giao ước.` : 'Một nguồn hàng hương liệu đang hạ giá trước mùa vận chuyển. Bạn có thể tự bỏ vốn buôn chuyến hoặc nhận môi giới để giữ tiền an toàn.',choices:[
   {label:'Đầu tư 20 tài sản: thu về 60 nếu bán được hàng',require:{wealth:20},showLocked:true,check:{stat:'INT',target:8},success:{text:'Bạn bỏ 20 vốn, thu về 60 sau chi phí vận chuyển; tài sản tăng ròng 40.',effects:{wealth:40,jobXp:1,fame:3}},fail:{text:'Chuyến hàng thất bại. Bạn mất 20 vốn nhưng không vay thêm để gỡ gạc.',effects:{wealth:-20,joy:-5}}},
   {label:'Chỉ môi giới, nhận phí nhỏ và không ôm hàng',text:'Bạn nối hai đầu mua bán và nhận phí, giữ nguyên vốn cho dịp khác.',effects:{wealth:5,jobXp:0.5}},
   {label:'Không tham gia thương vụ',text:'Bạn bỏ qua lô hàng, tiếp tục công việc thường ngày.'}
  ]});
  const extra=variety.jobs[j.id]||{};
  // a milestone may have a second trial written for it (content/career-variety-*.js): a life meets one of the two
  const arcList=[...p.arcs.map((arc,index)=>[index,arc,'']),...(extra.arcs||[]).map((arc,index)=>arc?[index,arc,'b']:null).filter(Boolean)];
  for(const [index,arc,suffix] of arcList){
   const visibleRank=index===0?2:4,rank=visibleRank-1,id=`career_${j.id}_r${visibleRank}${suffix}`;
   const w=stepWords(j,family,arc[0],id);
   // most scripts wrote the last scene as how it ends: that is told when the trial succeeds, not before the choice
   const told=!suffix&&!variety.SCENE_LIKE.test(arc[4]);
   const title=suffix?arc[0]:j.id==='human_assassin'&&index===0?'Kẻ phản đồ của Umbra Guild':j.id==='human_mage'&&index===1?'Di tích Đại Ngàn':arc[0];
   const org=data.orgs.find(o=>o.races?.some(r=>races.includes(r)))||data.orgs.find(o=>o.id==='guild');
   const target=visibleRank===2?6:10;
   const step=(text,n)=>({text:fill(text),choices:[
    {label:n===2?w.last:w.go,check:{stat:j.stat,target:target+(n===2?1:0)},success:{text:n===2?(told?fill(arc[4]):w.lastOk):n===1?w.goOk2:w.goOk,effects:{jobXp:1}},fail:{text:n===2?w.lastBad:w.goBad,effects:{health:-(n===2?20:10),wealth:-4},...(n===2?{end:'fail'}:{})}},
    ...(n===2?[{label:w.retreat,text:w.retreatText,effects:{joy:-5},end:'fail'}]:[{label:w.safe,text:w.safeText,effects:{wealth:-6,joy:-2}}]),
   ]});
   const steps=[step(arc[2],0),step(arc[3],1),step(told?w.finale:arc[4],2)];
   steps[1].choices=[
    {label:w.keep,check:{stat:j.stat,target:target+1},success:{text:w.keepOk,effects:{fame:5,flags:[integrity]}},fail:{text:w.keepBad,effects:{health:-10,wealth:-8,flags:[integrity]}}},
    {label:family==='mage'?'Thiêu thọ nguyên để cưỡng ép trận pháp':w.bend,check:{stat:j.stat,target:target-1},success:{text:family==='mage'?'Trận pháp phục tùng, nhưng một phần thọ nguyên đã cháy thành năng lượng.':w.bendOk,effects:{joy:-8,...(family==='mage'?{lifeCost:3}:{}),flags:[compromise]}},fail:{text:family==='mage'?'Cấm thuật phản phệ, cướp đi sức lực cùng nhiều năm thọ nguyên.':w.bendBad,effects:{health:-20,wealth:-12,...(family==='mage'?{lifeCost:6}:{}),flags:[compromise]}}},
   ];
   data.quests.push({id,org:org.id,name:`${j.name} · ${title}`,minRank:0,career:{job:j.id,rank:visibleRank,...(suffix?{alt:true}:{})},require:{job:j.id,jobRank:rank,free:true},hint:`Thử thách bậc ${visibleRank}, ba chặng; không cần gia nhập hội.`,intro:fill(arc[1]),steps,complete:long?`Bạn hoàn tất “${title}”. Di sản ${j.name} của bạn đã có người kế thừa, cùng một trách nhiệm khó lòng rũ bỏ.`:`Bạn hoàn tất “${title}”. Những người cùng nghề ghi nhận dấu ấn ${j.name} của bạn.`,failText:`Thử thách “${title}” khép lại với tổn thất. Bạn giữ lấy những điều đã học để tiếp tục hành nghề.`,reward:{fame:visibleRank===2?8:15,jobXp:visibleRank===2?5:10,flags:[`${id}_complete`]},weight:1});
  }
 }
 variety.install(data,jobs);
 const group=family=>jobs.filter(j=>families.get(j.id)===family).map(j=>j.id);
 const special=(family,label,stat,target,text,flags=[],item=false)=>({label,require:{job:group(family)},check:{stat,target},success:{text,effects:{[stat]:1,jobXp:1,wealth:10,...(flags.length?{flags}:{}),...(item?{item:'gargoyle_mana_core'}:{})}},fail:{text:'Kế hoạch chuyên môn không diễn ra như dự tính. Bạn phải dùng sức vượt qua nguy hiểm và cuối cùng tìm được lối đi tiếp.',effects:{health:-20,...(flags.length?{flags}:{})}}});
 const options=(kind,flags=[])=>[
  special('mage',kind==='ruin'?'Phân tích trận pháp, cắt nguồn năng lượng':'Đọc mạch rune và tháo điểm neo ma lực','INT',8,kind==='ruin'?'Bạn ngắt dòng năng lượng. Gargoyle bất động, để lộ Lõi Ma Lực còn nguyên vẹn.':'Bạn tháo đúng điểm neo; cánh cửa mở ra, không cần phá hủy di tích.',flags,kind==='ruin'),
  special('assassin','Dùng bột mù và lách qua điểm mù','AGI',7,'Bạn vượt qua nơi canh giữ mà không phải giao chiến.',flags),
  special('smith',kind==='ruin'?'Nhận diện vết nứt và phá khớp nối':'Tìm điểm yếu của khóa và kết cấu cửa','STR',7,'Bạn tác động chính xác vào điểm chịu lực, mở lối mà không phải chịu một trận đánh kéo dài.',flags),
  special('priest','Dùng lời nguyện giải phóng linh hồn bị trói buộc','INT',8,'Ánh sáng tách linh hồn khỏi mối ràng buộc; quyền năng bảo vệ lối đi dần tan biến.',flags),
 ];
 data.items.relics.gargoyle_mana_core={name:'Lõi Ma Lực',slot:'charm',bonus:{INT:1},desc:'Lõi năng lượng nguyên vẹn lấy từ Gargoyle sau khi vô hiệu hóa trận pháp.'};
 data.events.push({id:'professional_common_gargoyle',_file:'careers',path:'professional_ruins',races:['human','elf','dwarf','beastman'],stages:['adult','middle'],focus:['adventure'],weight:25,text:'Một Gargoyle bằng đá chắn trước di tích. Những ký tự dưới chân nó sáng lên mỗi lần bạn tiến gần; sau lưng là hành lang hẹp dẫn tới kho lưu trữ.',choices:[
  {label:'Đối đầu trực diện',risk:'lethal',check:{stat:'STR',target:8},success:{text:'Bạn đánh bật Gargoyle khỏi điểm tựa, mở được lối vào di tích.',effects:{wealth:15,fame:4}},fail:{text:'Cơ thể đá hất bạn văng khỏi bậc thềm. Bạn rút lui với thương tích nặng.',effects:{health:-35}}},
  {label:'Rút lui theo hành lang ngoài',check:{stat:'AGI',target:5},success:{text:'Bạn thoát khỏi tầm canh giữ và đánh dấu vị trí để quay lại khi đã chuẩn bị.',effects:{joy:-2}},fail:{text:'Mảnh đá văng trúng bạn trước khi bạn thoát khỏi hành lang.',effects:{health:-10}}},
 ],jobChoices:options('ruin')});
 const door=data.events.find(e=>e.id==='path_dungeon_2');if(door)door.jobChoices=options('door',['dg_2']);
 const ambush=data.events.find(e=>e.id==='human_adv_goblin_ambush');if(ambush)ambush.jobChoices=[
  special('mage','Dựng ảo ảnh để đánh lạc hướng mũi giáo','INT',7,'Bầy Goblin lao vào ảo ảnh; bạn thoát khỏi vòng phục kích mà không bị thương.'),
  special('assassin','Tung bột mù rồi thoát qua điểm mù','AGI',7,'Bạn cắt khỏi tầm quan sát và ra khỏi vòng vây.'),
  special('smith','Chặn mũi giáo theo góc lệch của cán','STR',7,'Kiến thức kết cấu giúp bạn làm lệch đòn đánh và mở đường thoát.'),
  special('priest','Dùng ánh sáng làm chói mắt những kẻ phục kích','INT',7,'Luồng sáng ngắt nhịp phục kích; bạn kịp lùi về vị trí an toàn.'),
 ];
}
module.exports={installProfessions,familyOf:fam};

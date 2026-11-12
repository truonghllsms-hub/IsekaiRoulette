// A presentation-only chronicle. Both the screen and PNG use the same SVG and real life data.
(function(root) {
  'use strict';
  const STAT = {STR:'Sức mạnh',INT:'Trí tuệ',AGI:'Nhanh nhẹn',LUCK:'May mắn'};
  const RACE_MOTIFS = {
    human:'crest',elf:'leaf',dwarf:'forge',beastman:'paw',slime:'drop',dragon:'dragon',
    demon:'horns',high_demon:'sovereign',vampire:'fangs',goblin:'ears',kobold:'pickaxe',
    lizardman:'scales',orc:'tusks',minotaur:'bull',troll:'stone'
  };
  const number = n => Math.max(0,Math.floor(Number(n)||0)).toLocaleString('vi-VN');
  const clean = s => String(s ?? '').normalize('NFC').replace(/\s+/g,' ').trim();
  const sentence = s => { const t=clean(s); return t && !/[.!?…]$/.test(t) ? t+'.' : t; };
  const escape = s => String(s ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));

  function highestJob(c,data) {
    return [c.job,...(c.pastJobs||[]).slice().reverse()].filter(Boolean).map(j=>{
      const def=(data.jobs||[]).find(d=>d.id===j.id);
      if(!def)return null;
      const rank=Math.max(0,Math.min(j.rank||0,def.ranks.length-1));
      return {id:j.id,name:def.name,rank,rankName:def.ranks[rank],total:def.ranks.length};
    }).filter(Boolean).sort((a,b)=>b.rank/Math.max(1,b.total-1)-a.rank/Math.max(1,a.total-1)||b.rank-a.rank)[0]||null;
  }

  function model(c,data,k) {
    const age=Math.max(0,Number(c.age)||0),job=highestJob(c,data),race=c.race||{};
    const moments=(c.moments||[]).filter(m=>clean(m.text)&&Number.isFinite(m.age)&&m.age>=0&&m.age<=age)
      .map(m=>({age:m.age,text:clean(m.text)})).sort((a,b)=>a.age-b.age);
    const highlights=[];
    const add=(title,body)=>highlights.push({title,body:sentence(body)});
    if(c.form) add('Một hình thái mới',`Hành trình đã đưa bạn tới hình thái ${c.form}. Đây là dạng tiến hóa được ghi nhận khi cuộc đời khép lại${job?`, cùng chức nghiệp ${job.name}`:''}.`);
    if(job) add('Dấu ấn trên con đường chức nghiệp',`Trên con đường ${job.name}, bạn đã đạt danh hiệu ${job.rankName}, bậc ${job.rank+1}/${job.total}. ${job.rank===job.total-1?'Hành trình chức nghiệp ấy đã đi tới bậc cuối cùng.':'Đó là dấu mốc cao nhất bạn từng chạm tới trên con đường chức nghiệp.'}`);
    // the road taken in the trade and how it ended have a place of their own: a later scene cannot push them out
    const told=(c.moments||[]).filter(m=>m.story&&clean(m.text)&&Number.isFinite(m.age));
    const ending=told.filter(m=>m.story==='end').slice(-1)[0],road=told.filter(m=>m.story==='path').slice(-1)[0];
    if(ending||road){
      const parts=[];
      if(road)parts.push(`Năm ${number(road.age)} tuổi, bạn chọn hướng đi của mình: ${sentence(clean(road.text))}`);
      if(ending)parts.push(`${ending.unfinished?'Con đường ấy khép lại khi còn dang dở':'Kết cục của con đường ấy'}, năm ${number(ending.age)} tuổi: ${sentence(clean(ending.text))}`);
      else parts.push('Cuộc đời khép lại trước khi con đường ấy đi tới hồi kết.');
      add(ending?(ending.unfinished?'Con đường còn dang dở':'Con đường đã chọn và kết cục'):'Con đường đã chọn',parts.join(' '));
    }
    const storyTexts=new Set(told.map(m=>clean(m.text)));
    const significant=moments.filter(m=>!storyTexts.has(m.text)&&!/^Chào đời|^Sinh ra|^Trở thành|^Tiến hóa|^Kết duyên/i.test(m.text));
    const moment=significant[significant.length-1];
    if(moment && highlights.length<3)add('Một bước ngoặt được ghi lại',`Năm ${number(moment.age)} tuổi: ${sentence(moment.text)} Khoảnh khắc này còn được lưu lại trong biên niên của cuộc đời bạn.`);
    const descendants=(c.children||[]).length;
    const spouses=[c.spouse,...(c.familyHistory||[]).filter(p=>p.relation==='spouse')].filter(Boolean);
    if(highlights.length<3 && (spouses.length||descendants))add('Những mối dây còn lại',`${spouses.length?'Cuộc đời đã ghi nhận mối duyên với '+[...new Set(spouses.map(p=>p.name).filter(Boolean))].join(', ')+'. ':''}${descendants?'Gia đình có '+number(descendants)+' người con được lưu trong gia phả.':'Mối duyên ấy là một phần trong hành trình đã sống.'}`);
    if(highlights.length<3 && c.questsDone)add('Những nhiệm vụ đã hoàn thành',`Bạn đã hoàn thành ${number(c.questsDone)} nhiệm vụ trong hành trình này. Những thử thách đã vượt qua góp vào câu chuyện của một kiếp sống, cùng các biến cố và những người từng gặp trên đường.`);
    if(highlights.length<3 && Math.max(c.fame||0,c.famePeak||0)>0)add('Dấu tên trong thế giới',`Danh vọng cao nhất được ghi nhận là ${number(Math.max(c.fame||0,c.famePeak||0))}; khi kết thúc còn ${number(c.fame)}. Biên niên giữ lại cả dấu ấn từng có, ngay cả khi danh tiếng đã phai nhạt.`);
    if(highlights.length<3)add('Nơi hành trình bắt đầu',`Bạn xuất thân từ ${clean(c.origin?.name)||'một nơi chưa được ghi lại'}. Đó là điểm khởi đầu của kiếp sống ${clean(race.name)||'này'}, trước những ngã rẽ được ghi trong nhật ký.`);
    if(highlights.length<3)add('Một kiếp sống đã đi qua',`Cuộc đời khép lại ở tuổi ${number(age)}${age<1?' — khi hành trình còn rất ngắn':''}. ${clean(c.cause)?sentence(c.cause):'Những gì đã trải qua được giữ lại trong biên niên của kiếp sống này.'}`);
    const stats=Object.entries(STAT).map(([id,label])=>({id,label,value:Number(c.stats?.[id])||0})).sort((a,b)=>b.value-a.value);
    if(highlights.length<3)add('Dấu ấn riêng của kiếp sống',`${stats[0].label} được ghi nhận ở mức ${number(stats[0].value)} khi cuộc đời khép lại. Hạnh phúc lúc cuối đời là ${number(c.bars?.joy)}/100, cùng ${number(c.bars?.wealth)} tài sản còn lại.`);
    const unique=moments.filter((m,i,a)=>a.findIndex(x=>x.age===m.age&&x.text===m.text)===i);
    const selected=unique.length<=3?unique:[unique[0],unique[Math.floor((unique.length-1)/2)],unique[unique.length-1]];
    const timeline=selected.length?selected:[{age:0,text:'Khởi đầu: '+(clean(c.origin?.name)||clean(race.name))},{age,text:clean(c.cause)||'Cuộc đời khép lại.'}];
    const motif=RACE_MOTIFS[race.id]||'star';
    return {name:clean(c.name),race:[clean(race.name),clean(c.subtypeName),clean(c.form)].filter(Boolean).join(' · '),raceId:race.id,motif,age,origin:clean(c.origin?.name)||'Chưa rõ',job:job?job.name:'Chưa có chức nghiệp',jobRank:job?.rankName||'',rating:k.rating||{grade:'C',title:'Một kiếp sống'},highlights:highlights.slice(0,3),timeline,imprint:[...stats.slice(0,2).map(s=>`${s.label} ${number(s.value)}`),`Danh vọng ${number(Math.max(c.fame||0,c.famePeak||0))}`,`Tài sản ${number(c.bars?.wealth)}`],epitaph:clean(k.epitaph),cause:clean(c.cause||k.cause)};
  }

  function text(m) {
    return ['LUÂN HỒI DỊ GIỚI · BIÊN NIÊN MỘT KIẾP SỐNG',m.name,`${m.race} · ${number(m.age)} tuổi`,`Chức nghiệp cao nhất: ${m.job}${m.jobRank?' · '+m.jobRank:''}`,`Xuất thân: ${m.origin}`,`Hạng ${m.rating.grade} · ${m.rating.title}`,'','THÀNH TỰU NỔI BẬT',...m.highlights.map((h,i)=>`${i+1}. ${h.title}\n${h.body}`),'','NHỮNG NĂM ĐÁNG NHỚ',...m.timeline.map(t=>`${number(t.age)} tuổi — ${t.text}`),'','DẤU ẤN CÁ NHÂN',m.imprint.join(' · '),m.cause,m.epitaph?`“${m.epitaph}”`:''].filter(s=>s!==undefined).join('\n');
  }

  function render(m,portrait,measure,assets=root.ChronicleAssets||{}) {
    const W=1080,H=1620,ink='#492a17',rust='#95412e',gold='#a2783d',muted='#806548';
    const family='Chronicle Serif';
    const width=(t,size,bold=false,italic=false)=>measure?measure(t,size,bold,italic):Array.from(t).length*size*.56;
    function wrap(t,max,size,bold=false,italic=false) {
      const out=[];let line='';
      for(const word of clean(t).split(' ').filter(Boolean)){
        if(width(word,size,bold,italic)>max){if(line){out.push(line);line='';}for(const ch of Array.from(word)){if(line&&width(line+ch,size,bold,italic)>max){out.push(line);line='';}line+=ch;}}
        else if(line&&width(line+' '+word,size,bold,italic)>max){out.push(line);line=word;}else line+=(line?' ':'')+word;
      }
      if(line)out.push(line);return out;
    }
    const body=[],geometry=[];
    function box(t,x,y,w,h,size=28,{bold=false,italic=false,color=ink,center=false,min=18,maxLines=20}={}) {
      let lines,leading;
      for(;;){leading=size*1.24;lines=wrap(t,w,size,bold,italic);if((lines.length*leading<=h&&lines.length<=maxLines)||size<=min)break;size=Math.max(min,size-.5);}
      const count=Math.max(1,Math.min(maxLines,Math.floor(h/leading))),clipped=lines.length>count;
      if(clipped){lines=lines.slice(0,count);let last=lines[count-1];while(last&&width(last+'…',size,bold,italic)>w)last=last.slice(0,-1);lines[count-1]=last.replace(/[ ,;:-]+$/,'')+'…';}
      for(let i=0;i<lines.length;i++){
        const line=lines[i],tx=center?x+w/2:x,ty=y+size*1.05+i*leading;
        body.push(`<text x="${tx}" y="${ty}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${bold?700:400}" font-style="${italic?'italic':'normal'}" text-anchor="${center?'middle':'start'}">${escape(line)}</text>`);
        geometry.push({x:tx,y:ty,width:width(line,size,bold,italic),size,center,clipped});
      }
    }
    const line=(y,x1=57,x2=1021)=>body.push(`<path d="M${x1} ${y}H${x2}" fill="none" stroke="${gold}" stroke-width="1.2" opacity=".75"/>`);
    function leaves(x,y,flip=1,scale=1){return `<g transform="translate(${x} ${y}) scale(${flip*scale} ${scale})" fill="${rust}" stroke="${rust}" stroke-width="1.5"><path d="M0 30Q9 4 34-25" fill="none"/><path d="M7 15Q-8-1 3-6Q13 1 7 15M15 1Q7-16 19-19Q27-10 15 1M24-12Q22-32 36-33Q42-24 24-12M12 8Q36-1 38 9Q28 21 12 8" stroke="none"/></g>`;}
    function section(title,y) {
      line(y+24);body.push(`<path d="M300 ${y}H780q8 0 12 12l14 12-14 12q-4 12-12 12H300q-8 0-12-12l-14-12 14-12q4-12 12-12Z" fill="#f8eacb" stroke="${gold}" stroke-width="1.3"/>${leaves(247,y+23,-1,.45)}${leaves(833,y+23,1,.45)}`);
      box(title,298,y+5,484,38,29,{bold:true,color:rust,center:true,min:23,maxLines:1});
    }
    const icon=(kind,x,y,size=24)=>body.push(`<g transform="translate(${x} ${y}) scale(${size/28})">${motif(kind,gold)}</g>`);
    function calendar(x,y){body.push(`<g transform="translate(${x} ${y})" fill="none" stroke="${gold}" stroke-width="2.5"><rect x="-12" y="-11" width="24" height="24" rx="2"/><path d="M-12-3H12M-6-16V-6M6-16V-6M-7 3h3m5 0h3m-11 6h3m5 0h3"/></g>`);}
    box('LUÂN HỒI DỊ GIỚI',175,28,730,55,40,{bold:true,center:true,min:30,maxLines:1});
    box('BIÊN NIÊN MỘT KIẾP SỐNG',220,89,640,31,23,{bold:true,center:true,min:19,maxLines:1});
    body.push(`<path d="M519 139V688" stroke="${gold}" stroke-width="1.3"/><path d="M519 136l4 5-4 5-4-5Zm0 550l4 5-4 5-4-5Z" fill="${gold}"/>`);
    const portraitBox={x:78,y:132,width:401,height:548};
    if(portrait)body.push(`<image data-part="portrait" href="${escape(portrait)}" x="${portraitBox.x}" y="${portraitBox.y}" width="${portraitBox.width}" height="${portraitBox.height}" preserveAspectRatio="xMidYMid meet"/>`);
    else body.push(`<g transform="translate(278 405) scale(3)" opacity=".12">${motif(m.motif,gold)}</g>`);
    body.push(leaves(555,225,1,1.05));
    // Prefer a smaller single-line name over unnecessary wrapping; unusually long names may use two.
    const nameSize=Math.max(24,Math.min(66,66*382/Math.max(1,width(m.name,66,true))-.5));
    box(m.name,620,159,382,95,nameSize,{bold:true,center:true,min:24,maxLines:2});
    body.push(`<path d="M638 267q150-9 321-1-133 1-278 10Z" fill="${rust}" opacity=".8"/>`);
    icon(m.motif,584,316,23);box(`${m.race} · ${number(m.age)} tuổi`,631,286,375,59,28,{min:20,maxLines:2});line(347,553,1008);
    icon('swords',584,391,23);box('Chức nghiệp cao nhất:',631,358,375,34,26,{bold:true,min:23,maxLines:1});box(m.job,631,397,375,48,29,{bold:true,min:21,maxLines:2});line(449,553,1008);
    icon('home',584,481,22);box('Xuất thân: '+m.origin,631,460,375,51,27,{min:19,maxLines:2});line(515,553,1008);
    if(assets.badge)body.push(`<image data-part="rank-badge" href="${escape(assets.badge)}" x="656" y="461" width="310" height="310" preserveAspectRatio="xMidYMid meet"/>`);
    else body.push(`<circle cx="811" cy="582" r="64" fill="#eac36b" stroke="${gold}" stroke-width="3"/>`);
    box('HẠNG',763,547,96,30,23,{bold:true,center:true,min:23,maxLines:1});box(m.rating.grade,758,575,106,79,66,{bold:true,center:true,color:'#764315',min:66,maxLines:1});
    line(724);line(729);
    section('THÀNH TỰU NỔI BẬT',748);
    m.highlights.forEach((h,i)=>{
      const y=814+i*120;
      body.push(`<path d="M85 ${y+3}q18-8 35-5l29-4 17 8-6 8 9 4-13 11 1 8-25 5-18-2-28 4-12-9 6-9-8-4Z" fill="${rust}" opacity=".77"/><path d="M81 ${y+4}l69-9m-72 36 81-8" stroke="${rust}" opacity=".3" stroke-width="5"/>`);
      box(String(i+1).padStart(2,'0'),91,y,66,41,32,{italic:true,center:true,color:'#fff5e1',min:28,maxLines:1});
      box(h.title,204,y-2,806,37,30,{bold:true,min:22,maxLines:1});
      box(h.body,204,y+38,806,74,26,{italic:true,min:18,maxLines:3});line(y+115,76,1014);
    });
    section('NHỮNG NĂM ĐÁNG NHỚ',1186);
    m.timeline.slice(0,3).forEach((t,i)=>{const y=1247+i*42;calendar(145,y+14);box(number(t.age)+' tuổi',190,y,177,35,27,{bold:true,color:rust,min:20,maxLines:1});box(t.text,401,y,607,38,27,{min:18,maxLines:2});line(y+39,112,1004);});
    section('DẤU ẤN CÁ NHÂN',1386);
    box(m.imprint.join('  ·  '),126,1444,828,35,25,{center:true,min:18,maxLines:1});
    if(m.cause)box('Khép lại: '+m.cause,137,1484,806,35,21,{center:true,color:muted,min:17,maxLines:2});
    line(1525,161,931);
    if(m.epitaph)box('“'+m.epitaph+'”',155,1540,720,48,26,{italic:true,center:true,min:18,maxLines:2});
    if(assets.wax)body.push(`<image data-part="wax-seal" href="${escape(assets.wax)}" x="924" y="1485" width="128" height="128"/>`);
    body.push(`<g transform="translate(986 1548) scale(.63)">${motif(m.motif,'#e9b58a')}</g>`);
    const fontCss=(assets.fonts||[]).map(f=>`@font-face{font-family:'Chronicle Serif';font-weight:${f.weight};font-style:${f.style};src:url('${f.src}') format('woff');}`).join('');
    const background=assets.paper?`<image data-part="paper" href="${escape(assets.paper)}" width="1080" height="1620"/>`:`<rect width="1080" height="1620" fill="#f9e9c8"/><rect x="22" y="22" width="1036" height="1576" rx="16" fill="none" stroke="${gold}"/>`;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="chronicle-title chronicle-description"><title id="chronicle-title">${escape(m.name+' — Biên niên một kiếp sống')}</title><desc id="chronicle-description">${escape(text(m))}</desc><defs><style>${fontCss}</style></defs>${background}${body.join('')}</svg>`;
    return {svg,width:W,height:H,geometry,portraitBox};
  }
  function motif(kind,color) {
    const paths={swords:'M-22-25L18 16M-18-27L22 12M-21 17L20-24M-17 21L24-20M-27 12L-10 29M10-29L29-10M-27-13L-9-28M10 10L28 28',home:'M-25-7L0-26 25-7M-20-10V24H20V-10M-6 24V5H6V24M-12-2H-6M6-2H12',leaf:'M0 23C-31 7-22-23 23-27C26 5 12 19 0 23ZM-13 12L17-20',forge:'M-29-10H29L13 4H1V18H22V24H-23V18H-5V4H-18Z',paw:'M-19 9Q0-16 19 9Q30 31 0 22Q-30 31-19 9ZM-23-7a6 9 0 1 0 .1 0M-8-18a6 9 0 1 0 .1 0M9-18a6 9 0 1 0 .1 0M24-7a6 9 0 1 0 .1 0',drop:'M0-27C-8-8-27 1-23 16C-17 36 18 33 23 16C27 1 9-11 0-27Z',dragon:'M-25 22L-17-5 6-23 23-18 10-8 29 0 6 9-9 26-2 0-15 6Z',star:'M0-27L7-7 27 0 7 7 0 27-7 7-27 0-7-7Z'};
    Object.assign(paths,{
      crest:'M-22-24H22V3Q17 20 0 28Q-17 20-22 3ZM0-15V15M-13 0H13',
      horns:'M-12-5Q-32-13-27-29Q-18-18-5-17M12-5Q32-13 27-29Q18-18 5-17M-17-14Q0-24 17-14L14 13 0 27-14 13ZM-9-2H-4M4-2H9',
      sovereign:'M-24 4L-27-19-10-9 0-29 10-9 27-19 24 4ZM-23 11H23M-17 18H17M-9 5V11M9 5V11',
      fangs:'M-1-11Q-11-30-29-23L-25-3-14-8-9 8 0 0 9 8 14-8 25-3 29-23Q11-30 1-11M-10 10H10M-9 10L-5 28-1 10M1 10L5 28 9 10',
      ears:'M-14-9L-29-24-26 1-15 8M14-9L29-24 26 1 15 8M-15-14Q0-25 15-14L13 12 0 25-13 12ZM-9-2L-3 1M9-2L3 1M-5 13H5',
      pickaxe:'M-25-12Q-6-32 20-17L29-2Q9-16-8-7M-2-12L-19 27M5-8L-12 29M13 4L25 14 14 27 3 16Z',
      scales:'M0-28L-22-14V12L0 28 22 12V-14ZM-21-13L0 1 21-13M-22 0L0 14 22 0M-10-21L-10-6M10-21L10-6M0 1V27',
      tusks:'M-19-21Q0-31 19-21L20 9Q12 26 0 27Q-12 26-20 9ZM-19 15Q-31 7-26-8Q-22 3-12 4M19 15Q31 7 26-8Q22 3 12 4M-8-10H-3M3-10H8M-7 17H7',
      bull:'M-15-12Q-33-15-28-30Q-18-20-8-18M15-12Q33-15 28-30Q18-20 8-18M-18-13Q0-25 18-13L13 18 0 27-13 18ZM-9 11H9M-7 17H-3M3 17H7M-11-5H-5M5-5H11',
      stone:'M-27 14L-22-8-8-26 13-24 28-5 23 22-8 29ZM-8-26L0-5-22-8M0-5L13-24M0-5L23 22M0-5L-8 29',
      skull:'M-20 2Q-30-24-10-28Q17-35 24-15Q29 2 13 11V24H-12V11ZM-17-8H-5V0H-17ZM5-8H17V0H5ZM0 2L-4 8H4ZM-7 16V24M0 16V24M7 16V24'
    });
    return `<path data-emblem="${escape(kind)}" d="${paths[kind]||paths.star}" fill="none" stroke="${color}" stroke-width="2.8" stroke-linejoin="round"/>`;
  }
  const api={model,highestJob,render,text};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LifeCard=api;
})(typeof window!=='undefined'?window:globalThis);

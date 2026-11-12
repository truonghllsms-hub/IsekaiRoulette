// A presentation-only chronicle. Both the screen and PNG use the same SVG and real life data.
(function(root) {
  'use strict';
  const STAT = {STR:'Sức mạnh',INT:'Trí tuệ',AGI:'Nhanh nhẹn',LUCK:'May mắn'};
  const number = n => Math.max(0,Math.floor(Number(n)||0)).toLocaleString('vi-VN');
  const clean = s => String(s ?? '').replace(/\s+/g,' ').trim();
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
    const significant=moments.filter(m=>!/^Chào đời|^Sinh ra|^Trở thành|^Tiến hóa|^Kết duyên/i.test(m.text));
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
    const motif=['elf','human'].includes(race.id)?'leaf':race.id==='dwarf'?'forge':race.id==='beastman'?'paw':race.id==='slime'?'drop':race.id==='dragon'?'dragon':'star';
    return {name:clean(c.name),race:[clean(race.name),clean(c.subtypeName),clean(c.form)].filter(Boolean).join(' · '),raceId:race.id,motif,age,origin:clean(c.origin?.name)||'Chưa rõ',job:job?job.name:'Chưa có chức nghiệp',jobRank:job?.rankName||'',rating:k.rating||{grade:'C',title:'Một kiếp sống'},highlights:highlights.slice(0,3),timeline,imprint:[...stats.slice(0,2).map(s=>`${s.label} ${number(s.value)}`),`Danh vọng ${number(Math.max(c.fame||0,c.famePeak||0))}`,`Tài sản ${number(c.bars?.wealth)}`],epitaph:clean(k.epitaph),cause:clean(c.cause||k.cause)};
  }

  function text(m) {
    return ['LUÂN HỒI DỊ GIỚI · BIÊN NIÊN MỘT KIẾP SỐNG',m.name,`${m.race} · ${number(m.age)} tuổi`,`Chức nghiệp cao nhất: ${m.job}${m.jobRank?' · '+m.jobRank:''}`,`Xuất thân: ${m.origin}`,`Hạng ${m.rating.grade} · ${m.rating.title}`,'','THÀNH TỰU NỔI BẬT',...m.highlights.map((h,i)=>`${i+1}. ${h.title}\n${h.body}`),'','NHỮNG NĂM ĐÁNG NHỚ',...m.timeline.map(t=>`${number(t.age)} tuổi — ${t.text}`),'','DẤU ẤN CÁ NHÂN',m.imprint.join(' · '),m.cause,m.epitaph?`“${m.epitaph}”`:''].filter(s=>s!==undefined).join('\n');
  }

  function render(m,portrait,measure) {
    const W=1080,ink='#49301f',rust='#984a36',gold='#a97b3f',muted='#80694c';
    const family='Georgia, "Times New Roman", serif';
    const width=(t,size,bold=false,italic=false)=>measure?measure(t,size,bold,italic):Array.from(t).length*size*.53;
    function wrap(t,max,size,bold=false,italic=false) {
      const out=[];let line='';
      for(const word of clean(t).split(' ').filter(Boolean)){
        if(width(word,size,bold,italic)>max){if(line){out.push(line);line='';}for(const ch of Array.from(word)){if(line&&width(line+ch,size,bold,italic)>max){out.push(line);line='';}line+=ch;}}
        else if(line&&width(line+' '+word,size,bold,italic)>max){out.push(line);line=word;}else line+=(line?' ':'')+word;
      }
      if(line)out.push(line);return out;
    }
    const body=[],geometry=[];
    function label(t,x,y,max,size=29,{bold=false,italic=false,color=ink,center=false,lineHeight=size*1.28}={}){
      const lines=wrap(t,max,size,bold,italic);
      for(const line of lines){body.push(`<text x="${x}" y="${y}" fill="${color}" font-family='${family}' font-size="${size}" font-weight="${bold?700:400}" font-style="${italic?'italic':'normal'}" text-anchor="${center?'middle':'start'}">${escape(line)}</text>`);geometry.push({x,y,width:width(line,size,bold,italic),size,center});y+=lineHeight;}
      return y;
    }
    const line=(y,x1=64,x2=1016)=>body.push(`<path d="M${x1} ${y}H${x2}" fill="none" stroke="${gold}" stroke-width="1.4" opacity=".65"/>`);
    const diamond=(x,y,s=5)=>`<path d="M${x} ${y-s}l${s} ${s}-${s} ${s}-${s}-${s}Z" fill="${gold}"/>`;
    function section(title,y){line(y+18);body.push(`<rect x="260" y="${y-6}" width="560" height="48" rx="8" fill="#fbefd7" stroke="${gold}" stroke-width="1.4"/>${diamond(246,y+18)}${diamond(834,y+18)}<path d="M212 ${y+18}q-20-19-37-10q14 18 37 10m656 0q20-19 37-10q-14 18-37 10" fill="${rust}" opacity=".7"/>`);label(title,W/2,y+27,535,30,{bold:true,center:true,color:rust});return y+82;}
    label('LUÂN HỒI DỊ GIỚI',W/2,72,850,38,{bold:true,center:true});
    label('BIÊN NIÊN MỘT KIẾP SỐNG',W/2,108,850,23,{center:true});
    body.push(`<path d="M518 150V646" stroke="${gold}" opacity=".8"/>${diamond(518,150)}${diamond(518,646)}`);
    const portraitBox={x:84,y:152,width:390,height:480};
    if(portrait)body.push(`<image href="${escape(portrait)}" x="${portraitBox.x}" y="${portraitBox.y}" width="${portraitBox.width}" height="${portraitBox.height}" preserveAspectRatio="xMidYMid meet"/>`);
    else body.push(`<g transform="translate(270 390) scale(2.6)" opacity=".15">${motif(m.motif,gold)}</g>`);
    let y=label(m.name,564,203,442,58,{bold:true,lineHeight:64})+18;
    body.push(`<path d="M565 ${y-9}q90 5 180-1l-110 8Z" fill="${rust}" opacity=".65"/>`);
    y=label(`${m.race} · ${number(m.age)} tuổi`,564,y+32,438,29)+6;
    line(y-11,564,1012);
    y=label('Chức nghiệp cao nhất:',564,y+23,438,25,{bold:true,color:rust});
    y=label(m.job,564,y+6,438,30,{bold:true});
    if(m.jobRank)y=label(m.jobRank,564,y,438,22,{italic:true,color:muted});
    y=label('Xuất thân: '+m.origin,564,y+25,438,27)+12;
    const sealY=y+42,gradeColor={S:'#8f4030',A:'#9a6b31',B:'#a58340',C:'#80715b'}[m.rating.grade]||rust;
    body.push(`<g transform="translate(647 ${sealY})"><path d="M-36 25l-10 55 45-22 43 22-9-55" fill="${rust}" opacity=".85"/><circle r="54" fill="#efd698" stroke="${gradeColor}" stroke-width="5"/><circle r="45" fill="none" stroke="${gradeColor}" stroke-width="1.4"/></g>`);
    label('HẠNG',647,sealY-16,90,17,{bold:true,center:true,color:gradeColor});label(m.rating.grade,647,sealY+30,90,50,{bold:true,center:true,color:gradeColor});
    const ratingEnd=label(m.rating.title,732,sealY-4,278,23,{italic:true,color:muted});
    const headerEnd=Math.max(698,sealY+88,ratingEnd+25);line(headerEnd);
    y=section('THÀNH TỰU NỔI BẬT',headerEnd+34);
    for(let i=0;i<m.highlights.length;i++){
      const h=m.highlights[i];body.push(`<path d="M76 ${y-27}l72-5 17 15-12 24-72 4-14-17Z" fill="${rust}" opacity=".78"/>`);
      label(String(i+1).padStart(2,'0'),116,y+4,75,33,{bold:true,italic:true,center:true,color:'#fff6e5'});
      y=label(h.title,189,y,815,32,{bold:true})+3;
      y=label(h.body,189,y,815,28,{italic:true,lineHeight:35})+14;line(y-4,80,1006);y+=25;
    }
    y=section('NHỮNG NĂM ĐÁNG NHỚ',y+7);
    for(const t of m.timeline){label(number(t.age)+' tuổi',97,y,208,27,{bold:true,color:rust});const end=label(t.text,326,y,674,27,{lineHeight:35});y=Math.max(y+40,end+6);line(y-4,83,1000);y+=24;}
    y=section('DẤU ẤN CÁ NHÂN',y+4);
    y=label(m.imprint.join('   ·   '),W/2,y,880,26,{center:true})+19;
    if(m.cause)y=label('Khép lại: '+m.cause,W/2,y,860,24,{center:true,color:muted})+15;
    line(y);y+=44;
    if(m.epitaph)y=label('“'+m.epitaph+'”',W/2,y,820,28,{italic:true,center:true,lineHeight:38})+8;
    const H=Math.max(1620,Math.ceil((y+70)/10)*10);
    body.push(`<g transform="translate(967 ${H-83})"><path d="M-40-9l8-29 26-12 32 8 18 25-3 30-26 20-31-3-22-20Z" fill="${rust}" stroke="#793324" stroke-width="3"/><circle r="28" fill="none" stroke="#d68c6a" stroke-width="1.3"/>${motif(m.motif,'#e3ac7b')}</g>`);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="chronicle-title chronicle-description"><title id="chronicle-title">${escape(m.name+' — Biên niên một kiếp sống')}</title><desc id="chronicle-description">${escape(text(m))}</desc><defs><linearGradient id="paper" x2=".8" y2="1"><stop stop-color="#fff6e3"/><stop offset="1" stop-color="#f0dcba"/></linearGradient><pattern id="grain" width="61" height="59" patternUnits="userSpaceOnUse"><circle cx="4" cy="8" r=".7" fill="#a3794e" opacity=".16"/><circle cx="34" cy="26" r=".6" fill="#a3794e" opacity=".12"/><path d="M12 45h3m35-29h2" stroke="#fffaf0" opacity=".5"/></pattern></defs><rect width="${W}" height="${H}" fill="url(#paper)"/><rect width="${W}" height="${H}" fill="url(#grain)"/><rect x="25" y="23" width="1030" height="${H-46}" rx="25" fill="none" stroke="${gold}" stroke-width="2.5"/><rect x="34" y="32" width="1012" height="${H-64}" rx="20" fill="none" stroke="${gold}" opacity=".4"/><g fill="none" stroke="${rust}" opacity=".23" stroke-width="1.4"><path d="M35 164q31-37 51-45t44-8q36 10 29-24t34-42M33 ${H-183}q65 38 87 9t41 16q37 41 42 87" stroke-dasharray="5 7"/><path d="M55 135l27-45 30 36 29-23 18 39m-96-5 21-36 18 22"/><path d="M${W-107} 91v-46m-23 23h46m-40-17 34 34m0-34-34 34"/></g>${body.join('')}</svg>`;
    return {svg,width:W,height:H,geometry,portraitBox};
  }
  function motif(kind,color) {
    const paths={leaf:'M0 23C-31 7-22-23 23-27C26 5 12 19 0 23ZM-13 12L17-20',forge:'M-29-10H29L13 4H1V18H22V24H-23V18H-5V4H-18Z',paw:'M-19 9Q0-16 19 9Q30 31 0 22Q-30 31-19 9ZM-23-7a6 9 0 1 0 .1 0M-8-18a6 9 0 1 0 .1 0M9-18a6 9 0 1 0 .1 0M24-7a6 9 0 1 0 .1 0',drop:'M0-27C-8-8-27 1-23 16C-17 36 18 33 23 16C27 1 9-11 0-27Z',dragon:'M-25 22L-17-5 6-23 23-18 10-8 29 0 6 9-9 26-2 0-15 6Z',star:'M0-27L7-7 27 0 7 7 0 27-7 7-27 0-7-7Z'};
    return `<path d="${paths[kind]||paths.star}" fill="none" stroke="${color}" stroke-width="2.8" stroke-linejoin="round"/>`;
  }
  const api={model,highestJob,render,text};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LifeCard=api;
})(typeof window!=='undefined'?window:globalThis);

// Variety for the trades of the five main races, so two lives in one trade do not read alike:
// other ways into the trade (start), other promotion trials (promo), a second trial for each of the
// two milestones (arcs), everyday scenes between promotions (events), and how each race and each
// birth comes to the choice of a trade (lead). Written per race in content/career-variety-<race>.js.
//
// A trade:  { start:[text,…], promo:[rank1,rank2,rank3,rank4], arcs:[milestone 2, milestone 4],
//             quiet:[text,…],
//             events:[ { r:[minRank,maxRank], t:text, a:[label,stat,target,success,fail,okFx,failFx], b:[label,text,fx], c:[…] } ] }
// An arc is [title, premise, scene 1, scene 2, scene 3], like content/careers.js.
const files = ['human', 'beastman', 'elf', 'demon', 'dwarf'].map((r) => require(`./career-variety-${r}`));
const jobs = Object.assign({}, ...files.map((f) => f.jobs));
const leads = Object.assign({}, ...files.map((f) => ({ [f.race]: f.lead })));

// How the three scenes of a milestone are worded, by the gift the trade leans on.
const WORDS = {
  STR: {
    go: 'Xắn tay vào, lấy sức mình mở đường', goOk: 'Bạn dồn sức vào đúng chỗ, và chặng đầu của “{t}” lùi lại sau lưng.', goOk2: 'Bạn nghiến răng làm đến cùng, và việc khó nhất đã qua.', goBad: 'Bạn dốc sức sai chỗ, trầy trật một hồi lâu mới gỡ ra được.',
    safe: 'Đi đường vòng, tốn kém hơn nhưng chắc chân', safeText: 'Bạn chấp nhận mất thêm thời gian và của cải để đi lối ít hiểm nguy hơn.',
    last: 'Dốc toàn lực cho đòn quyết định', lastOk: 'Mọi thứ bạn rèn được trong nghề {job} dồn cả vào khoảnh khắc này, và nó vừa đủ.', lastBad: 'Sức bạn cạn trước khi việc xong. Bạn đành dừng lại và nhận lấy tổn thất.',
    retreat: 'Lui lại khi còn đứng vững', retreatText: 'Bạn lui về, giữ sức cho một ngày khác. Không ai trách, nhưng bạn tự biết.',
    keep: 'Giữ lời, chọn lối nặng nhọc hơn', keepOk: 'Bạn giữ được điều đã hứa và vẫn tìm ra lối đi, dù phải đổ nhiều mồ hôi hơn dự tính.', keepBad: 'Giữ lời không làm việc dễ đi. Bạn trả giá bằng thương tích và tiền bạc, nhưng không phải cúi mặt.',
    bend: 'Làm theo cách nhanh hơn, mặc kệ cái giá', bendOk: 'Việc xong sớm. Nhưng bạn biết mình vừa để lại một món nợ sẽ có ngày bị đòi.', bendBad: 'Lối tắt sụp ngay dưới chân, kéo theo cả sức lực lẫn tiếng tăm của bạn.',
  },
  INT: {
    go: 'Ngồi xuống xem xét kỹ trước khi động tay', goOk: 'Bạn nhìn ra mấu chốt mà người khác bỏ sót, và chặng đầu của “{t}” được gỡ xong.', goOk2: 'Bạn tìm được lời giải gọn hơn mọi người tưởng.', goBad: 'Bạn tính sai một bước, phải làm lại từ đầu và tốn kha khá công sức.',
    safe: 'Nhờ người rành hơn, trả công sòng phẳng', safeText: 'Bạn bỏ tiền mời người có kinh nghiệm cùng làm. Chậm và tốn, nhưng không hỏng việc.',
    last: 'Đặt cược vào lời giải của chính mình', lastOk: 'Suy tính của bạn đúng đến từng chi tiết. Những năm trong nghề {job} đã không uổng.', lastBad: 'Có một điều bạn không lường tới, và chỉ một điều ấy là đủ. Bạn phải dừng lại, nhận lấy tổn thất.',
    retreat: 'Dừng tay khi chưa quá muộn', retreatText: 'Bạn gấp sổ lại. Có những bài toán nên để dành cho một ngày mình giỏi hơn.',
    keep: 'Làm cho đúng, dù lâu và khó', keepOk: 'Bạn không cắt bớt bước nào, và kết quả đứng vững trước mọi lời bắt bẻ.', keepBad: 'Làm đúng thì chậm. Bạn mất nhiều hơn dự tính, đổi lại không ai chê được nửa lời.',
    bend: 'Lách qua kẽ hở cho xong việc', bendOk: 'Kẽ hở ấy có thật, và bạn lọt qua. Chỉ mong sau này không ai lần lại đường cũ.', bendBad: 'Kẽ hở hóa ra là cái bẫy. Bạn mất cả của lẫn tiếng.',
  },
  AGI: {
    go: 'Đi trước một bước, dò đường bằng chính mình', goOk: 'Bạn lướt qua chỗ hiểm trước khi nó kịp thành chuyện, và chặng đầu của “{t}” đã xong.', goOk2: 'Bạn nhanh hơn rắc rối đúng một nhịp, và thế là đủ.', goBad: 'Bạn chậm mất một nhịp, phải trả giá bằng vài vết xước và nửa ngày công.',
    safe: 'Chờ thời cơ tốt hơn, dù tốn thêm ngày giờ', safeText: 'Bạn nằm im chờ đến lúc thuận lợi. Mất thời gian và lộ phí, nhưng không mất mạng.',
    last: 'Chớp lấy khoảnh khắc duy nhất', lastOk: 'Chỉ có một nhịp thở để ra tay, và bạn không bỏ lỡ. Nghề {job} đã dạy bạn điều đó.', lastBad: 'Khoảnh khắc trôi qua nhanh hơn tay bạn. Việc hỏng, và bạn phải rút với thương tích.',
    retreat: 'Lẩn đi trước khi bị dồn vào góc', retreatText: 'Bạn biến mất đúng lúc. Biết khi nào nên lui cũng là một phần của nghề.',
    keep: 'Không đi lối tắt bẩn, chấp nhận hiểm hơn', keepOk: 'Bạn chọn lối khó mà sạch, và đôi chân đưa bạn qua được.', keepBad: 'Lối sạch thì dài và lộ. Bạn dính đòn, tốn của, nhưng không phải ngoái lại sau lưng.',
    bend: 'Mượn tay kẻ khác, không hỏi họ là ai', bendOk: 'Có kẻ mở sẵn cửa cho bạn. Một ngày nào đó, hắn sẽ đến đòi công.', bendBad: 'Kẻ mở cửa cho bạn cũng là kẻ báo cho lính gác. Bạn mất nhiều hơn những gì định lấy.',
  },
  LUCK: {
    go: 'Tin vào linh cảm và bắt tay làm', goOk: 'Linh cảm dẫn bạn đi đúng lối, và chặng đầu của “{t}” trôi qua nhẹ hơn bạn dám mong.', goOk2: 'Mọi thứ khớp vào nhau như có ai sắp sẵn.', goBad: 'Linh cảm lần này dẫn bạn đi một vòng rất xa. Bạn mệt nhoài mới quay lại được chỗ cũ.',
    safe: 'Không đánh cược, làm từng bước chắc chắn', safeText: 'Bạn làm theo cách chậm mà chắc. Tốn thêm công và của, nhưng không phải trông vào vận may.',
    last: 'Đặt hết vào một lần', lastOk: 'Vận may chỉ đến với kẻ đã chuẩn bị đủ lâu. Những năm trong nghề {job} của bạn chính là sự chuẩn bị ấy.', lastBad: 'Lần này vận may ngoảnh mặt. Bạn dừng lại giữa chừng, với nhiều thứ đã mất.',
    retreat: 'Thôi, không thử vận may thêm nữa', retreatText: 'Bạn rút tay lại. Kẻ sống lâu trong nghề là kẻ biết lúc nào không nên gieo xúc xắc.',
    keep: 'Giữ lòng ngay thẳng, mặc cho thiệt thòi', keepOk: 'Bạn làm điều phải, và lần này điều phải cũng là điều may.', keepBad: 'Ngay thẳng không phải lúc nào cũng được đền đáp. Bạn chịu thiệt, nhưng ngủ yên.',
    bend: 'Nói khéo một lời không hẳn là thật', bendOk: 'Người ta tin lời bạn. Giờ thì bạn phải nhớ kỹ mình đã nói gì.', bendBad: 'Lời nói dối vỡ ra sớm hơn bạn tưởng, và mang theo cả uy tín của bạn.',
  },
};
function stepWords(j, family, title) {
  const set = WORDS[j.stat] || WORDS.INT;
  const out = {};
  for (const k of Object.keys(set)) out[k] = set[k].replace('{t}', title).replace('{job}', j.name);
  return out;
}

const PREFIX = 'Thử thách để trở thành {next}: ';
function install(data, list) {
  for (const j of list) {
    const x = jobs[j.id];
    if (!x) continue;
    const races = j.races;
    if (x.start) j.startAlt = [j.start, ...x.start];
    // long lives spend many quiet years at work: more lines so they do not come round so soon
    if (x.quiet) j.quiet = [...(j.quiet || []), ...x.quiet];
    if (x.promo) {
      // a trade whose trials were written for it keeps them beside the new ones; a trade that only had
      // the shared wording of its kind (craft, commerce, legacy) gets its own
      const own = j.promo[0].startsWith(PREFIX);
      const full = (v) => (v.includes('{next}') ? v : PREFIX + v);
      j.promoAlt = j.promo.map((t, i) => (x.promo[i] ? (own ? [t, ...[].concat(x.promo[i]).map(full)] : [].concat(x.promo[i]).map(full)) : [t]));
    }
    (x.events || []).forEach((e, n) => {
      const [min, max] = e.r || [0];
      const choice = (row, plain) => {
        if (!row) return null;
        if (plain) return { label: row[0], text: row[1], effects: row[2] || { joy: 2 } };
        return { label: row[0], check: { stat: row[1], target: row[2] }, success: { text: row[3], effects: row[5] || { jobXp: 1, fame: 1 } }, fail: { text: row[4], effects: row[6] || { joy: -4 } } };
      };
      const isCheck = (row) => row && typeof row[2] === 'number';
      data.events.push({
        id: `jx_${j.id}_${n + 1}`, _file: 'career-variety', pack: true, races, weight: e.w || 14,
        require: Object.assign({ job: j.id, free: true }, min ? { jobRank: min } : {}, max != null ? { jobRankMax: max } : {}),
        ...(e.stages ? { stages: e.stages } : {}), ...(e.eras ? { eras: e.eras } : {}),
        text: e.t,
        choices: [e.a, e.b, e.c].filter(Boolean).map((row) => choice(row, !isCheck(row))),
      });
    });
  }
  // how each race, and each birth, comes to the choice of a trade
  data.systems.race = data.systems.race || {};
  for (const [race, lead] of Object.entries(leads)) {
    if (!lead) continue;
    const cur = data.systems.race[race] = data.systems.race[race] || {};
    const base = cur.jobSelect || data.systems.jobSelect;
    // a birth is named with or without its race in front (human_bg_farmer, bm_bg_nomad)
    const known = new Set(data.origins.map((o) => o.id));
    const own = Object.entries(lead.origins || {}).map(([id, text]) => `(${known.has(id) ? id : `${race}_${id}`}) ${text}`);
    cur.jobSelect = Object.assign({}, base, { teen: [...lead.teen, ...own], adult: [...lead.adult, ...own] });
  }
}

module.exports = { jobs, leads, stepWords, install };

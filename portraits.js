// Match named NPCs to the supplied race/gender/job art, without changing their identity.
(function (root) {
  'use strict';
  const slug = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const hash = t => { let h = 0; for (const ch of String(t)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const kin = { cat: ['meo'], dog: ['cho'], wolf: ['soi'], fox: ['cao'], rabbit: ['tho'], tiger: ['ho'], bear: ['gau'], rat: ['chuot'], hawk: ['ung'] };
  const jobs = {
    swordsman: ['kiem_si', 'chien_binh'], paladin: ['thanh_ky_si'], gladiator: ['gladiator', 'giac_dau'], mercenary: ['linh_danh_thue'], mage: ['ma_phap_su', 'phap_su', 'phu_thuy'], priest: ['priest', 'linh_muc', 'tu_si', 'muc_su', 'chua_lanh'], scholar: ['hoc_gia'], bard: ['nhac_cong', 'ngam_tho'], assassin: ['sat_thu'], ranger: ['cung_thu', 'cung_thu_rung'], tamer: ['thuan_thu'], smith: ['tho_ren'], merchant: ['thuong_nhan'], farmer: ['nong_dan'],
    berserker: ['cuong_chien'], hunter: ['tho_san'], scout: ['trinh_sat'], merc: ['linh_danh_thue'], thief: ['trom'], courier: ['dua_tin'], shaman: ['shaman', 'phap_su_bo_lac'], leather: ['thuoc_da'], herder: ['chan_thu'],
    runesmith: ['blacksmith', 'tho_ren', 'rune'], shield: ['chien_binh', 'do_don'], brew: ['nau_ruou'], eng: ['ky_su'], miner: ['tho_mo'], carver: ['tho_cham'], guard: ['ho_ve', 'canh_ve'], spirit: ['ma_phap_su', 'phap_su', 'tinh_linh'], herb: ['thao_duoc'], wood: ['tho_moc'], envoy: ['su_gia'], warrior: ['chien_binh', 'kiem_si'], dk: ['dark_knight', 'hiep_si'], wl: ['warlock', 'phap_su'], stalker: ['san_moi'], sentinel: ['ho_ve'], awakened: ['thuc_tinh'], general: ['tuong_quan'], archmage: ['phap_su'], lord: ['lanh_chua'], hoard: ['kho_bau'], war: ['chien_binh'], sage: ['phap_su', 'hoc_gia'], noble: ['quy_toc'], blade: ['kiem_si'], metal: ['kim_loai'], magic: ['ma_phap'], poison: ['doc'], bridge: ['gac_cau'], guardian: ['ho_ve'], custodian: ['phuc_dich']
  };
  const has = (text, token) => (`_${text}_`).includes(`_${token}_`);
  // A companion with artbook art (Humans, Beastmen) is drawn from it: a template of their race, kin and
  // gender (fixed by name), their trade at its step (T1 ranks 1-2, T2 ranks 3-4, T3 rank 5), else their grown-up self.
  const TRADES = ['swordsman', 'mage', 'assassin', 'priest', 'merchant', 'smith', 'ranger', 'gladiator', 'paladin', 'scholar', 'farmer', 'tamer', 'bard', 'mercenary'];
  const TRADE_WORDS = { merc: ['mercenary', 'linh_danh_thue', 'soi_bac'], leather: ['leatherworker', 'tho_da', 'thuoc_da'], herder: ['herder', 'chan_thu', 'huan_luyen_thu'], courier: ['courier', 'dua_tin', 'dua_thu'], berserker: ['berserker', 'cuong_chien', 'cuong_chien_binh'], shaman: ['shaman', 'vu_su', 'thay_cung'], scout: ['scout', 'trinh_sat'], hunter: ['hunter', 'tho_san', 'ranger', 'archer', 'cung_thu'], thief: ['thief', 'dao_tac', 'trom'], swordsman: ['kiem_si', 'chien_binh', 'warrior', 'kiem_khach', 'kiem_thanh', 'kiem_vuong', 'swordmaster'], paladin: ['thanh_ky_si', 'paladin', 'ky_si', 'hiep_si', 'knight'], assassin: ['sat_thu', 'assassin', 'thief', 'trom', 'rogue'], priest: ['nu_tu', 'cleric', 'herbalist', 'thay_thuoc', 'thanh_quan', 'tri_lieu'], merchant: ['merchant', 'thuong_gia', 'lai_buon'], smith: ['blacksmith', 'smith', 'ren'], ranger: ['ranger', 'tho_san', 'trinh_sat', 'hunter', 'archer', 'xa_thu'], gladiator: ['dau_si'], scholar: ['scholar', 'hoc_si', 'nha_nghien_cuu'], farmer: ['farmer', 'nong_phu'], tamer: ['tamer', 'thuan_thu_su'], bard: ['bard', 'ca_si', 'thi_si', 'nhac_si'], mercenary: ['mercenary', 'ho_ve', 'canh_ve', 'linh', 've_binh', 'guard'], mage: ['mage', 'wizard', 'warlock', 'hien_gia'] };
  function artbookArt(member, data, race, subtype, gender) {
    const P = data.portraits;
    const own = Object.keys(P.templates).filter(T => { const t = P.templates[T]; return t.race === race && (!t.subtype || t.subtype === subtype) && t.gender === gender && P.looks[T]; }).sort();
    if (!own.length) return null;
    const T = own[hash(member.name) % own.length];
    const role = slug([member.position, member.jobName, member.job].filter(Boolean).join(' '));
    const trades = P.looks[T].filter(k => /_1$/.test(k)).map(k => k.slice(0, -2));
    const trade = trades.find(k => has(role, k) || (jobs[k] || []).some(a => has(role, a))) || trades.find(k => (TRADE_WORDS[k] || []).some(a => has(role, a)));
    const rankMatch = role.match(/(?:bac|rank)_(\d+)/);
    const tier = rankMatch ? (+rankMatch[1] >= 5 ? 3 : +rankMatch[1] >= 3 ? 2 : 1) : member.rank != null ? (member.rank >= 4 ? 3 : member.rank >= 2 ? 2 : 1) : /ky_cuu|lao_luyen|veteran/.test(role) ? 2 : 1;
    const old = /(?:^|_)(gia|lao|old)(?:_|$)/.test(slug([member.name, member.desc, member.race].join(' ')));
    const young = /(?:^|_)(be|nhoc|thieu_nien|thieu_nu|tre_con)(?:_|$)/.test(slug(member.desc || member.race));
    const want = [...(trade ? [3, 2, 1].filter(t => t <= tier).map(t => `${trade}_${t}`) : []), old && 'age60', young && 'age15', 'base', 'age15'];
    const look = want.find(k => k && P.looks[T].includes(k));
    const key = `pt/${T}/${look}`, sheet = data.sprites[key];
    return sheet ? { person: key, column: look, rect: sheet[look], size: sheet._size, raceId: race, subtype, gender } : null;
  }

  function npcSprite(member, data) {
    const raw = slug(member.race);
    // The source sheets contain humanoid Beastmen, not these animal companions.
    if (/^(giant_rat|bat|soi_hoang|soi_bong_toi|cao_ma_thuat|tho_tuyet|tinh_linh_dat|golem)/.test(raw)) return null;
    const aliases = { elf: ['dark_elf', 'tinh_linh'], demon: ['succubus'], goblin: ['hobgoblin'], ghoul: ['skeleton'] };
    const matches = (data.races || []).flatMap(r => [slug(r.name), slug(r.id), ...(aliases[r.id] || [])].filter(a => has(raw, a)).map(a => ({ race: r, at: raw.indexOf(a), length: a.length })));
    matches.sort((a, b) => a.at - b.at || b.length - a.length);
    let race = matches[0]?.race;
    const kinId = Object.keys(kin).find(id => kin[id].some(k => has(raw, k)));
    if (!race && kinId) race = data.races.find(r => r.id === 'beastman');
    if (!race) return null;
    if (race.id === 'beastman' && has(raw, 'su_tu')) return null; // no lion sheet was supplied
    const subtype = race.id === 'beastman' ? kinId || 'wolf' : null;
    const genderText = slug([member.race, member.desc, member.position, member.jobName].filter(Boolean).join(' '));
    const declaredGender = has(raw, 'nu') || has(raw, 'cai') ? 'female' : has(raw, 'nam') || has(raw, 'duc') ? 'male' : null;
    const gender = declaredGender || member.gender || (has(genderText, 'nu') || has(genderText, 'cai') ? 'female' : /(?:a|ine)$/i.test(member.name) ? 'female' : 'male');
    const g = race.genderless ? 'x' : gender === 'female' ? 'nu' : 'nam';
    if (data.portraits) { const art = artbookArt(member, data, race.id, subtype, gender); if (art) return art; }
    const prefix = `${race.id}${subtype ? '_' + subtype : ''}`;
    const atlas = data.sprites || {};
    const own = Object.keys(atlas).filter(p => p.startsWith(`${prefix}_${g}_`)).sort();
    // Several supplied monster sheets have a single shared silhouette.
    const shared = Object.keys(atlas).filter(p => p.startsWith(`${prefix}_x_`)).sort();
    const other = Object.keys(atlas).filter(p => p.startsWith(`${prefix}_`)).sort();
    const pool = own.length ? own : shared.length ? shared : other;
    if (!pool.length) return null;
    const person = pool[hash(member.name) % pool.length];
    const sheet = atlas[person];
    const role = slug([member.position, member.jobName, member.job].filter(Boolean).join(' '));
    const rankMatch = role.match(/(?:bac|rank)_(\d+)/);
    const veteran = rankMatch ? Number(rankMatch[1]) >= 3 : (member.rank != null && member.rank >= 2) || /ky_cuu|lao_luyen|veteran/.test(role);
    const columns = Object.keys(sheet).filter(k => /_(moi|kycuu)$/.test(k));
    const stems = [...new Set(columns.map(k => k.replace(/_(moi|kycuu)$/, '')))];
    const job = stems.find(k => has(role, k) || (jobs[k] || []).some(a => has(role, a)));
    const form = Object.keys(sheet).find(k => k.startsWith('tienhoa_') && has(raw, k.slice(8)));
    const old = /(?:^|_)(gia|lao)(?:_|$)/.test(slug(member.desc || member.race));
    const want = [form, job && `${job}_${veteran ? 'kycuu' : 'moi'}`, job && `${job}_${veteran ? 'moi' : 'kycuu'}`, old && 'gia', 'thuongdan', 'thieunien', 'gia', 'hoilon', 'beti'];
    const column = want.find(k => k && sheet[k]);
    return column ? { person, column, rect: sheet[column], size: sheet._size, raceId: race.id, subtype, gender } : null;
  }
  const api = { npcSprite };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Portraits = api;
})(typeof window !== 'undefined' ? window : globalThis);

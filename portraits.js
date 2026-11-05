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

// Economic roles stay independent from authored promotion styles (heritage/epoch).
const WIND_FALL = /kho báu|kho vàng|gia tài|thừa kế|ban thưởng|bổng lộc|chiến lợi phẩm khổng lồ|kho bạc|ngân khố|gia sản/i;
function installEconomy(data) {
  for (const r of data.races) r.economy = data.economy.races[r.id];
  for (const j of data.jobs) j.finance = data.economy.commercialJobs.includes(j.id) ? 'commerce' : 'wage';
}
function annotateRewards(data) {
  function visit(node, kind) {
    if (!node || typeof node !== 'object') return;
    if (node.effects?.wealth > 0 && !node.effects.wealthKind && kind && (kind!=='windfall' || node.effects.wealth>=20)) node.effects.wealthKind = kind;
    for (const [key, value] of Object.entries(node)) if (key !== 'effects' && value && typeof value === 'object') visit(value,kind);
  }
  for (const e of data.events) {
    const text=JSON.stringify([e.text,e.choices||null]);
    const trade=e.id.startsWith('professional_') && e.id.endsWith('_trade');
    // Only authored rare rewards bypass ordinary accumulation. Repeat scenes cannot mint treasure.
    visit(e,trade?'commerce':e.once!==false&&WIND_FALL.test(text)?'windfall':null);
  }
  for (const q of data.quests) if (!q.repeat && q.reward?.wealth >= 25 && !q.reward.wealthKind) q.reward.wealthKind='windfall';
}
module.exports={installEconomy,annotateRewards};

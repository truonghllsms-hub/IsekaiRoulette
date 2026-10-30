// Shared frame for the trade-choosing races (Elf, Dwarf, Beastman, Demon): seven "việc chính" with the
// usual ids, the script's roles under manga names, and an organisation with ranks F → S.
const guild = require("../../data/orgs.json").find((o) => o.id === "guild");

const FOCUS = {
  play: { name: "Rong chơi", stages: ["infant", "child"] },
  study: { name: "Học hành", stages: ["child", "teen", "adult", "middle", "elder"] },
  train: { name: "Khổ luyện", stages: ["child", "teen", "adult", "middle"] },
  work: { name: "Làm lụng", stages: ["teen", "adult", "middle", "elder"] },
  adventure: { name: "Mạo hiểm", stages: ["teen", "adult", "middle"] },
  social: { name: "Giao du", stages: ["teen", "adult", "middle", "elder"] },
  rest: { name: "An dưỡng", stages: ["infant", "child", "teen", "adult", "middle", "elder"] },
};

// roles: [id, display name, main stat, combat?, [5 ranks], description]
function roles(prefix, list) {
  return list.map(([id, name, stat, combat, ranks, desc]) => ({
    title: name.toUpperCase(), id: prefix + "_" + id, name, stat, combat, ranks, desc,
    income: combat ? [0.9, 1.5, 2.3, 3.3, 4.4] : [0.9, 1.4, 2.2, 3.2, 4.4],
    hazard: combat ? 1.6 : 0.9,
    gains: { [stat]: 0.33 },
  }));
}

function guildOrg(id, extra) {
  return Object.assign({}, guild, { id, tags: undefined, points: [0, 2, 5, 9, 14, 20, 28], fameToPts: 0.2 }, extra || {});
}

module.exports = { FOCUS, roles, guildOrg, focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"] };

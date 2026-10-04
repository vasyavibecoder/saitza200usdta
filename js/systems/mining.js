(function () {
  'use strict';

  const MINING = { cooldown: 15000, baseYield: 5, levelReq: 100 };

  function startMining() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return;

    const now = Date.now();
    if (now - (p.lastMine || 0) < MINING.cooldown) {
      return alert('Кулдаун. Попробуйте позже.');
    }

    p.lastMine = now;
    const count = MINING.baseYield + Math.floor(Math.random() * 10);
    p.ore = (p.ore || 0) + count;
    p.mineXP = (p.mineXP || 0) + count;

    while (p.mineXP >= MINING.levelReq) {
      p.mineXP -= MINING.levelReq;
      p.mineLevel = (p.mineLevel || 1) + 1;
    }

    SeaStorage.saveCurrentPlayer(p);
    updateAll();
    alert('⛏️ Добыто руды: ' + count);
  }

  window.startMining = startMining;
})();

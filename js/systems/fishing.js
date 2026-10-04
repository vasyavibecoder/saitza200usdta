(function () {
  'use strict';

  const FISHING = { cooldown: 30000, nets: 5, levelReq: 100 };

  function startFishing() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return;

    const now = Date.now();
    if (now - (p.lastFish || 0) < FISHING.cooldown) {
      return alert('Кулдаун. Попробуйте позже.');
    }

    p.lastFish = now;
    const count = 1 + Math.floor(Math.random() * FISHING.nets);
    p.pearl = (p.pearl || 0) + count;
    p.fishXP = (p.fishXP || 0) + count * 10;

    while (p.fishXP >= FISHING.levelReq) {
      p.fishXP -= FISHING.levelReq;
      p.fishLevel = (p.fishLevel || 1) + 1;
    }

    SeaStorage.saveCurrentPlayer(p);
    updateAll();
    alert('🎣 Поймано жемчуга: ' + count);
  }

  window.startFishing = startFishing;
})();

(function () {
  'use strict';

  function treasure() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return 0;
    const gold = 1 + Math.floor(Math.random() * 1500);
    p.gold = (p.gold || 0) + gold;
    SeaStorage.saveCurrentPlayer(p);
    if (typeof updateAll === 'function') updateAll();
    return gold;
  }

  function rojerGift() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return 0;
    const gold = 1000 + Math.floor(Math.random() * 4000);
    p.gold = (p.gold || 0) + gold;
    SeaStorage.saveCurrentPlayer(p);
    return gold;
  }

  function crash() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return;
    p.hp = 1;
    SeaStorage.saveCurrentPlayer(p);
    if (typeof updateAll === 'function') updateAll();
    alert('💥 Корабль потерпел крушение. HP восстановлено до 1.');
  }

  window.SeaEvents = { treasure, rojerGift, crash };
})();

(function () {
  'use strict';

  function sellPearl() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p || p.pearl < 1) return alert('Нет жемчуга');
    p.gold += p.pearl * 100;
    p.pearl = 0;
    SeaStorage.saveCurrentPlayer(p);
    updateAll();
  }

  function sellCrystal() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p || p.crystal < 1) return alert('Нет кристаллов');
    p.gold += p.crystal * 200;
    p.crystal = 0;
    SeaStorage.saveCurrentPlayer(p);
    updateAll();
  }

  function sellIron() {
    const p = SeaStorage.getCurrentPlayer();
    if (!p || p.iron < 1) return alert('Нет железа');
    p.gold += p.iron * 500;
    p.iron = 0;
    SeaStorage.saveCurrentPlayer(p);
    updateAll();
  }

  window.Market = { sellPearl, sellCrystal, sellIron };
})();

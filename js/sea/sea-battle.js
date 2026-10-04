(function () {
  'use strict';

  const KEY = 'seawars_sea_battle';

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (_) { return null; }
  }

  function start(type, id, hp, name) {
    const b = {type, id, hp, maxHp:hp, name};
    localStorage.setItem(KEY, JSON.stringify(b));

    const damage = Math.floor(Math.random() * 30) + 20;
    const won = damage >= hp;

    if (won) {
      const p = SeaStorage.getCurrentPlayer();
      const gold = type === 'trader' ? 500 + Math.floor(Math.random()*1500) : 800 + Math.floor(Math.random()*2500);
      const xp = 100 + Math.floor(Math.random()*200);
      p.gold += gold;
      p.xp = (p.xp || 0) + xp;
      SeaStorage.saveCurrentPlayer(p);
      localStorage.removeItem(KEY);
      updateAll();
      alert('⚔ Победа!\n💰 +' + gold + ' золота\n⭐ +' + xp + ' XP');
      SeaGame.render();
      return;
    }

    const b2 = get();
    b2.hp = Math.max(0, b2.hp - damage);
    localStorage.setItem(KEY, JSON.stringify(b2));

    const p = SeaStorage.getCurrentPlayer();
    p.hp = Math.max(1, (p.hp || p.hpMax) - Math.floor(Math.random()*15));
    SeaStorage.saveCurrentPlayer(p);
    updateAll();
    alert('⚔ Атака нанесла ' + damage + ' урона.\nОсталось у противника: ' + b2.hp + ' HP');
  }

  window.SeaBattle = { start, get };
})();

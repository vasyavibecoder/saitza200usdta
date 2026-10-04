(function () {
  'use strict';

  function createNewPlayer(login, password) {
    return {
      login,
      password,
      level: 1,
      xp: 0,
      gold: 5000,
      piastr: 100,
      power: 100,
      defense: 50,
      speed: 50,
      hp: 100,
      hpMax: 100,
      ship: 'Шлюп',
      currentCity: 'Город Толедо',
      sex: 1,
      avatar: 'sex_1',
      nickColor: '#e3ba7c',
      pearl: 0,
      crystal: 0,
      iron: 0,
      ore: 0,
      rum: 0,
      gems: 0,
      slitkov: 0,
      fishLevel: 1,
      fishXP: 0,
      mineLevel: 1,
      mineXP: 0,
      questPoints: 0,
      quests: {},
      labels: {},
      trophies: {},
      collections: {},
      artifacts: [],
      equipment: [],
      chest: [],
      chestVanhu: [],
      chestMaxCapacity: 20,
      journal: [],
      invisibleUntil: 0,
      lastFish: 0,
      lastMine: 0,
      lastTreasure: 0
    };
  }

  function addXP(amount) {
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return;

    p.xp = (p.xp || 0) + Number(amount || 0);
    while (p.xp >= p.level * 1000) {
      p.xp -= p.level * 1000;
      p.level++;
      p.hpMax += 10;
      p.hp = p.hpMax;
    }
    SeaStorage.saveCurrentPlayer(p);
    updateAll();
  }

  function updateAll() {
    const p = SeaStorage.getCurrentPlayer();
    const auth = document.getElementById('authScreen');
    const city = document.getElementById('cityScreen');

    if (!p) {
      auth?.classList.remove('hidden');
      city?.classList.add('hidden');
      const summary = document.getElementById('playerSummary');
      if (summary) summary.textContent = 'Гость';
      return;
    }

    auth?.classList.add('hidden');
    city?.classList.remove('hidden');

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    set('player-power', p.power || 0);
    set('player-hp', p.hp || 0);
    set('player-gold', p.gold || 0);
    set('player-piastr', p.piastr || 0);
    set('player-level', p.level || 1);
    document.querySelectorAll('.player-ship-name').forEach(e => e.textContent = p.ship || '—');

    const summary = document.getElementById('playerSummary');
    if (summary) summary.textContent = p.login + ' · ' + p.level + ' ур.';

    const cityName = document.getElementById('cityName');
    if (cityName) cityName.textContent = p.currentCity || 'Город Толедо';
  }

  window.GamePlayer = { createNewPlayer, addXP, updateAll };
  window.addXP = addXP;
  window.updateAll = updateAll;
})();

(function () {
  'use strict';

  const KEY = 'seawars_sea_state';
  const DEFAULT = {
    x: 50, y: 50, weather: 5, invisibleUntil: 0,
    objects: [
      { id:'trader1', type:'trader', x:25, y:30, name:'Торговец' },
      { id:'bot1', type:'bot', x:72, y:35, name:'Пират' },
      { id:'treasure1', type:'treasure', x:63, y:72, name:'Сокровище' }
    ]
  };

  function state() {
    try {
      return Object.assign({}, DEFAULT,
        JSON.parse(localStorage.getItem(KEY) || '{}'));
    } catch (_) {
      return {...DEFAULT};
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function render() {
    const s = state();
    const p = SeaStorage.getCurrentPlayer();
    if (!p) return;

    const player = document.getElementById('seaPlayer');
    if (player) {
      player.style.left = s.x + '%';
      player.style.top = s.y + '%';
      player.classList.toggle('invisible', s.invisibleUntil > Date.now());
    }

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    set('seaPower', p.power || 0);
    set('seaHp', p.hp || 0);
    set('seaGold', p.gold || 0);
    set('seaPlayerName', p.login);

    const weather = document.getElementById('seaWeatherIcon');
    if (weather) weather.src = './assets/icons/weather/' + s.weather + '.png';

    const objects = document.getElementById('seaObjects');
    if (objects) {
      objects.innerHTML = (s.objects || []).map(o => {
        const icon = o.type === 'trader'
          ? './assets/icons/trader.png'
          : o.type === 'bot'
          ? './assets/icons/nav/pirat.png'
          : './assets/icons/nav/box.jpg';

        return `<button class="sea-object" data-object="${o.id}"
                 style="left:${o.x}%;top:${o.y}%"
                 title="${o.name}">
                 <img src="${icon}" width="38" height="38" alt="${o.name}">
               </button>`;
      }).join('');
    }
  }

  function move(dx, dy) {
    const s = state();
    s.x = Math.max(3, Math.min(97, s.x + dx));
    s.y = Math.max(5, Math.min(92, s.y + dy));
    save(s);
    render();
  }

  function action(type) {
    if (type === 'trader') SeaBattle.start('trader', 'trader1', 150, 'Торговец');
    if (type === 'bot') SeaBattle.start('bot', 'bot1', 200, 'Пират');
    if (type === 'treasure') alert('💎 ' + SeaEvents.treasure() + ' золота найдено!');
    if (type === 'invisible') {
      const s = state(); s.invisibleUntil = Date.now() + 30 * 60000; save(s); render();
      alert('👻 Невидимость активирована на 30 минут.');
    }
    if (type === 'weather') {
      const s = state(); s.weather = 1 + Math.floor(Math.random() * 8); save(s); render();
    }
    if (type === 'crashed') SeaEvents.crash();
    if (type === 'rojer') alert('🎁 Получено: ' + SeaEvents.rojerGift() + ' золота!');
    if (type === 'all') alert('🗺 Все объекты моря отображены.');
  }

  function init() {
    render();

    document.querySelectorAll('[data-move]').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = 4, d = btn.dataset.move;
        if (d === 'up') move(0, -step);
        if (d === 'down') move(0, step);
        if (d === 'left') move(-step, 0);
        if (d === 'right') move(step, 0);
      });
    });

    document.querySelectorAll('[data-sea-action]').forEach(btn => {
      btn.addEventListener('click', () => action(btn.dataset.seaAction));
    });

    document.getElementById('seaObjects')?.addEventListener('click', e => {
      const target = e.target.closest('[data-object]');
      if (!target) return;
      const s = state();
      const obj = (s.objects || []).find(o => o.id === target.dataset.object);
      if (obj) action(obj.type);
    });

    document.querySelector('[data-action="backCity"]')?.addEventListener('click', () => {
      location.href = './index.html';
    });
  }

  window.SeaGame = { state, save, render, move, action };
  document.addEventListener('DOMContentLoaded', init);
})();

(function () {
  'use strict';

  function city() {
    document.getElementById('cityScreen')?.classList.remove('hidden');
    document.getElementById('authScreen')?.classList.add('hidden');
    updateAll();
  }

  function openSea() {
    location.href = './sea.html';
  }

  function logout() {
    SeaStorage.logoutPlayer();
    updateAll();
  }

  document.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    if (action === 'openSea') openSea();
    if (action === 'backCity') city();
    if (action === 'logout') logout();

    if (action === 'openFishing') alert('🎣 Рыбалка готова. Используй startFishing().');
    if (action === 'openMining') alert('⛏️ Рудник готов. Используй startMining().');
    if (action === 'openMarket') alert('💰 Рынок готов.');
    if (action === 'openQuests') alert('📜 Квесты готовы.');
    if (action === 'openProfile') alert('👤 Профиль игрока: ' + (SeaStorage.getCurrentPlayer()?.login || ''));
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateAll();
    setInterval(() => {
      const p = SeaStorage.getCurrentPlayer();
      if (p) {
        const el = document.getElementById('cityTime');
        if (el) el.textContent = new Date().toLocaleTimeString('ru-RU');
      }
    }, 1000);
  });
})();

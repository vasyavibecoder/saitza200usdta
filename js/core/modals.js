(function () {
  'use strict';

  const root = document.getElementById('modalRoot');

  function openModal(id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.style.display = 'flex';
      return;
    }

    let html = '';
    if (id === 'loginModal') {
      html = `
        <div class="modal-overlay" id="loginModal">
          <div class="modal">
            <h2>Авторизация</h2>
            <div class="form-row"><label>Логин</label><input id="loginLogin" autocomplete="username"></div>
            <div class="form-row"><label>Пароль</label><input id="loginPassword" type="password" autocomplete="current-password"></div>
            <div class="modal-actions">
              <button class="but primary" data-submit="login">Войти</button>
              <button class="but" data-close>Закрыть</button>
            </div>
          </div>
        </div>`;
    }

    if (id === 'registerModal') {
      html = `
        <div class="modal-overlay" id="registerModal">
          <div class="modal">
            <h2>Регистрация</h2>
            <div class="form-row"><label>Логин</label><input id="regLogin" autocomplete="username"></div>
            <div class="form-row"><label>Пароль</label><input id="regPassword" type="password" autocomplete="new-password"></div>
            <div class="modal-actions">
              <button class="but primary" data-submit="register">Создать игрока</button>
              <button class="but" data-close>Закрыть</button>
            </div>
          </div>
        </div>`;
    }

    root.insertAdjacentHTML('beforeend', html);
    const modal = document.getElementById(id);
    modal?.addEventListener('click', e => {
      if (e.target.matches('[data-close]') || e.target === modal) closeModal(id);
      if (e.target.matches('[data-submit="login"]')) login();
      if (e.target.matches('[data-submit="register"]')) register();
    });
  }

  function closeModal(id) {
    document.getElementById(id)?.remove();
  }

  function login() {
    const login = document.getElementById('loginLogin')?.value.trim();
    const password = document.getElementById('loginPassword')?.value || '';
    const players = SeaStorage.getAllPlayers();

    if (!players[login] || players[login].password !== password) {
      alert('Неверный логин или пароль');
      return;
    }

    SeaStorage.saveCurrentPlayer(players[login]);
    closeModal('loginModal');
    updateAll();
  }

  function register() {
    const login = document.getElementById('regLogin')?.value.trim();
    const password = document.getElementById('regPassword')?.value || '';
    if (login.length < 3) return alert('Логин минимум 3 символа');
    if (password.length < 8) return alert('Пароль минимум 8 символов');

    const players = SeaStorage.getAllPlayers();
    if (players[login]) return alert('Такой игрок уже существует');

    const player = GamePlayer.createNewPlayer(login, password);
    SeaStorage.saveCurrentPlayer(player);
    closeModal('registerModal');
    updateAll();
  }

  window.openModal = openModal;
  window.closeModal = closeModal;
})();

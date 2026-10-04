(function () {
  'use strict';

  const PLAYERS_KEY = 'seawars_players';
  const CURRENT_KEY = 'seawars_current';

  function getAllPlayers() {
    try { return JSON.parse(localStorage.getItem(PLAYERS_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveAllPlayers(players) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
  }

  function getCurrentPlayer() {
    const login = localStorage.getItem(CURRENT_KEY);
    if (!login) return null;
    const players = getAllPlayers();
    return players[login] || null;
  }

  function saveCurrentPlayer(player) {
    if (!player || !player.login) return;
    const players = getAllPlayers();
    players[player.login] = player;
    saveAllPlayers(players);
    localStorage.setItem(CURRENT_KEY, player.login);
  }

  function logoutPlayer() {
    localStorage.removeItem(CURRENT_KEY);
  }

  window.SeaStorage = {
    getAllPlayers, saveAllPlayers,
    getCurrentPlayer, saveCurrentPlayer, logoutPlayer
  };
})();

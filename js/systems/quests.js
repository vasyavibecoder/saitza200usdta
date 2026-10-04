(function () {
  'use strict';

  const QUESTS = [
    { id: 'q1', name: 'Убить 10 торговцев', max: 10, reward: 100 },
    { id: 'q2', name: 'Поймать 50 рыб', max: 50, reward: 200 },
    { id: 'q3', name: 'Добыть 100 руды', max: 100, reward: 150 },
    { id: 'q4', name: 'Найти 5 сокровищ', max: 5, reward: 250 },
    { id: 'q5', name: 'Победить 3 монстров', max: 3, reward: 300 }
  ];

  window.QuestSystem = {
    list() {
      const p = SeaStorage.getCurrentPlayer();
      if (!p) return [];
      return QUESTS.map(q => ({
        ...q,
        progress: (p.quests && p.quests[q.id]) || 0
      }));
    }
  };
})();

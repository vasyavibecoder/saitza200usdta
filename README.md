# Sea refactor

Основа для переноса `/sea` из монолитного HTML/JS в отдельные модули.

## Структура

- `sea.html` — только разметка моря.
- `css/sea.css` — стили моря.
- `js/core/storage.js` — состояние игрока.
- `js/sea/sea.js` — состояние/движение/погода.
- `js/sea/sea-battle.js` — бои.
- `js/sea/sea-events.js` — события.
- `sea-assets-manifest.json` — точная карта assets из requests.json.
- `SEA_ASSETS.txt` — короткий список ресурсов.

## Локальные URL

Все ресурсы из дампа должны использоваться через `/assets/...`, а не через `https://game-seawar.com/...`.

Например:

`https://game-seawar.com/assets/icons/nav/pirat.png`

становится:

`/assets/icons/nav/pirat.png`

## Важно

Манifest не утверждает, что файлы уже физически находятся в проекте. Он отражает только то, что `requests.json` зафиксировал как успешно загруженные ресурсы.

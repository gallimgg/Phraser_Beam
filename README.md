# Phraser Beam

A small browser game inspired by Wheel of Fortune. Guess the hidden phrase while conserving blasts from your **Phraser Beam** blaster. Common letters cost more blasts!

## Running

Open `index.html` in any modern web browser. If the keyboard does not load phrases correctly, you may need to serve the files via a local web server due to browser security restrictions. For example:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Gameplay

1. A random phrase from `phrases.csv` is chosen.
2. Click letters on the on‑screen keyboard to guess them.
3. Each guess consumes blasts according to an inverse Scrabble score – rarer letters cost fewer blasts.
4. When all letters are revealed, a victory screen shows how many blasts you used.

Enjoy the whimsical aliens cheering you on!

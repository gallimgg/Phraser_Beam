let phrases = [];
let currentPhrase = '';
let displayed = [];
let blastsUsed = 0;
let letterCosts = {
  A:10,E:10,I:10,O:10,N:10,R:10,T:10,L:10,S:10,U:10,
  D:9,G:9,
  B:8,C:8,M:8,P:8,
  F:7,H:7,V:7,W:7,Y:7,
  K:6,
  J:3,X:3,
  Q:1,Z:1
};

async function loadPhrases() {
  const res = await fetch('phrases.csv');
  const text = await res.text();
  const lines = text.trim().split(/\n/);
  phrases = lines.slice(1); // skip header
}

function pickPhrase() {
  currentPhrase = phrases[Math.floor(Math.random()*phrases.length)].toUpperCase();
  displayed = Array.from(currentPhrase).map(ch => (ch === ' ' ? ' ' : '_'));
}

function renderPhrase() {
  const phraseDiv = document.getElementById('phrase');
  phraseDiv.textContent = displayed.join(' ');
}

function createKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  for (let i=65; i<=90; i++) {
    const letter = String.fromCharCode(i);
    const btn = document.createElement('button');
    btn.textContent = letter;
    if (currentPhrase.includes(letter)) {
      btn.classList.add('in-phrase');
    }
    btn.addEventListener('click', () => guess(letter, btn));
    kb.appendChild(btn);
  }
}

function updateBlasts() {
  document.getElementById('blasts').textContent = blastsUsed;
}

function showBeam() {
  const beam = document.getElementById('beam');
  beam.classList.remove('hidden');
  beam.addEventListener('animationend', () => {
    beam.classList.add('hidden');
  }, { once: true });
}

function guess(letter, btn) {
  btn.disabled = true;
  const cost = letterCosts[letter] || 10;
  blastsUsed += cost;
  updateBlasts();
  showBeam();
  let found = false;
  for (let i=0; i<currentPhrase.length; i++) {
    if (currentPhrase[i] === letter) {
      displayed[i] = letter;
      found = true;
    }
  }
  renderPhrase();
  checkEnd();
}

function checkEnd() {
  if (displayed.join('') === currentPhrase) {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('victory').classList.remove('hidden');
    document.getElementById('final-message').textContent =
      `Victory! It took ${blastsUsed} blasts.`;
  }
}

async function startGame() {
  blastsUsed = 0;
  updateBlasts();
  document.getElementById('victory').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  if (phrases.length === 0) {
    await loadPhrases();
  }
  pickPhrase();
  renderPhrase();
  createKeyboard();
}

document.getElementById('play-again').addEventListener('click', startGame);

startGame();

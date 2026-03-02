const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const rankingsEl = document.getElementById('rankings');

let score = 0;
let time = 30;
let moleTimeout;
let gameInterval;

// different mole types with color and point value
const moleTypes = [
  { color: 'brown', points: 1 },
  { color: 'green', points: 2 },
  { color: 'red', points: 3 }
];

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    // add a simple face inside the mole
    const face = document.createElement('div');
    face.classList.add('face');
    face.textContent = '🙂';
    mole.appendChild(face);
    hole.appendChild(mole);
    hole.addEventListener('click', () => hitMole(mole));
    board.appendChild(hole);
  }
}

function randomHole() {
  const holes = document.querySelectorAll('.hole');
  return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
  const hole = randomHole();
  const mole = hole.querySelector('.mole');
  // choose a random color/score type
  const type = moleTypes[Math.floor(Math.random() * moleTypes.length)];
  mole.style.backgroundColor = type.color;
  mole.dataset.points = type.points;
  // reset face when appearing
  const faceEl = mole.querySelector('.face');
  if (faceEl) faceEl.textContent = '🙂';
  mole.style.display = 'block';
  moleTimeout = setTimeout(() => {
    mole.style.display = 'none';
  }, 800);
}

function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  gameInterval = setInterval(() => {
    showMole();
  }, 1000);
  const timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      const name = prompt('Game over! Enter your name for the leaderboard:');
      if (name) saveScore(name, score);
      displayLeaderboard();
      alert('Game over! Your score: ' + score);
    }
  }, 1000);
}

function hitMole(mole) {
  if (mole.style.display === 'block') {
    const pts = parseInt(mole.dataset.points || '1', 10);
    score += pts;
    scoreEl.textContent = score;
    // change face to represent reaction
    const faceEl = mole.querySelector('.face');
    if (faceEl) faceEl.textContent = 'xD';
    mole.classList.add('hit');
    clearTimeout(moleTimeout);
    // keep the hit face visible shortly before hiding
    setTimeout(() => {
      mole.style.display = 'none';
      mole.classList.remove('hit');
    }, 200);
  }
}

// leaderboard persistence using localStorage
function loadLeaderboard() {
  const raw = localStorage.getItem('whackLeaderboard');
  return raw ? JSON.parse(raw) : [];
}

function saveLeaderboard(list) {
  localStorage.setItem('whackLeaderboard', JSON.stringify(list));
}

function saveScore(name, pts) {
  const list = loadLeaderboard();
  list.push({ name, score: pts, date: new Date().toISOString() });
  list.sort((a, b) => b.score - a.score);
  if (list.length > 20) list.length = 20; // keep top 20
  saveLeaderboard(list);
}

function displayLeaderboard() {
  const list = loadLeaderboard();
  rankingsEl.innerHTML = '';
  list.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} - ${entry.score}`;
    rankingsEl.appendChild(li);
  });
}

createBoard();
displayLeaderboard();
startGame();
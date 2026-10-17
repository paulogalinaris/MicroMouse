class MicromouseFloodFill {
  constructor(mode = 'center') {
    this.rows = 16;
    this.cols = 16;
    this.mode = mode;
    this.maze = Array.from({ length: 16 }, () => Array(16).fill(0));
    this.start = [15, 0];
  }

  getGoals() {
    if (this.mode === 'center') {
      return [[7, 7], [7, 8], [8, 7], [8, 8]];
    }
    return [[0, 15]];
  }

  computeFloodFill() {
    let dist = Array.from({ length: 16 }, () => Array(16).fill(Infinity));
    let queue = [];

    for (let [gr, gc] of this.getGoals()) {
      dist[gr][gc] = 0;
      queue.push([gr, gc]);
    }

    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
      let [r, c] = queue.shift();

      for (let [dr, dc] of directions) {
        let nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 16 && nc >= 0 && nc < 16) {
          if (this.maze[nr][nc] === 0 && dist[nr][nc] === Infinity) {
            dist[nr][nc] = dist[r][c] + 1;
            queue.push([nr, nc]);
          }
        }
      }
    }
    return dist;
  }
}

const solver = new MicromouseFloodFill('center');
const gridElement = document.getElementById('grid-container');
const btnMode = document.getElementById('btn-mode');
const btnClear = document.getElementById('btn-clear');

function renderGrid() {
  gridElement.innerHTML = '';
  const dist = solver.computeFloodFill();

  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      cell.innerText = dist[r][c] === Infinity ? '∞' : dist[r][c];

      if (solver.maze[r][c] === 1) {
        cell.classList.add('wall');
      }

      const isGoal = solver.getGoals().some(([gr, gc]) => gr === r && gr === c);
      if (isGoal) {
        cell.classList.add('goal');
      }

      if (r === solver.start[0] && c === solver.start[1]) {
        cell.classList.add('path');
        cell.innerText = 'S';
      }

      cell.addEventListener('click', () => {
        solver.maze[r][c] = solver.maze[r][c] === 1 ? 0 : 1;
        renderGrid();
      });

      gridElement.appendChild(cell);
    }
  }
}

if (btnMode) {
  btnMode.addEventListener('click', () => {
    solver.mode = solver.mode === 'center' ? 'corner' : 'center';
    btnMode.innerText = `Modo: ${solver.mode === 'center' ? 'Centro' : 'Canto'}`;
    renderGrid();
  });
}

if (btnClear) {
  btnClear.addEventListener('click', () => {
    solver.maze = Array.from({ length: 16 }, () => Array(16).fill(0));
    renderGrid();
  });
}

renderGrid();

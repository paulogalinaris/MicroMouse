const gridElement = document.getElementById('grid-container');
const solver = new MicromouseFloodFill('center');

// Desenha a grade na tela
function renderGrid() {
  gridElement.innerHTML = '';
  const dist = solver.computeFloodFill();
  const path = solver.getShortestPath(); // Função que busca o caminho

  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      // Mostra a distância do Flood Fill no texto da célula
      cell.innerText = dist[r][c] === Infinity ? '∞' : dist[r][c];

      // Se for parede
      if (solver.maze[r][c] === 1) cell.classList.add('wall');

      // Adiciona o evento de clique para colocar/tirar parede
      cell.addEventListener('click', () => {
        solver.maze[r][c] = solver.maze[r][c] === 1 ? 0 : 1;
        renderGrid(); // Atualiza a tela imediatamente!
      });

      gridElement.appendChild(cell);
    }
  }
}

renderGrid();

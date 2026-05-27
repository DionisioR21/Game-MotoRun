/**
 * main.js
 * Ponto de entrada. Inicializa sistemas e começa o loop.
 */

function initGame() {
  GameState.reset();
  Road.reset();
  Player.reset();
  ObstacleManager.reset();
  ParticleSystem.reset();
}

function initLobby() {
  // No lobby a estrada anima no fundo mas o jogo não começa
  Road.reset();
  Player.reset();  // posiciona a moto decorativa
}

// Inicializa input
InputHandler.init();

// Inicia no lobby
initLobby();

// Começa o loop
GameLoop.start();

// Clique no canvas também inicia o jogo
canvas.addEventListener('click', () => {
  if (GameState.isLobby()) initGame();
});

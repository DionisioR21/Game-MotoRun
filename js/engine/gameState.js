/**
 * gameState.js
 * Memória central do jogo. Todos os sistemas leem e escrevem aqui.
 */

const GameState = {
  state:      'LOBBY',      // 'LOBBY' | 'PLAYING' | 'GAMEOVER'
  speed:      SPEED_INITIAL,
  score:      0,
  highScore:  0,
  startTime:  Date.now(),
  scoreTimer: 0,
  spawnTimer: 0,

  reset() {
    this.state      = 'PLAYING';
    this.speed      = SPEED_INITIAL;
    this.score      = 0;
    this.startTime  = Date.now();
    this.scoreTimer = 0;
    this.spawnTimer = 0;
  },

  update(dt) {
    const elapsed = (Date.now() - this.startTime) / 1000;
    this.speed = Math.min(SPEED_MAX, SPEED_INITIAL + elapsed * SPEED_RATE);

    this.scoreTimer += dt;
    if (this.scoreTimer >= SCORE_TICK) {
      this.score++;
      this.scoreTimer = 0;
    }
  },

  setGameOver() {
    if (this.score > this.highScore) this.highScore = this.score;
    this.state = 'GAMEOVER';
  },

  isLobby()    { return this.state === 'LOBBY';    },
  isPlaying()  { return this.state === 'PLAYING';  },
  isGameOver() { return this.state === 'GAMEOVER'; }
};

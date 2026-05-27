/**
 * gameLoop.js
 * Loop principal com delta time.
 */

const GameLoop = {
  lastTime: 0,

  start() {
    requestAnimationFrame(ts => {
      this.lastTime = ts;
      requestAnimationFrame(ts => this.tick(ts));
    });
  },

  tick(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;
    this.update(dt);
    this.render();
    requestAnimationFrame(ts => this.tick(ts));
  },

  update(dt) {
    // A estrada e as partículas animam em todos os estados (lobby, playing, gameover)
    Road.update(dt);
    ParticleSystem.update(dt);

    if (GameState.isPlaying()) {
      GameState.update(dt);
      Player.update(dt);
      ParticleSystem.spawnTrail();
      SpawnSystem.update(dt);
      ObstacleManager.update(dt);

      if (CollisionSystem.check()) {
        ParticleSystem.spawnExplosion(Player.x, Player.y);
        GameState.setGameOver();
      }
    }
  },

  render() {
    Road.draw();
    ParticleSystem.draw();
    ObstacleManager.draw();
    Player.draw();

    if (GameState.isLobby())    { Screens.drawLobby();    return; }
    if (GameState.isGameOver()) { Screens.drawGameOver(); return; }

    HUD.draw();
  }
};

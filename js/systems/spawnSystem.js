/**
 * spawnSystem.js
 * Controla quando e onde novos obstáculos aparecem.
 *
 * O intervalo de spawn diminui conforme a velocidade aumenta,
 * tornando o jogo progressivamente mais difícil.
 */

const SpawnSystem = {
  update(dt) {
    GameState.spawnTimer += dt;

    // Intervalo diminui com a velocidade (mais rápido = mais obstáculos)
    const interval = Math.max(
      SPAWN_MIN,
      SPAWN_BASE - (GameState.speed - SPEED_INITIAL) * 0.12
    );

    if (GameState.spawnTimer >= interval) {
      GameState.spawnTimer = 0;
      this._spawn();
    }
  },

  _spawn() {
    const col   = OBS_COLUMNS[Math.floor(Math.random() * OBS_COLUMNS.length)];
    const scale = 0.85 + Math.random() * 0.25;
    ObstacleManager.add(col, -OBS_H - 10, scale);

    // Em velocidades altas, chance de spawnar dois juntos
    if (GameState.speed > SPAWN_DBL_SPEED && Math.random() < SPAWN_DBL_CHANCE) {
      let col2;
      do { col2 = OBS_COLUMNS[Math.floor(Math.random() * OBS_COLUMNS.length)]; }
      while (col2 === col);
      ObstacleManager.add(col2, -OBS_H - 30, 0.85 + Math.random() * 0.2);
    }
  }
};

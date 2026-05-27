/**
 * player.js
 * Moto controlada pelo jogador.
 *
 * Física:
 *   - Aceleração ao pressionar tecla
 *   - Fricção ao soltar (desacelera gradualmente)
 *   - Velocidade máxima limitada
 *   - Inclinação visual (tilt) interpolada suavemente
 */

const Player = {
  x: 0,
  y: 0,
  vx: 0,        // velocidade horizontal atual
  tilt: 0,      // ângulo de inclinação visual (radianos)
  spawnTime: 0, // para o efeito de piscar

  reset() {
    this.x         = (CANVAS_W - PLAYER_W) / 2;
    this.y         = CANVAS_H - PLAYER_H - 24;
    this.vx        = 0;
    this.tilt      = 0;
    this.spawnTime = Date.now();
  },

  update(dt) {
    const left  = InputHandler.left;
    const right = InputHandler.right;

    // Aplica aceleração ou fricção
    if      (left  && !right) this.vx -= PLAYER_ACCEL * dt;
    else if (right && !left)  this.vx += PLAYER_ACCEL * dt;
    else {
      if (Math.abs(this.vx) < PLAYER_FRIC * dt) this.vx = 0;
      else this.vx -= Math.sign(this.vx) * PLAYER_FRIC * dt;
    }

    // Limita velocidade
    this.vx = Math.max(-PLAYER_MAX_V, Math.min(PLAYER_MAX_V, this.vx));

    // Move horizontalmente
    this.x += this.vx * dt;

    // Bate nas bordas da pista
    if (this.x < LANE_LEFT)              { this.x = LANE_LEFT;              this.vx = 0; }
    if (this.x > LANE_RIGHT - PLAYER_W)  { this.x = LANE_RIGHT - PLAYER_W; this.vx = 0; }

    // Inclinação suave em direção ao valor alvo
    const targetTilt = (this.vx / PLAYER_MAX_V) * PLAYER_TILT;
    this.tilt += (targetTilt - this.tilt) * 12 * dt;
  },

  draw() {
    // Pisca nos primeiros BLINK_DURATION ms
    const elapsed = Date.now() - this.spawnTime;
    if (elapsed < BLINK_DURATION && Math.floor(elapsed / BLINK_INTERVAL) % 2 === 0) return;

    ctx.save();
    // Rotaciona em torno do centro da moto
    ctx.translate(this.x + PLAYER_W / 2, this.y + PLAYER_H / 2);
    ctx.rotate(this.tilt);
    ctx.translate(-PLAYER_W / 2, -PLAYER_H / 2);

    const x = 0, y = 0;

    // Roda traseira
    ctx.fillStyle = '#222'; rrect(x + 10, y + PLAYER_H - 18, PLAYER_W - 20, 16, 6);
    ctx.fillStyle = '#555'; rrect(x + 13, y + PLAYER_H - 15, PLAYER_W - 26, 10, 4);

    // Roda dianteira
    ctx.fillStyle = '#222'; rrect(x + 10, y + 2, PLAYER_W - 20, 16, 6);
    ctx.fillStyle = '#555'; rrect(x + 13, y + 5, PLAYER_W - 26, 10, 4);

    // Corpo
    ctx.fillStyle = '#cc2222'; rrect(x + 8, y + 14, PLAYER_W - 16, PLAYER_H - 30, 10);

    // Tanque
    ctx.fillStyle = '#aa1818'; rrect(x + 12, y + 22, PLAYER_W - 24, 18, 7);

    // Detalhe metálico
    ctx.strokeStyle = '#e05555'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x + 12, y + 31); ctx.lineTo(x + PLAYER_W - 12, y + 31); ctx.stroke();

    // Guidão
    ctx.strokeStyle = '#555'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + 5, y + 17); ctx.lineTo(x + PLAYER_W - 5, y + 17); ctx.stroke();

    // Capacete
    ctx.fillStyle = '#2233aa';
    ctx.beginPath(); ctx.ellipse(x + PLAYER_W / 2, y + 34, 9, 8, 0, 0, Math.PI * 2); ctx.fill();

    // Viseira
    ctx.fillStyle = 'rgba(150,200,255,0.45)';
    ctx.beginPath(); ctx.ellipse(x + PLAYER_W / 2 + 1, y + 33, 6, 4, -0.3, 0, Math.PI); ctx.fill();

    // Farol
    ctx.fillStyle = 'rgba(255,230,100,0.9)';
    ctx.beginPath(); ctx.ellipse(x + PLAYER_W / 2, y + 5, 7, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Brilho do farol
    ctx.fillStyle = 'rgba(255,255,200,0.55)';
    ctx.beginPath(); ctx.ellipse(x + PLAYER_W / 2, y + 4, 4, 2, 0, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  },

  // Hitbox menor que o sprite para ser mais justo
  getHitbox() {
    return { x: this.x + 8, y: this.y + 10, w: PLAYER_W - 16, h: PLAYER_H - 20 };
  }
};

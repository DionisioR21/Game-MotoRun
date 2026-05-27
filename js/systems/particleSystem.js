/**
 * particleSystem.js
 * Gerencia partículas de efeito visual.
 *
 * Cada partícula é um objeto simples com posição, velocidade,
 * vida (0–1) e cor. Quando life chega a 0, é removida.
 *
 * Usos:
 *   - Trail: rastro de poeira atrás da moto
 *   - Explosão: ao colidir com obstáculo
 */

const ParticleSystem = {
  list: [],

  spawnTrail() {
    if (Math.random() > TRAIL_CHANCE) return;
    this.list.push({
      x:     Player.x + PLAYER_W / 2 + (Math.random() - 0.5) * 10,
      y:     Player.y + PLAYER_H - 5,
      vx:    (Math.random() - 0.5) * 1.5,
      vy:    1.5 + Math.random() * 2,
      life:  1,
      r:     1.5 + Math.random() * 2.5,
      color: `hsla(${30 + Math.random() * 20}, 70%, 55%,`
    });
  },

  spawnExplosion(x, y) {
    const colors = [
      'rgba(255,100,50,', 'rgba(255,210,60,',
      'rgba(255,255,255,', 'rgba(180,180,180,'
    ];
    for (let i = 0; i < EXPLOSION_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      this.list.push({
        x:     x + PLAYER_W / 2,
        y:     y + PLAYER_H / 2,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed - 2.5,
        life:  1,
        r:     2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  },

  update(dt) {
    for (const p of this.list) {
      p.x    += p.vx;
      p.y    += p.vy;
      p.vy   += 0.1;         // gravidade leve
      p.life -= PARTICLE_DECAY;
    }
    this.list = this.list.filter(p => p.life > 0);
  },

  draw() {
    for (const p of this.list) {
      ctx.globalAlpha = Math.max(0, p.life * 0.8);
      ctx.fillStyle   = p.color + p.life + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },

  reset() { this.list = []; }
};

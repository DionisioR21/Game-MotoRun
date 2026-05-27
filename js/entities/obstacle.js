/**
 * obstacle.js
 * Gerencia a lista de obstáculos ativos: movimento e desenho.
 */

const ObstacleManager = {
  list: [],  // array de obstáculos ativos: { x, y, scale }

  add(x, y, scale) {
    this.list.push({ x, y, scale });
  },

  update(dt) {
    const move = GameState.speed * 60 * dt;
    for (const o of this.list) o.y += move;
    // Remove os que saíram da tela
    this.list = this.list.filter(o => o.y < CANVAS_H + OBS_H + 10);
  },

  draw() {
    for (const obs of this.list) this._drawOne(obs);
  },

  _drawOne(obs) {
    const w  = OBS_W * obs.scale;
    const h  = OBS_H * obs.scale;
    const ox = obs.x + (OBS_W - w) / 2;
    const oy = obs.y;

    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(ox + w / 2, oy + h + 4, w * 0.45, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face frontal
    ctx.fillStyle = '#b87828'; rrect(ox + 3, oy + 8, w - 6, h - 8, 3);

    // Face superior (efeito 3D)
    ctx.fillStyle = '#d4962e';
    ctx.beginPath();
    ctx.moveTo(ox + 3,     oy + 8); ctx.lineTo(ox + 12,    oy);
    ctx.lineTo(ox + w - 3, oy);     ctx.lineTo(ox + w - 3, oy + 8);
    ctx.closePath(); ctx.fill();

    // Face lateral direita
    ctx.fillStyle = '#8a5a18';
    ctx.beginPath();
    ctx.moveTo(ox + w - 3, oy + 8);  ctx.lineTo(ox + w - 3, oy);
    ctx.lineTo(ox + w + 4, oy + 5);  ctx.lineTo(ox + w + 4, oy + h - 3);
    ctx.lineTo(ox + w - 3, oy + h - 8);
    ctx.closePath(); ctx.fill();

    // Tábuas horizontais
    ctx.strokeStyle = '#8a5a18'; ctx.lineWidth = 1.2;
    for (let ly = oy + 20; ly < oy + h - 2; ly += 12) {
      ctx.beginPath(); ctx.moveTo(ox + 3, ly); ctx.lineTo(ox + w - 3, ly); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(ox + w / 2, oy + 8); ctx.lineTo(ox + w / 2, oy + h - 8); ctx.stroke();

    // Contorno
    ctx.strokeStyle = '#5a3a0a'; ctx.lineWidth = 1.5;
    ctx.beginPath(); rrect(ox + 3, oy + 8, w - 6, h - 8, 3); ctx.stroke();
  },

  getHitboxes() {
    return this.list.map(obs => ({
      x: obs.x + (OBS_W - OBS_W * obs.scale) / 2 + 5,
      y: obs.y + 5,
      w: OBS_W * obs.scale - 10,
      h: OBS_H * obs.scale - 10,
    }));
  },

  reset() { this.list = []; }
};

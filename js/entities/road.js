/**
 * road.js
 * Estrada com scroll infinito.
 *
 * Técnica de dois tiles:
 *   Dois retângulos do mesmo tamanho se movem juntos para baixo.
 *   Quando um sai pela base, é reposicionado acima do outro.
 *   O olho humano não percebe a transição — parece infinito.
 */

const Road = {
  y1: 0,
  y2: -CANVAS_H,

  update(dt) {
    const move = GameState.speed * 60 * dt;
    this.y1 += move;
    this.y2 += move;
    if (this.y1 >= CANVAS_H) this.y1 = this.y2 - CANVAS_H;
    if (this.y2 >= CANVAS_H) this.y2 = this.y1 - CANVAS_H;
  },

  draw() {
    this._drawTile(Math.floor(this.y1));
    this._drawTile(Math.floor(this.y2));
  },

  _drawTile(y) {
    // Asfalto escuro
    ctx.fillStyle = '#22222a';
    ctx.fillRect(0, y, CANVAS_W, CANVAS_H);

    // Céu no topo do tile
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, y, CANVAS_W, CANVAS_H * 0.27);

    // Acostamentos laterais
    ctx.fillStyle = '#3a3530';
    ctx.fillRect(0,           y + CANVAS_H * 0.27, 32, CANVAS_H);
    ctx.fillRect(CANVAS_W - 32, y + CANVAS_H * 0.27, 32, CANVAS_H);

    // Bordas brancas
    ctx.strokeStyle = '#d4d0b8';
    ctx.lineWidth   = 3;
    ctx.beginPath(); ctx.moveTo(32,           y + CANVAS_H * 0.27); ctx.lineTo(32,           y + CANVAS_H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CANVAS_W - 32, y + CANVAS_H * 0.27); ctx.lineTo(CANVAS_W - 32, y + CANVAS_H); ctx.stroke();

    // Faixas tracejadas amarelas
    ctx.strokeStyle = '#e8c840';
    ctx.lineWidth   = 2.5;
    ctx.setLineDash([28, 18]);
    ctx.beginPath(); ctx.moveTo(CANVAS_W / 3,       y + CANVAS_H * 0.27); ctx.lineTo(CANVAS_W / 3,       y + CANVAS_H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo((2 * CANVAS_W) / 3, y + CANVAS_H * 0.27); ctx.lineTo((2 * CANVAS_W) / 3, y + CANVAS_H); ctx.stroke();
    ctx.setLineDash([]);

    // Linha do horizonte
    ctx.strokeStyle = '#444455';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(0, y + CANVAS_H * 0.27); ctx.lineTo(CANVAS_W, y + CANVAS_H * 0.27); ctx.stroke();
  },

  reset() {
    this.y1 = 0;
    this.y2 = -CANVAS_H;
  }
};

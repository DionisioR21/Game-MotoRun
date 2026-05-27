/**
 * renderer.js
 * Referência ao canvas e contexto 2D.
 * Também contém helpers de desenho reutilizáveis.
 *
 * Centralizar aqui evita passar 'ctx' como parâmetro em todo lugar.
 */

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

/**
 * Desenha um retângulo com bordas arredondadas e preenche com a cor atual.
 * O Canvas API nativo não tinha fillRoundRect em versões antigas,
 * então construímos com quadraticCurveTo.
 */
function rrect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w,     y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r,     y + h);
  ctx.quadraticCurveTo(x,     y + h, x,     y + h - r);
  ctx.lineTo(x,         y + r);
  ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Mesmo que rrect mas apenas traça o contorno (stroke).
 */
function rrectStroke(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w,     y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r,     y + h);
  ctx.quadraticCurveTo(x,     y + h, x,     y + h - r);
  ctx.lineTo(x,         y + r);
  ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
  ctx.stroke();
}

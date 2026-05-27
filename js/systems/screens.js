/**
 * screens.js
 * Telas de UI: Lobby e Game Over.
 */

// ── Estrelas do fundo do lobby (geradas uma vez) ──────────────
const STARS = Array.from({ length: 55 }, () => ({
  x:    Math.random() * CANVAS_W,
  y:    Math.random() * CANVAS_H * 0.45,
  r:    0.5 + Math.random() * 1.8,
  a:    0.3 + Math.random() * 0.7,   // opacidade base
  spd:  0.4 + Math.random() * 1.2    // velocidade de piscar
}));

const Screens = {

  // ── TELA DE LOBBY ─────────────────────────────────────────────
  drawLobby() {
    const t = Date.now() / 1000;  // tempo em segundos para animações

    // Overlay gradiente sobre a estrada
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0,   'rgba(5,5,15,0.97)');
    grad.addColorStop(0.5, 'rgba(8,8,22,0.93)');
    grad.addColorStop(1,   'rgba(10,5,20,0.88)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // ── Estrelas piscando ──────────────────────────────────────
    for (const s of STARS) {
      const pulse = s.a * (0.6 + 0.4 * Math.sin(t * s.spd * 2 + s.x));
      ctx.globalAlpha = pulse;
      ctx.fillStyle   = '#fff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // ── Linha de luz horizontal (scan line decorativa) ─────────
    const scanY = 80 + Math.sin(t * 0.7) * 6;
    const scanGrad = ctx.createLinearGradient(0, scanY, CANVAS_W, scanY);
    scanGrad.addColorStop(0,    'rgba(255,68,68,0)');
    scanGrad.addColorStop(0.3,  'rgba(255,68,68,0.06)');
    scanGrad.addColorStop(0.5,  'rgba(255,68,68,0.12)');
    scanGrad.addColorStop(0.7,  'rgba(255,68,68,0.06)');
    scanGrad.addColorStop(1,    'rgba(255,68,68,0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 30, CANVAS_W, 60);

    // ── Logo principal ─────────────────────────────────────────
    const logoY = 148;

    // Sombra/glow do título
    ctx.shadowColor = '#ff3333';
    ctx.shadowBlur  = 28 + Math.sin(t * 1.8) * 10;
    ctx.fillStyle   = '#ff4444';
    ctx.font        = 'bold 52px Arial Black, sans-serif';
    ctx.textAlign   = 'center';
    ctx.fillText('MOTO', CANVAS_W / 2, logoY);

    ctx.shadowColor = '#ffcc00';
    ctx.shadowBlur  = 22 + Math.sin(t * 1.8) * 8;
    ctx.fillStyle   = '#ffd166';
    ctx.fillText('RUNNER', CANVAS_W / 2, logoY + 52);

    ctx.shadowBlur = 0;

    // Linha decorativa abaixo do logo
    const lineY = logoY + 68;
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W / 2 - 110, lineY);
    ctx.lineTo(CANVAS_W / 2 + 110, lineY);
    ctx.stroke();
    // Ponto central na linha
    ctx.globalAlpha = 0.8;
    ctx.fillStyle   = '#ffd166';
    ctx.beginPath();
    ctx.arc(CANVAS_W / 2, lineY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // ── Versão ─────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(120,120,160,0.7)';
    ctx.font      = '11px monospace';
    ctx.fillText('v1.0', CANVAS_W / 2, lineY + 18);

    // ── Moto decorativa no centro ──────────────────────────────
    this._drawDecoMoto(CANVAS_W / 2 - 23, 270, t);

    // ── Controles ──────────────────────────────────────────────
    this._drawControls(360);

    // ── Botão START (pulsa) ────────────────────────────────────
    const btnPulse = 0.85 + Math.sin(t * 3) * 0.08;
    const btnW = 200, btnH = 46;
    const btnX = (CANVAS_W - btnW) / 2;
    const btnY = 440;

    ctx.save();
    ctx.translate(CANVAS_W / 2, btnY + btnH / 2);
    ctx.scale(btnPulse, btnPulse);
    ctx.translate(-CANVAS_W / 2, -(btnY + btnH / 2));

    // Glow do botão
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur  = 18;
    ctx.fillStyle   = '#cc2020';
    rrect(btnX, btnY, btnW, btnH, 10);
    ctx.shadowBlur  = 0;

    // Borda brilhante
    ctx.strokeStyle = '#ff6666';
    ctx.lineWidth   = 1.5;
    ctx.beginPath(); rrectStroke(btnX, btnY, btnW, btnH, 10);

    // Texto
    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 17px Arial Black, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('▶  INICIAR', CANVAS_W / 2, btnY + 30);

    ctx.restore();

    // ── Dica de tecla ──────────────────────────────────────────
    ctx.fillStyle = 'rgba(140,140,180,0.6)';
    ctx.font      = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ou pressione qualquer tecla', CANVAS_W / 2, 510);

    // ── Rodapé ─────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(60,60,90,0.8)';
    ctx.font      = '10px monospace';
    ctx.fillText('© 2025 Moto Runner', CANVAS_W / 2, CANVAS_H - 14);

    ctx.textAlign = 'left';
  },

  // Moto decorativa simplificada para o lobby
  _drawDecoMoto(x, y, t) {
    const bob = Math.sin(t * 2.5) * 4;  // animação de subir/descer
    y += bob;

    // Glow sob a moto
    ctx.globalAlpha = 0.25 + Math.sin(t * 2.5) * 0.1;
    const glow = ctx.createRadialGradient(x + 23, y + 82, 2, x + 23, y + 82, 36);
    glow.addColorStop(0, '#ff4444');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(x - 10, y + 50, 70, 40);
    ctx.globalAlpha = 1;

    // Rodas
    ctx.fillStyle = '#222'; rrect(x + 10, y + 62, 26, 14, 5);
    ctx.fillStyle = '#555'; rrect(x + 13, y + 65, 20, 8,  3);
    ctx.fillStyle = '#222'; rrect(x + 10, y + 4,  26, 14, 5);
    ctx.fillStyle = '#555'; rrect(x + 13, y + 7,  20, 8,  3);

    // Corpo
    ctx.fillStyle = '#cc2222'; rrect(x + 8, y + 14, 30, 52, 8);
    ctx.fillStyle = '#aa1818'; rrect(x + 12, y + 22, 22, 16, 6);

    // Farol (pisca levemente)
    ctx.fillStyle = `rgba(255,230,100,${0.8 + Math.sin(t * 4) * 0.2})`;
    ctx.beginPath(); ctx.ellipse(x + 23, y + 7, 7, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Capacete
    ctx.fillStyle = '#2233aa';
    ctx.beginPath(); ctx.ellipse(x + 23, y + 32, 8, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(150,200,255,0.4)';
    ctx.beginPath(); ctx.ellipse(x + 24, y + 31, 5, 3.5, -0.3, 0, Math.PI); ctx.fill();

    // Guidão
    ctx.strokeStyle = '#555'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + 6, y + 17); ctx.lineTo(x + 40, y + 17); ctx.stroke();
  },

  // Instrução de controles
  _drawControls(y) {
    const items = [
      { key: 'A / ←', label: 'Esquerda' },
      { key: 'D / →', label: 'Direita'  },
    ];
    const spacing = 110;
    const startX  = CANVAS_W / 2 - spacing / 2;

    items.forEach((item, i) => {
      const cx = startX + i * spacing;

      // Fundo da tecla
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      rrect(cx - 40, y - 18, 80, 28, 7);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth   = 1;
      ctx.beginPath(); rrectStroke(cx - 40, y - 18, 80, 28, 7);

      // Texto da tecla
      ctx.fillStyle = '#ffd166';
      ctx.font      = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(item.key, cx, y - 1);

      // Label
      ctx.fillStyle = 'rgba(160,160,200,0.7)';
      ctx.font      = '11px sans-serif';
      ctx.fillText(item.label, cx, y + 18);
    });
  },

  // ── TELA DE GAME OVER ─────────────────────────────────────────
  drawGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    const pw = 300, ph = 220;
    const px = (CANVAS_W - pw) / 2;
    const py = (CANVAS_H - ph) / 2;

    ctx.fillStyle = '#12121e'; rrect(px, py, pw, ph, 16);
    ctx.strokeStyle = '#ff4444'; ctx.lineWidth = 2;
    ctx.beginPath(); rrectStroke(px, py, pw, ph, 16);

    ctx.fillStyle = '#ff4444';
    ctx.font      = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_W / 2, py + 68);

    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 19px sans-serif';
    ctx.fillText('Score: ' + GameState.score, CANVAS_W / 2, py + 108);

    if (GameState.score > 0 && GameState.score >= GameState.highScore) {
      ctx.fillStyle = '#ffd166';
      ctx.font      = 'bold 14px sans-serif';
      ctx.fillText('🏆 Novo recorde!', CANVAS_W / 2, py + 134);
    }

    ctx.fillStyle = '#aaa';
    ctx.font      = '14px sans-serif';
    ctx.fillText('Pressione  R  para reiniciar', CANVAS_W / 2, py + 170);

    ctx.fillStyle = '#ff4444'; rrect(CANVAS_W / 2 - 65, py + 182, 130, 26, 8);
    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 13px sans-serif';
    ctx.fillText('Toque aqui', CANVAS_W / 2, py + 199);

    ctx.textAlign = 'left';
  }
};

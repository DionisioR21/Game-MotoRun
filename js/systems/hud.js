/**
 * hud.js
 * HUD (Heads-Up Display) — elementos visuais fixos sobre o jogo.
 * Score, recorde e indicador de velocidade.
 */

const HUD = {
  draw() {
    // ── Painel de score (canto superior direito) ──────────────
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    rrect(CANVAS_W - 152, 8, 144, 52, 10);

    ctx.fillStyle = '#ffd166';
    ctx.font      = 'bold 20px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(String(GameState.score).padStart(6, '0'), CANVAS_W - 12, 34);

    ctx.fillStyle = '#aaa';
    ctx.font      = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE', CANVAS_W - 150, 22);

    ctx.fillStyle = '#666';
    ctx.fillText('BEST ' + String(GameState.highScore).padStart(6, '0'), CANVAS_W - 150, 51);

    // ── Indicador de velocidade (canto superior esquerdo) ─────
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    rrect(10, 8, 92, 30, 8);

    ctx.fillStyle = '#66ff88';
    ctx.font      = 'bold 13px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ ' + GameState.speed.toFixed(1) + 'x', 18, 27);
  }
};

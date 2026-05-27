/**
 * inputHandler.js
 * Captura teclado e toque.
 */

const InputHandler = {
  left:  false,
  right: false,

  init() {
    document.addEventListener('keydown', e => this._onKeyDown(e));
    document.addEventListener('keyup',   e => this._onKeyUp(e));
    canvas.addEventListener('touchstart', e => this._onTouch(e), { passive: false });
    canvas.addEventListener('touchend',   ()  => { this.left = false; this.right = false; });
  },

  _onKeyDown(e) {
    // Qualquer tecla no lobby inicia o jogo
    if (GameState.isLobby()) { initGame(); return; }

    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft')  this.left  = true;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.right = true;
    if ((e.key === 'r' || e.key === 'R') && GameState.isGameOver()) initGame();
  },

  _onKeyUp(e) {
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft')  this.left  = false;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.right = false;
  },

  _onTouch(e) {
    if (GameState.isLobby())   { initGame(); return; }
    if (GameState.isGameOver()) { initGame(); return; }
    const rect   = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const touchX = (e.touches[0].clientX - rect.left) * scaleX;
    if (touchX < CANVAS_W / 2) this.left = true;
    else                       this.right = true;
    e.preventDefault();
  }
};

# 🏍️ Moto Runner v1.0

Jogo de runner 2D infinito — HTML5 + JavaScript puro, sem dependências.

---

## 📁 Estrutura de Arquivos

```
MotoRunner/
│
├── index.html                  → Estrutura da página (HTML)
│
├── css/
│   ├── reset.css               → Zera estilos do navegador
│   ├── layout.css              → Posicionamento dos elementos
│   └── ui.css                  → Cores, fontes, visual
│
├── js/
│   ├── engine/                 → Base do jogo (não mude sem entender)
│   │   ├── constants.js        → Todas as constantes (números e configs)
│   │   ├── renderer.js         → Canvas, ctx e helpers de desenho
│   │   ├── inputHandler.js     → Teclado e toque
│   │   ├── gameState.js        → Estado central (score, speed, etc)
│   │   └── gameLoop.js         → Loop principal com delta time
│   │
│   ├── entities/               → Objetos do mundo do jogo
│   │   ├── road.js             → Estrada com scroll infinito
│   │   ├── player.js           → Moto do jogador
│   │   └── obstacle.js         → Obstáculos (caixas)
│   │
│   ├── systems/                → Sistemas independentes
│   │   ├── particleSystem.js   → Trail e explosão
│   │   ├── collisionSystem.js  → Detecção de colisão AABB
│   │   ├── spawnSystem.js      → Criação de obstáculos
│   │   ├── hud.js              → Score e velocidade na tela
│   │   └── screens.js          → Tela de Game Over
│   │
│   └── main.js                 → Inicializa tudo (último a carregar)
│
└── assets/                     → Coloque aqui sons e imagens futuras
```

---

## ▶️ Como Executar

**Opção 1 — Diretamente no navegador:**
Abra o arquivo `index.html` com duplo clique.
> ⚠️ Alguns navegadores bloqueiam scripts locais. Se não funcionar, use a opção 2.

**Opção 2 — Com servidor local (recomendado):**

Se tiver o VS Code, instale a extensão **Live Server** e clique em `Go Live`.

Ou via terminal:
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```
Acesse: `http://localhost:8080`

---

## 🎮 Controles

| Tecla | Ação |
|-------|------|
| `A` / `←` | Mover esquerda |
| `D` / `→` | Mover direita  |
| `R` | Reiniciar após Game Over |
| Toque esquerdo/direito | Mobile |

---

## ⚙️ Como Personalizar

**Mudar velocidade inicial:**
```js
// js/engine/constants.js
const SPEED_INITIAL = 3.0;  // aumente para começar mais rápido
```

**Mudar cor da moto:**
```js
// js/entities/player.js — procure por '#cc2222'
ctx.fillStyle = '#cc2222';  // mude para qualquer cor hex
```

**Adicionar novo obstáculo:**
1. Crie `js/entities/powerup.js` com estrutura similar ao `obstacle.js`
2. Adicione `<script src="js/entities/powerup.js"></script>` no `index.html`
3. Chame `Powerup.update(dt)` e `Powerup.draw()` em `gameLoop.js`

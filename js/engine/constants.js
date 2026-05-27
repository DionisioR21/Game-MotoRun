/**
 * constants.js
 * Todas as constantes do jogo num único lugar.
 * Nunca use números soltos no código — defina aqui e referencie pelo nome.
 */

// Canvas
const CANVAS_W = 400;
const CANVAS_H = 600;

// Pista
const LANE_LEFT  = 35;
const LANE_RIGHT = CANVAS_W - 35;

// Player
const PLAYER_W     = 46;
const PLAYER_H     = 80;
const PLAYER_ACCEL = 1200;   // px/s²
const PLAYER_MAX_V = 280;    // px/s
const PLAYER_FRIC  = 900;    // px/s²
const PLAYER_TILT  = 0.18;   // radianos

// Obstáculos
const OBS_W = 46;
const OBS_H = 46;
const OBS_COLUMNS = [42, 100, 160, 218, 278, 318];

// Velocidade
const SPEED_INITIAL = 3.0;
const SPEED_MAX     = 10.0;
const SPEED_RATE    = 0.08;  // aumento por segundo

// Spawn
const SPAWN_BASE   = 1.8;   // segundos entre obstáculos
const SPAWN_MIN    = 0.5;
const SPAWN_DBL_SPEED  = 5.5;
const SPAWN_DBL_CHANCE = 0.3;

// Score
const SCORE_TICK = 0.1;  // +1 ponto a cada 0.1s

// Partículas
const TRAIL_CHANCE     = 0.4;
const EXPLOSION_COUNT  = 28;
const PARTICLE_DECAY   = 0.035;

// Piscar ao spawnar
const BLINK_DURATION = 1500;
const BLINK_INTERVAL = 130;

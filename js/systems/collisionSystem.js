/**
 * collisionSystem.js
 * Detecta colisão entre o player e os obstáculos.
 *
 * Algoritmo AABB (Axis-Aligned Bounding Box):
 *   Dois retângulos colidem se NÃO estão separados em nenhum eixo.
 *   É a forma mais simples e eficiente de colisão 2D.
 *
 *   Colide se:
 *     A.esquerda < B.direita  E  A.direita > B.esquerda
 *     A.topo     < B.base     E  A.base    > B.topo
 */

const CollisionSystem = {
  check() {
    const p = Player.getHitbox();

    for (const obs of ObstacleManager.getHitboxes()) {
      if (p.x < obs.x + obs.w &&
          p.x + p.w > obs.x   &&
          p.y < obs.y + obs.h &&
          p.y + p.h > obs.y) {
        return true;  // colidiu!
      }
    }
    return false;
  }
};

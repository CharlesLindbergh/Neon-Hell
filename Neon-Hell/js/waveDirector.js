import { Enemy } from "./enemies.js";

export class WaveDirector {
  constructor(players) {
    this.players = players;
    this.enemies = [];
    this.spawnTimer = 0;
  }

  update() {
    this.spawnTimer++;

    if (this.spawnTimer > 60) {
      this.spawn();
      this.spawnTimer = 0;
    }

    this.enemies.forEach(e => e.update());
  }

  spawn() {
    const target =
      this.players[Math.floor(Math.random() * this.players.length)];

    const angle = Math.random() * Math.PI * 2;
    const dist = 600;

    const x = target.x + Math.cos(angle) * dist;
    const y = target.y + Math.sin(angle) * dist;

    this.enemies.push(new Enemy(x, y, target));
  }

  draw(ctx) {
    this.enemies.forEach(e => e.draw(ctx));
  }
}
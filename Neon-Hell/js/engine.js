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
    const p = this.players[Math.floor(Math.random() * this.players.length)];

    this.enemies.push({
      x: p.x + (Math.random() - 0.5) * 800,
      y: p.y + (Math.random() - 0.5) * 800,
      update() {
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        const len = Math.hypot(dx, dy);
        this.x += (dx / len) * 2;
        this.y += (dy / len) * 2;
      },
      draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  draw(ctx) {
    this.enemies.forEach(e => e.draw(ctx));
  }
}
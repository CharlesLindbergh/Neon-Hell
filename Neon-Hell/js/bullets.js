export class Bullet {
  constructor() {
    this.active = false;
  }

  spawn(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.radius = 4;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.active = true;
  }

  update() {
    if (!this.active) return;

    this.x += this.vx;
    this.y += this.vy;

    // Despawn far away
    if (Math.abs(this.x) > 5000 || Math.abs(this.y) > 5000) {
      this.active = false;
    }
  }

  draw(ctx) {
    if (!this.active) return;

    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class BulletPool {
  constructor(size = 200) {
    this.pool = [];
    for (let i = 0; i < size; i++) {
      this.pool.push(new Bullet());
    }
  }

  shoot(x, y, angle) {
    const bullet = this.pool.find(b => !b.active);
    if (bullet) {
      bullet.spawn(x, y, angle);
    }
  }

  update() {
    this.pool.forEach(b => b.update());
  }

  draw(ctx) {
    this.pool.forEach(b => b.draw(ctx));
  }
}
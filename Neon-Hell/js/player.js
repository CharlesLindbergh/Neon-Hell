import { Input } from "./input.js";

export class Player {
  constructor(x, y, color, controls) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.controls = controls;
    this.speed = 4;

    this.fireCooldown = 0;
  }

  update(bulletPool) {
    if (Input.isDown(this.controls.up)) this.y -= this.speed;
    if (Input.isDown(this.controls.down)) this.y += this.speed;
    if (Input.isDown(this.controls.left)) this.x -= this.speed;
    if (Input.isDown(this.controls.right)) this.x += this.speed;

    // Auto fire
    this.fireCooldown--;
    if (this.fireCooldown <= 0) {
      const angle = Math.random() * Math.PI * 2;
      bulletPool.shoot(this.x, this.y, angle);
      this.fireCooldown = 15;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}
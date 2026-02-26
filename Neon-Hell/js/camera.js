export class Camera {
  constructor(players) {
    this.players = players;
    this.x = 0;
    this.y = 0;
  }

  update() {
    let midX = 0;
    let midY = 0;

    this.players.forEach(p => {
      midX += p.x;
      midY += p.y;
    });

    midX /= this.players.length;
    midY /= this.players.length;

    this.x = midX - window.innerWidth / 2;
    this.y = midY - window.innerHeight / 2;
  }

  apply(ctx) {
    ctx.translate(-this.x, -this.y);
  }
}
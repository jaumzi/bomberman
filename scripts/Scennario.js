import { CanvasItem } from "./CanvasItem.js";

export class Scennario extends CanvasItem {
  commands;
  position;
  size;
  obstacles = [];
  playersRespawn;

  constructor(position = { x: 0, y: 0 }) {
    super();

    this.position = position;
    this.size = { w: 50, h: 50 };

    this.playersRespawn = [
      { x: 0, y: 0 },
      { x: this.canvas.width - this.size.w, y: 0 },
      { x: 0, y: this.canvas.height - this.size.h },
      { x: this.canvas.width - this.size.w, y: this.canvas.height - this.size.h },
      { x: (this.canvas.width - this.size.w) / 2, y: (this.canvas.height - this.size.h) / 2 },
    ];
    console.log(this.playersRespawn);

  }

  update() {
    const newObstacles = [];

    for (var i = 10; i < 100; i += 15) {
      const x = (this.canvas.width * i) / 100;
      for (var j = 10; j < 100; j += 22.5) {
        const y = (this.canvas.height * j) / 100;

        this.createObstacle(x, y, this.size.w, this.size.h);
        newObstacles.push({
          xMin: x,
          xMax: x + this.size.w,
          yMin: y,
          yMax: y + this.size.h,
        });
      }
    }

    this.obstacles = newObstacles;
  }

  createObstacle(x, y, w, h) {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(x, y, w, h);
  }

}
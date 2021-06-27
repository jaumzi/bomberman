import { CanvasItem } from "./CanvasItem.js";

export class Scennario extends CanvasItem {
  commands;
  position;
  sizeObjectInScennario;
  obstacles = [];
  rows = 25;
  columns = 25;
  playersRespawn;

  constructor(position = { x: 0, y: 0 }) {
    super();

    this.position = position;
    this.sizeObjectInScennario = {
      w: this.canvas.width / this.rows,
      h: this.canvas.height / this.columns
    };

    this.playersRespawn = [
      { x: 0, y: 0 },
      { x: this.canvas.width - this.sizeObjectInScennario.w, y: 0 },
      { x: 0, y: this.canvas.height - this.sizeObjectInScennario.h },
      { x: this.canvas.width - this.sizeObjectInScennario.w, y: this.canvas.height - this.sizeObjectInScennario.h },
      // { x: (this.canvas.width - this.sizeObjectInScennario.w) / 2, y: (this.canvas.height - this.sizeObjectInScennario.h) / 2 },
    ];

    this.createScennario();
  }

  update() {
    this.context.beginPath();
    for (var i = 0; i < this.obstacles.length; i++) {
      if (!!this.obstacles[i]) {
        this.createObstacle(
          this.obstacles[i].x,
          this.obstacles[i].y,
          this.sizeObjectInScennario.w,
          this.sizeObjectInScennario.h
        );
      }
    }
    this.context.closePath();
  }

  createObstacle(x, y, w, h) {
    this.context.fillStyle = 'yellow';
    this.context.rect(x, y, w, h);
    this.context.fill();

    // this.context.lineWidth = 1;
    // this.context.strokeStyle = '#fff';
    // this.context.stroke();
  }

  createScennario() {
    const meioX = this.canvas.width / 2;
    const meioY = this.canvas.height / 2;

    let lastIsObstacleX = false;
    let lastIsObstacleY = true;

    for (var j = 0; j <= (this.canvas.height - this.sizeObjectInScennario.h); j += this.sizeObjectInScennario.h) {
      const y = j;
      for (var i = 0; i <= (this.canvas.width - this.sizeObjectInScennario.w); i += this.sizeObjectInScennario.w) {
        const x = i;

        if (
          !lastIsObstacleX &&
          !lastIsObstacleY &&
          x !== 0 &&
          x < (this.canvas.width - this.sizeObjectInScennario.w - (this.sizeObjectInScennario.w / 2)) &&
          y !== 0 &&
          y < (this.canvas.height - this.sizeObjectInScennario.h - (this.sizeObjectInScennario.h / 2)) &&
          !(
            (x > meioX - (this.sizeObjectInScennario.w * 3)) && (x < meioX + (this.sizeObjectInScennario.w * 2)) &&
            (y > meioY - (this.sizeObjectInScennario.h * 3)) && (y < meioY + (this.sizeObjectInScennario.h * 2))
          )
        ) {
          this.obstacles.push({ x, y });
          lastIsObstacleX = true;
        } else {
          this.obstacles.push(null);
          lastIsObstacleX = false;
        }
      }

      lastIsObstacleY = !lastIsObstacleY;
    }
  }
}
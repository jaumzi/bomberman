import { CanvasItem } from "./CanvasItem.js";

export class Bomb extends CanvasItem {
  commands;
  position;
  radius;
  timeToExplode = 2000;
  exploded = false;

  constructor(position = { x: 0, y: 0 }, radius = 10) {
    super();

    this.position = position;
    this.radius = radius;

    this.countDownToExplode();
  }

  update() {
    if (!this.exploded) {
      const { x, y } = this.position;

      this.context.beginPath();
      this.context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'green';
      this.context.fill();
      this.context.lineWidth = 2;
      this.context.strokeStyle = '#003300';
      this.context.stroke();
      this.context.closePath();
    }
    console.log('update');
  }

  countDownToExplode() {
    setTimeout(() => {
      this.exploded = true;
    }, this.timeToExplode);
  }

}
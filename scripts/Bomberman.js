import { Bomb } from "./Bomb.js";
import { CanvasItem } from "./CanvasItem.js";

export class Bomberman extends CanvasItem {
  commands;
  position;
  size;
  distanceMoviment = 0.6;
  bombs = [];
  numberOfBombForPlant = 1;
  isPlayable;

  constructor(position = { x: 0, y: 0 }, size = { h: 50, w: 50 }, isPlayable = false) {
    super();

    this.position = position;
    this.size = size;
    this.isPlayable = isPlayable;
    
    this.addcommands();
  }

  update() {
    if (this.isPlayable) {
      this.executeComands();
    }

    const { x, y } = this.position;
    const { w, h } = this.size;

    this.context.fillStyle = 'red';
    this.context.fillRect(x, y, w, h);

    this.bombs.forEach(bomb => bomb.update());

    // limpar as bombas
    this.bombs.forEach(bomb => {
      if (bomb.exploded) {
        bomb = null; // delete
        this.numberOfBombForPlant++;
      }
    });
    this.bombs = this.bombs.filter(bomb => bomb && !bomb.exploded);
  }

  addcommands() {
    this.commands = {
      'ArrowUp': () => {
        this.position.y -= this.distanceMoviment;

        if (this.position.y < 0) {
          this.position.y = 0;
        }
      },
      'ArrowDown': () => {
        this.position.y += this.distanceMoviment;

        if (this.position.y > this.canvas.height - this.size.h) {
          this.position.y = this.canvas.height - this.size.h;
        }
      },
      'ArrowRight': () => {
        this.position.x += this.distanceMoviment;

        if (this.position.x > this.canvas.width - this.size.w) {
          this.position.x = this.canvas.width - this.size.w;
        }
      },
      'ArrowLeft': () => {
        this.position.x -= this.distanceMoviment;

        if (this.position.x < 0) {
          this.position.x = 0;
        }
      },
      'Space': () => { // plantar bomba
        if (this.numberOfBombForPlant > 0) {
          this.numberOfBombForPlant--;

          const centerX = this.position.x + (this.size.w / 2);
          const centerY = this.position.y + (this.size.h / 2);

          // const bombId = new Date().getTime();
          const bomb = new Bomb({ x: centerX, y: centerY });
          this.bombs.push(bomb);
        }
      }
    };
  }

}
export class CanvasItem {
  rootElement;
  canvas;
  context;

  constructor() {
    this.rootElement = document.getElementById('game-root');
    this.canvas = document.getElementById('game-content');

    this.canvas.width = this.rootElement.offsetWidth;
    this.canvas.height = this.rootElement.offsetHeight;

    this.context = this.canvas.getContext('2d');
  }

  executeComands() {
    Object.entries(this.commands).forEach(([key, command]) => {
      if(!!window.keyEvent[key]) {
        command();
      }
    });
  }
}
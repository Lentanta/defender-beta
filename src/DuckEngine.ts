export class DuckEngine {
  canvasWidth: number;
  canvasHeight: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  global: Record<string, any> = {};

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    this.ctx = canvas.getContext('2d') || new CanvasRenderingContext2D();
    document.body.appendChild(this.canvas);
  };

  initialize(callback: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void) {
    callback(this.ctx, this.canvas);
  };

  update(callback: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => void) {
    const gameLoop = () => {
      requestAnimationFrame((time: number) => {
        callback(this.ctx, this.canvas, time);
        gameLoop();
      });
    };
    gameLoop();
  };

  // Mouse event
  mouseMove(callback: (e: MouseEvent) => void) {
    document.body.addEventListener('mousemove', callback);
  };

  mouseLeave(callback: (e: MouseEvent) => void) {
    this.canvas.addEventListener("mouseleave", callback);
  };

  mouseClick(callback: (e: MouseEvent) => void) {
    this.canvas.addEventListener("click", callback);
  };
}
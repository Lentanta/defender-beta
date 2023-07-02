const duckEngine = (
  canvasWidth: number,
  canvasHeight: number,
  callback: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void) => {
    
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d') || new CanvasRenderingContext2D();

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  callback(ctx, canvas)
  document.body.appendChild(canvas);
};

export default duckEngine;
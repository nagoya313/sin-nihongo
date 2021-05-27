import { Kage, Polygons, Buhin } from '@kurgm/kage-engine';

export const clearGlyph = (canvas: HTMLCanvasElement) => {
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  // Non Null Assertion OperatorだとESLintの警告が鬱陶しいので
  if (ctx === null) {
    throw new Error('ctx is not CanvasRenderingContext2D');
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return ctx;
};

export const drawGlyph = (buhin: Buhin, canvas: HTMLCanvasElement, key?: string) => {
  const ctx = clearGlyph(canvas);

  if (typeof key === 'undefined') {
    return;
  }

  const kage = new Kage();
  kage.kBuhin = buhin;

  const polygons = new Polygons();
  kage.makeGlyph(polygons, key);

  ctx.fillStyle = 'rgb(0, 0, 0)';

  for (const polygon of polygons.array) {
    ctx.beginPath();
    ctx.moveTo(polygon.array[0].x, polygon.array[0].y);
    for (const vertex of polygon.array.slice(1)) {
      ctx.lineTo(vertex.x, vertex.y);
    }
    ctx.closePath();
    ctx.fill();
  }
};

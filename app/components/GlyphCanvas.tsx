import { Layer, Rect, Stage } from 'react-konva';

const GlyphCanvas = () => {
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Rect stroke="black" strokeWidth={2} x={0} y={0} width={200} height={200} />
      </Layer>
    </Stage>
  );
};

export default GlyphCanvas;

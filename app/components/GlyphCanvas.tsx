import { useColorModeValue } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { Layer, Rect, Shape, Stage } from 'react-konva';
import { makeGlyph } from '~/kage/kageData';

type GlyphCanvasProps = {
  name?: string;
  buhin?: Buhin;
};

const GlyphCanvas = ({ name, buhin }: GlyphCanvasProps) => {
  const color = useColorModeValue('black', 'white');

  return (
    <Stage width={200} height={200}>
      <Layer>
        <Rect stroke={color} strokeWidth={2} x={0} y={0} width={200} height={200} />
        {name != null && buhin != null && (
          <Shape
            sceneFunc={(ctx, shape) =>
              makeGlyph(name, buhin).array.forEach((polygon) => {
                ctx.beginPath();
                ctx.moveTo(polygon.array[0]!.x, polygon.array[0]!.y);
                polygon.array.slice(1).forEach((vertex) => ctx.lineTo(vertex.x, vertex.y));
                ctx.closePath();
                ctx.fillStrokeShape(shape);
              })
            }
            fill={color}
            stroke={color}
            strokeWidth={0.2}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default GlyphCanvas;

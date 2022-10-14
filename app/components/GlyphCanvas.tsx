import { useColorModeValue } from '@chakra-ui/react';
import { Kage, Polygons, type Buhin } from '@kurgm/kage-engine';
import { Shape } from 'react-konva';
import CanvasBase from './CanvasBase';

type GlyphCanvasProps = {
  name?: string;
  buhin?: Buhin;
};

const GlyphCanvas = ({ name, buhin }: GlyphCanvasProps) => {
  const fill = useColorModeValue('black', 'white');
  if (name == null || buhin == null) return <CanvasBase />;

  const kage = new Kage();
  kage.kBuhin = buhin;
  const polygons = new Polygons();
  kage.makeGlyph(polygons, name);

  return (
    <CanvasBase>
      <Shape
        sceneFunc={(ctx, shape) =>
          polygons.array.forEach((polygon) => {
            ctx.beginPath();
            ctx.moveTo(polygon.array[0]!.x, polygon.array[0]!.y);
            polygon.array.slice(1).forEach((vertex) => ctx.lineTo(vertex.x, vertex.y));
            ctx.closePath();
            ctx.fillStrokeShape(shape);
          })
        }
        fill={fill}
        stroke={fill}
        strokeWidth={0.2}
      />
    </CanvasBase>
  );
};

export default GlyphCanvas;

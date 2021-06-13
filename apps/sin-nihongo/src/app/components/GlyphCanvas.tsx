import React from 'react';
import { Layer, Rect, Shape, Stage } from 'react-konva';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core/styles';
import { Buhin, Kage, Polygons } from '@kurgm/kage-engine';

const CanvasBox = withTheme(styled(Box)`
  margin: ${(props) => props.theme.spacing(1)}px;
  position: relative;
  width: 200px;
  height: 200px;
`);

export type GlyphCanvasProps = {
  name?: string;
  buhin?: Buhin;
};

const BaseCanvas: React.FC = ({ children }) => (
  <CanvasBox>
    <Stage width={200} height={200}>
      <Layer>
        <Rect stroke="black" strokeWidth={2} x={0} y={0} width={200} height={200} />
        {children}
      </Layer>
    </Stage>
  </CanvasBox>
);

export const GlyphCanvas: React.FC<GlyphCanvasProps> = ({ name, buhin }) => {
  if (name && buhin) {
    const kage = new Kage();
    kage.kBuhin = buhin;

    const polygons = new Polygons();
    kage.makeGlyph(polygons, name);

    return (
      <BaseCanvas>
        <Shape
          sceneFunc={(ctx, shape) => {
            for (const polygon of polygons.array) {
              ctx.beginPath();
              ctx.moveTo(polygon.array[0].x, polygon.array[0].y);
              for (const vertex of polygon.array.slice(1)) {
                ctx.lineTo(vertex.x, vertex.y);
              }
              ctx.closePath();
              ctx.fillStrokeShape(shape);
            }
          }}
          fill="black"
          stroke="black"
          strokeWidth={0.2}
        />
      </BaseCanvas>
    );
  }

  return <BaseCanvas />;
};

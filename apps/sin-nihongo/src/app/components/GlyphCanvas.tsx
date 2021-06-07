import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core/styles';
import { BuhinContext } from '../providers/Buhin';
import { drawGlyph } from '../utils/canvas';

const CanvasBox = withTheme(styled(Box)`
  margin: ${(props) => props.theme.spacing(1)}px;
  position: relative;
  width: 200px;
  height: 200px;
`);

const Canvas = styled.canvas`
  border: 1px solid gray;
  background-color: white;
`;

type Props = {
  name?: string;
};

export const GlyphCanvas: React.FC<Props> = ({ name }) => {
  const buhin = useContext(BuhinContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawGlyph(buhin, canvasRef.current, name);
    }
  }, [buhin, name]);

  return (
    <CanvasBox>
      <Canvas ref={canvasRef} width="200px" height="200px" />
    </CanvasBox>
  );
};

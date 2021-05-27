import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { withTheme } from '@material-ui/core/styles';
import { Buhin } from '@kurgm/kage-engine';
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

interface Props {
  readonly buhin: Buhin;
  readonly name?: string;
}

export const GlyphCanvas: React.FC<Props> = ({ buhin, name }) => {
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

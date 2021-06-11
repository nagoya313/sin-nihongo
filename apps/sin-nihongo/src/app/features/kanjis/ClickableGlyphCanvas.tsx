import React from 'react';
import Button from '@material-ui/core/Button';
import { GlyphCanvas, GlyphCanvasProps } from '../../components/GlyphCanvas';
import { useEditable } from '../../utils/useEditable';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & GlyphCanvasProps;

export const ClickableGlyphCanvas: React.FC<Props> = ({ name, onClick }) => {
  const isEditable = useEditable();
  const canvas = <GlyphCanvas name={name} />;

  return isEditable ? <Button onClick={onClick}>{canvas}</Button> : canvas;
};

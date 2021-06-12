import React, { useContext } from 'react';
import { Button } from '../../components/Button';
import { GlyphCanvas, GlyphCanvasProps } from '../../components/GlyphCanvas';
import { EditableContext } from '../../providers/Editable';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & GlyphCanvasProps;

export const ClickableGlyphCanvas: React.FC<Props> = ({ name, onClick }) => {
  const isEditable = useContext(EditableContext);

  const canvas = <GlyphCanvas name={name} />;

  return isEditable ? <Button onClick={onClick}>{canvas}</Button> : canvas;
};

import { useColorModeValue } from '@chakra-ui/react';
import { Layer, Rect, Stage } from 'react-konva';

const CanvasBase = ({ children }: React.PropsWithChildren) => {
  const stroke = useColorModeValue('black', 'white');

  return (
    <Stage width={200} height={200}>
      <Layer>
        <Rect stroke={stroke} strokeWidth={2} x={0} y={0} width={200} height={200} />
        {children}
      </Layer>
    </Stage>
  );
};

export default CanvasBase;

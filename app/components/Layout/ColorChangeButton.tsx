import { IconButton, useColorMode } from '@chakra-ui/react';
import { MdLightMode, MdNightlight } from 'react-icons/md';

const ColorChangeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="change color mode"
      variant="ghost"
      color="gray.400"
      fontSize={20}
      icon={colorMode === 'light' ? <MdNightlight /> : <MdLightMode />}
    />
  );
};

export default ColorChangeButton;

import React from 'react';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

type Props = PopperProps & { children: React.ReactElement };

export const FadePopper: React.FC<Props> = ({ children, ...others }) => {
  return (
    <Popper {...others} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          {children}
        </Fade>
      )}
    </Popper>
  );
};

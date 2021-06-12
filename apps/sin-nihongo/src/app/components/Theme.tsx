import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
  },
  props: {
    MuiTextField: {
      variant: 'filled',
    },
  },
});

export const ThemeProvider: React.FC = ({ children }) => <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;

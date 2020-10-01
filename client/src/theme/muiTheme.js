import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#3f3f3f',
      main: '#151515',
      dark: '#141414',
      contrastText: '#fff',
    },
  },
});

export default theme;
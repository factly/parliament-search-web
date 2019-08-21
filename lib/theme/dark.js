import { createMuiTheme } from '@material-ui/core/styles';

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: '#0cf2eb',
    },
    background: {
      header: '#333333',
      search: '#757575',
    },
  },
});

export default dark;

import { createMuiTheme } from '@material-ui/core/styles';

const light = createMuiTheme({
  palette: {
    type: 'light',
    secondary: {
      main: '#0cf2eb',
    },
    background: {
      header: '#1976d2',
      search: '#448bd9',
    },
  },
});

export default light;

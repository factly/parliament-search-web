import { createMuiTheme } from '@material-ui/core/styles';

const dark = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0
        },
        '&:before': {
          display: 'none'
        },
        '&$expanded': {
          margin: 'auto'
        }
      },
      expanded: {}
    },
    MuiExpansionPanelSummary: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
          minHeight: 56
        },
        paddingLeft: '16px',
        paddingRight: '12px'
      },
      content: {
        '&$expanded': {
          margin: '12px 0'
        }
      },
      expanded: {}
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '12px 16px',
        width: '100%;'
      }
    }
  }
});

export default dark;

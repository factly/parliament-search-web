import React from 'react';
import { makeStyles , Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme : Theme) => ({
    img : {
      margin : 'auto',
    }
  })); 
const Spinner = () => {
  const classes = useStyles();

  return <Grid container justify="center"><img alt="loading..." src="/static/images/spinner.gif"  /></Grid>
}

export default Spinner;
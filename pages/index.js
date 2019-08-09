import React from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  wrapper: {
    padding: 32,
  },
  media: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  topic: {
    minWidth: 100
  }
});

const HomePage = ({ filters }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.topics}>
        <Paper>
          <Grid container spacing={3}>
          {
            filters.topics.map((x, i) => (
              <Grid item md={2} sm={6} key={i}>
                <div className={classes.topic}>
                  <CardContent>
                    <Typography align="center" variant="subtitle2" gutterBottom>
                      {x.name}
                    </Typography>
                  </CardContent>   
                </div>
              </Grid>
            ))
          }
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);
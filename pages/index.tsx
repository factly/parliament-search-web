import React from 'react';
import { connect } from 'react-redux';
//import * as PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppState } from '../store/reducers';

interface typeTopics{
 topics : { name : string , id : number } []
}

const useStyles = makeStyles({ 
  wrapper: {
    padding: 32,
  },
  media: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  topic: {
    minWidth: 100,
  },
});

const HomePage: React.FC<typeTopics> = ({ topics }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.topic}>
        <Paper>
          <Grid container spacing={3}>
            {
            topics.map((x : {name : string , id : number}) => (
              <Grid item md={2} sm={6} key={x.id}>
                <div className={classes.topic}>
                  <CardContent>
                    <Typography align="center" variant="subtitle2">
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
};
/*
HomePage.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
*/
const mapStateToProps = (state: AppState) => ({
  topics: state.filters.topics,
});

export default connect(mapStateToProps)(HomePage);

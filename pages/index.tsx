import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AppState } from '../store/reducers';
import TopicBox from '../components/TopicBox';
import { TypeMinistries, TypeId } from '../types';

const useStyles = makeStyles({
  wrapper: {
    padding: 32
  },
  media: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  topic: {
    minWidth: 100
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer'
  }
});

const HomePage = ({
  topic,
  ministries
}: {
  topic: TypeId[];
  ministries: TypeMinistries;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.topic}>
        <Grid container spacing={3}>
          {topic.map((x: TypeId) => (
            <Grid item md={3} sm={6} key={x.id}>
              <TopicBox topic={x} ministries={ministries[x.id]} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
/*
HomePage.propTypes = {
  topic: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
*/
const mapStateToProps = (state: AppState) => ({
  topic: state.filters.topic,
  ministries: state.ministries
});

export default connect(mapStateToProps)(HomePage);

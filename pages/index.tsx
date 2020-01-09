import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { AppState } from '../store/reducers';
import TopicBox from '../components/TopicBox';
import { TypeCheckBoxFilter } from '../types';

const HomePage = ({ topic }: { topic: TypeCheckBoxFilter[] }): JSX.Element => {
  return (
    <div className="wrapper">
      <div className="topic">
        <Grid container spacing={3}>
          {topic.map((x: TypeCheckBoxFilter) => (
            <Grid item md={3} sm={6} key={x.id}>
              <TopicBox topic={x} />
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
const mapStateToProps = (state: AppState): { topic: TypeCheckBoxFilter[] } => ({
  topic: state.filters.topic
});

export default connect(mapStateToProps)(HomePage);

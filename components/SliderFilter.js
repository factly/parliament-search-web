import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Slider from '@material-ui/core/Slider';

import { selectedActions } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    cursor: 'pointer',
  },
  eachFilter: {
    borderRadius: theme.spacing(0),
  },
}));

const SliderFilter = ({ dispatch, heading, selected }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const handleChange = (event, value) => {
    dispatch(selectedActions.setAge(value));
  };


  return (
    <Card className={classes.eachFilter}>
      <CardHeader
        onClick={() => setShow(!show)}
        className={classes.cardHeader}
        title={(
          <Typography variant="body2" gutterBottom>
            {heading}
          </Typography>
)}
        action={(
          <IconButton aria-label="settings">
            { show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
)}
      />
      <Collapse in={show} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <Slider
            value={selected.age}
            min={25}
            max={100}
            step={5}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  selected: state.selected,
});

export default connect(mapStateToProps)(SliderFilter);

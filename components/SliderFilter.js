import React from 'react';
import { connect } from "react-redux";

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Slider from '@material-ui/core/Slider';

import { selectedActions } from '../store/actions'
const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    cursor: 'pointer'
  },
}));

const SliderFilter = (props) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false)
  
  const handleChange = (event, value) => {
    props.dispatch(selectedActions.setAge(value))
  };


  return (
    <div>
      <CardHeader 
        onClick={() => setShow(!show)}
        className={classes.cardHeader}
        title={
          <Typography variant="body2" gutterBottom >
            {props.heading}
          </Typography>
        }
        action={
          <IconButton aria-label="settings">
          { show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} 
          </IconButton>
        }
      />
      <Collapse in={show} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <Slider
            value={props.selected.age}
            min={25}
            max={100}
            step={5}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </CardContent>
      </Collapse>
    </div>
  )
}
const mapStateToProps = state => ({
  selected: state.selected
});

export default connect(mapStateToProps)(SliderFilter);
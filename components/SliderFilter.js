import React from 'react';
import PropTypes from 'prop-types';

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

const marks = [
  {
    value: 25,
    label: 'Min',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 80,
    label: '80',
  },
  {
    value: 100,
    label: 'Max',
  },
];

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

const SliderFilter = ({ toogle, heading, selected }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

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
            value={selected}
            min={25}
            max={100}
            step={5}
            onChange={toogle}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            marks={marks}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

SliderFilter.propTypes = {
  toogle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SliderFilter;

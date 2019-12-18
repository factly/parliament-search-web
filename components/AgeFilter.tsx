import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface filterProps {
  toogle: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  heading: string;
  selected: number[];
}

const marks = [
  {
    value: 25,
    label: 'Min'
  },
  {
    value: 40,
    label: '40'
  },
  {
    value: 60,
    label: '60'
  },
  {
    value: 80,
    label: '80'
  },
  {
    value: 100,
    label: 'Max'
  }
];

const AgeFilter = ({ toogle, heading, selected }: filterProps) => (
  <ExpansionPanel square>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body2">{heading}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
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
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

AgeFilter.propTypes = {
  toogle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default AgeFilter;

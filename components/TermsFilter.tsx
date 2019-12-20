import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const marks = [
  {
    value: 0,
    label: 'any'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 8,
    label: '8'
  },
  {
    value: 10,
    label: '10'
  }
];

const TermsFilter = ({
  toogle,
  heading,
  selected
}: {
  toogle: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  heading: string;
  selected: number;
}) => (
  <ExpansionPanel square>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body2">{heading}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Slider
        defaultValue={selected}
        min={0}
        max={10}
        step={1}
        onChange={toogle}
        valueLabelDisplay="auto"
        aria-labelledby="discrete-slider"
        marks={marks}
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

TermsFilter.propTypes = {
  toogle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default TermsFilter;

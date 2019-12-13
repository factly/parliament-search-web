import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface marksType {
  value: number;
  label: string;
}
interface filterProps {
  toogle: (...args: any[]) => void;
  heading: string;
  selected: number[] | number;
  marks: marksType[];
}

const SliderFilter = ({ toogle, heading, selected, marks }: filterProps) => (
  <ExpansionPanel square>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body2">{heading}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {heading == 'Age' ? (
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
      ) : (
        <Slider
          value={selected}
          min={1}
          max={9}
          step={1}
          onChange={toogle}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          marks={marks}
        />
      )}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

SliderFilter.propTypes = {
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

export default SliderFilter;

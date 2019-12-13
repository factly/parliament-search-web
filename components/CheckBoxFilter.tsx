import React from 'react';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  content: {
    width: '100%'
  }
});

interface checkBoxProps {
  defaultShow: boolean;
  list: { name: string; id: number }[];
  heading: string;
  search: boolean;
  selected: number[];
  toogle: (...args: number[]) => void;
  limit: number;
}

const CheckBoxFilter = ({
  defaultShow,
  list,
  heading,
  search,
  selected,
  toogle,
  limit
}: checkBoxProps) => {
  const classes = useStyles();
  const [term, setTerm] = React.useState('');
  const [options, setOptions] = React.useState(list);

  React.useEffect(() => {
    if (term.trim().length !== 0) {
      setOptions(
        list.filter(value =>
          value.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else setOptions(list);
  }, [term]);

  const Row = ({ index, style }: { index: number; style: any }) => (
    <FormControlLabel
      style={style}
      control={
        <Checkbox
          checked={selected.indexOf(options[index].id) !== -1}
          onChange={() => toogle(options[index].id)}
        />
      }
      label={options[index].name}
    />
  );

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
  };

  return (
    <ExpansionPanel square defaultExpanded={defaultShow}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2">{heading}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.content}>
          <div>
            {search ? (
              <Input
                fullWidth
                placeholder="Search..."
                value={term}
                onChange={event => {
                  setTerm(event.target.value);
                }}
              />
            ) : null}
          </div>
          <div>
            <FixedSizeList
              height={limit * 40}
              width="100%"
              itemSize={40}
              itemCount={options.length}
            >
              {Row}
            </FixedSizeList>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CheckBoxFilter.propTypes = {
  defaultShow: PropTypes.bool,
  search: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  heading: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  toogle: PropTypes.func.isRequired
};

CheckBoxFilter.defaultProps = {
  defaultShow: false,
  search: false
};

export default CheckBoxFilter;

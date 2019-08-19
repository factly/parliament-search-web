import React from 'react';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.spacing(0),
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
  listRow: {
    paddingLeft: theme.spacing(1),
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const CheckBoxFilter = ({
  defaultShow, list, heading, search, selected, toogle, limit,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(defaultShow);
  const [term, setTerm] = React.useState('');
  const [options, setOptions] = React.useState(list);

  React.useEffect(() => {
    if (term.trim().length !== 0) {
      setOptions(list.filter((value) => value.name.toLowerCase().includes(term.toLowerCase())));
    } else setOptions(list);
  }, [term]);

  const Row = ({ index, style }) => (
    <FormControlLabel
      style={style}
      control={(
        <Checkbox
          checked={selected.indexOf(options[index].id) !== -1}
          onChange={() => toogle(options[index].id)}
        />
      )}
      label={options[index].name}
    />
  );

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return (
    <Card className={classes.card}>
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
          <div>
            <div>
              {
                search ? (
                  <Input
                    fullWidth
                    placeholder="Search..."
                    value={term}
                    onChange={(event) => { setTerm(event.target.value); }}
                  />
                ) : null
              }
            </div>
            <div>
              <FixedSizeList height={limit * 40} width="100%" itemSize={40} itemCount={options.length}>
                {Row}
              </FixedSizeList>
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

CheckBoxFilter.propTypes = {
  defaultShow: PropTypes.bool,
  search: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  heading: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  toogle: PropTypes.func.isRequired,
};

CheckBoxFilter.defaultProps = {
  defaultShow: false,
  search: false,
};

export default CheckBoxFilter;

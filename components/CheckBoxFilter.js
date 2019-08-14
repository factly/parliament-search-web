import React from 'react';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  paddingZero: {
    padding: theme.spacing(0),
  },
  dataList: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 250,
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  listRow: {
    paddingLeft: theme.spacing(1),
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    cursor: 'pointer',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  selectedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
  },
  selected: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
  },
  eachFilter: {
    borderRadius: theme.spacing(0),
  },
}));

const CheckBoxFilter = ({
  defaultShow, list, heading, search, selected, toogle, limit,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(defaultShow);
  const [term, setTerm] = React.useState('');

  const filtersList = () => {
    if (term.length === 0) return list;

    const newList = [];
    list.find((value) => {
      if (value.name.toLowerCase().includes(term.toLowerCase())) newList.push(value);
    });
    return newList;
  };

  const dummyList = filtersList();
  const Row = ({ index, style }) => (
    <ListItem
      style={style}
      key={dummyList[index].id}
      className={classes.listRow}
      dense
      onClick={() => toogle(dummyList[index].id)}
    >
      <ListItemIcon>
        <Checkbox
          className={classes.paddingZero}
          checked={selected.indexOf(dummyList[index].id) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `checkbox-list-label-${dummyList[index].id}` }}
        />
      </ListItemIcon>
      <ListItemText id={`checkbox-list-label-${dummyList[index].id}`} primary={dummyList[index].name} />
    </ListItem>
  );

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
          {
            search ? (
              <Input
                placeholder="Search..."
                value={term}
                onChange={(event) => { setTerm(event.target.value); }}
                className={classes.input}
              />
            ) : null
          }
          <div>
            <FixedSizeList height={limit * 40} width="100%" itemSize={40} itemCount={filtersList().length}>
              {Row}
            </FixedSizeList>
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

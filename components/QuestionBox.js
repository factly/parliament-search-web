import React from 'react';
import { connect } from "react-redux";


import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  asked: {
    marginRight: theme.spacing(0.5)
  },
  paddingOne: {
    padding: theme.spacing(1),
  },
  marginBottomOne: {
    marginBottom: theme.spacing(1)
  },
}));

const QuestionBox = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={classes.marginBottomOne}>
          <Typography variant="h6">Government Medical College</Typography>
        </div>
        <div className={classes.marginBottomOne}>
          <div>
            <Typography variant="subtitle2">Asked By</Typography>
          </div>
          <div>
            <div className={classes.askedRoot}>
              <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full MP Name Full MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} />
              <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} />
              <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} />
              <Chip onClick={() => console.log("Okay")} className={classes.asked}label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} />
            </div>
          </div>
        </div>
        <div>
          <Typography variant="subtitle2">In Lok Sabha to Ministry of Space on 26 Jan, 2019</Typography>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(QuestionBox);
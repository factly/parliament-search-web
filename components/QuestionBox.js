import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  asked: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer'
  },
}));


const QuestionBox = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" gutterBottom><Link href={`/questions/${1}`} underline="none" color="inherit" >Government Medical College </Link></Typography>
      <Typography variant="subtitle2" gutterBottom>Asked By</Typography>
      <div className={classes.asked}>
        <div className={classes.askedRoot}>
          <Link href={`/members/${1}`} underline="none" ><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} /></Link>
          <Link href={`/members/${1}`} underline="none"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} /></Link>
          <Link href={`/members/${1}`} underline="none"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} /></Link>
          <Link href={`/members/${1}`} underline="none"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} /></Link>
        </div>
      </div>
      <Typography variant="subtitle2">In <Link href={`/houses/${1}`} underline="none" color="inherit"  >Lok Sabha</Link> to ministry of <Link href={`/ministries/${1}`} underline="none" color="inherit" >Human Resource Department </Link> on 26 Jan, 2019</Typography>
    </div>
  );
};

export default QuestionBox;

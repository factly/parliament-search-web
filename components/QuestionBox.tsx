import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles , Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme : Theme) => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  asked: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer'
  },
  link : {
    textDecoration : "none",
    color : "inherit"
  }
}));

const QuestionBox = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" gutterBottom><Link href="/questions/[qid]" as="/questions/1"><a className={classes.link}>Government Medical College</a></Link></Typography>
      <Typography variant="subtitle2" gutterBottom>Asked By</Typography>
      <div className={classes.asked}>
        <div className={classes.askedRoot}>
          <Link href="/members/[mid]" as="/members/1"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} /></Link>
          <Link href="/members/[mid]" as="/members/1"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} /></Link>
          <Link href="/members/[mid]" as="/members/1"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} /></Link>
          <Link href="/members/[mid]" as="/members/1"><Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} /></Link>
        </div>
      </div>
      <Typography variant="subtitle2">In <Link href="/houses/[mid]" as="/houses/1"><a className={classes.link}>Lok Sabha</a></Link> to ministry of <Link href="/ministries/[msid]" as="/ministries/1"><a className={classes.link}>Human Resource Department</a></Link> on 26 Jan, 2019</Typography>
    </div>
  );
};

export default QuestionBox;

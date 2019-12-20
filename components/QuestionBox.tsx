import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TypeQuestionBy, TypeQuestionBox } from '../types';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  asked: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const QuestionBox = ({ question }: { question: TypeQuestionBox }) => {
  const classes = useStyles();
  const { QID, questionBy, subject, ministry, date } = question;
  return (
    <div>
      <Typography variant="h6">
        <Link href="/questions/[qid]" as={`/questions/${QID}`}>
          <a className={classes.link}>{subject}</a>
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        Lok Sabha · {ministry} · {moment.unix(+date / 1000).fromNow(true)}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Asked By
      </Typography>
      <div className={classes.asked}>
        <div className={classes.askedRoot}>
          {questionBy
            .filter((each: TypeQuestionBy) => each !== null)
            .map((each: TypeQuestionBy) => (
              <Link
                key={QID + each.MID}
                href="/members/[mid]"
                as={`/members/${each.MID}`}
              >
                <Chip
                  className={classes.asked}
                  label={each.name}
                  avatar={
                    <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
                  }
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;

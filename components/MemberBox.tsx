import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TypeMemberData, TypeMemberTerms } from '../types';
import { Avatar, Chip } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  asked: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  text: {
    textDecoration: 'none'
  },
  large: {
    width: 100,
    height: 100
  }
}));

const MemberBox = ({ member }: { member: TypeMemberData }): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        <Link href="/members/[mid]" as={`/members/${member.MID}`}>
          <a className="link">{member.name}</a>
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        {member.dob ? moment.unix(+member.dob / 1000).fromNow(true) : null} ·{' '}
        {member.education ? member.education : null}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Terms
      </Typography>
      <div className={classes.asked}>
        <div className={classes.askedRoot}>
          {member.terms
            ? member.terms
                .filter((each: TypeMemberTerms) => each !== null)
                .map((each: TypeMemberTerms, index: number) => (
                  <Chip
                    key={member.MID + index}
                    className={classes.asked}
                    label={`${each.geography.name} (${each.geography.parent.name})`}
                    avatar={<Avatar src="/static/images/bjp.png" />}
                  />
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default MemberBox;

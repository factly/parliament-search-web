import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { TypeQuestionBy, TypeQuestionBox } from '../types';
import moment from 'moment';

const QuestionBox = ({
  question
}: {
  question: TypeQuestionBox;
}): JSX.Element => {
  const { QID, questionBy, subject, ministry, date, house } = question;
  return (
    <div>
      <Typography variant="h6">
        <Link href="/questions/[qid]" as={`/questions/${QID}`}>
          <a className="link">{subject}</a>
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        {house.name} · {ministry.name} ·
        {moment.unix(+date / 1000).fromNow(true)}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Asked By
      </Typography>
      <div className="asked">
        <div className="askedRoot">
          {questionBy
            .filter((each: TypeQuestionBy) => each !== null)
            .map((each: TypeQuestionBy) => (
              <Link
                key={QID + each.MID}
                href="/members/[mid]"
                as={`/members/${each.MID}`}
              >
                <a className="link">
                  <Chip
                    className="chip"
                    label={each.name}
                    avatar={
                      <Avatar
                        src={`/static/images/${each.gender.toLowerCase()}.png`}
                      />
                    }
                  />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;

// TODO add answer by ministry
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { getQuestionById } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { TypeQuestionBy, TypeQuestionData } from '../../types';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CircularProgress from '@material-ui/core/CircularProgress';

const QuestionPage = ({
  question
}: {
  question: TypeQuestionData;
}): JSX.Element => {
  if (!question || !question.answer)
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Card>
        <div>
          <CardHeader
            title={question.subject}
            subheader={`${moment
              .unix(+question.date / 1000)
              .fromNow()} · Lok Sabha`}
          />
        </div>
        <CardContent>
          <Typography variant="h6">Question</Typography>
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
        </CardContent>
        <CardContent>
          <Typography variant="h6">Asked By</Typography>
          <div>
            {question.questionBy.map((member: TypeQuestionBy) => (
              <Link
                key={question.QID + member.MID}
                href="/members/[mid]"
                as={`/members/${member.MID}`}
              >
                <a className="link">
                  <Chip
                    className="chip"
                    label={member.name}
                    avatar={
                      <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
                    }
                  />
                </a>
              </Link>
            ))}
          </div>
        </CardContent>
        <CardContent>
          <Typography variant="h6">Answer</Typography>
          <div dangerouslySetInnerHTML={{ __html: question.answer }} />
        </CardContent>
        <CardContent>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <a
              href={question.englishPdf as string}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <ListItem>
                <ListItemIcon>
                  <AttachmentIcon />
                </ListItemIcon>
                <ListItemText primary="English PDF" />
              </ListItem>
            </a>
            <a
              href={question.hindiPdf as string}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <ListItem>
                <ListItemIcon>
                  <AttachmentIcon />
                </ListItemIcon>
                <ListItemText primary="Hindi PDF" />
              </ListItem>
            </a>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

QuestionPage.getInitialProps = async ({ store, query }: any): Promise<void> => {
  if (
    !store.getState().questions[+query.qid] ||
    !store.getState().questions[+query.qid].answer
  )
    await store.dispatch(getQuestionById(+query.qid));
};

const mapStateToProps = (
  state: AppState,
  props: any
): {
  question: TypeQuestionData;
} => ({
  question: state.questions[+props.router.query.qid]
});
export default withRouter(connect(mapStateToProps)(QuestionPage));

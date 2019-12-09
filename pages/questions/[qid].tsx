// TODO add answer by ministry
import React from 'react';
import {connect} from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ShareIcon from '@material-ui/icons/Share';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles , createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { getQuestionById } from '../../store/apollo';
import { AppState } from '../../store/reducers';
import { typeQuestionBy } from '../../types';

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    asked: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    link : {
      textDecoration : 'none',
      color : 'inherit',
      cursor : 'pointer'
    }
  }),
);

const questionPage = ({dispatch, questions} : any) => {
  const qid = +useRouter().query.qid;
  const classes = useStyles();
  let question = questions[qid];
  React.useEffect(() => {
    if(!question || !question.answer)
      dispatch(getQuestionById(qid))
  },[]);
  if(!question || !question.answer)
    return (<div>loading...</div>)
  else{
    console.log(question)
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
          <Card>
            <div>
              <CardHeader
                title = {question.subject}
                subheader={`${question.date} · Lok Sabha`}
                action={
                  <IconButton aria-label="share">
                    <ShareIcon/>
                  </IconButton>
                }
              />
            </div>
            <CardContent>
              <Typography variant="h6">Question</Typography>
              <div >
                  {
                  question.question
                }
              </div>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Asked By</Typography>
              <div >
                {question.questionBy.map((member:typeQuestionBy) => <Link href="/members/[mid]" as={`/members/${member.MID}`}><a className={classes.link}><Chip className={classes.asked} label={member.name}  avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} /></a></Link>)}
              </div>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Answer</Typography>
              <Typography variant="body1">
                {question.answer}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
          <Card>
            <CardHeader
              title = "Recent Questions to Ministry"
            />
            <CardContent>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
    </div>            
  )};
};

const mapStateToProps =(state:AppState) => ({
  questions : state.questions
})
export default connect(mapStateToProps)(questionPage);

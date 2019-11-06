import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import QuestionBox from '../../components/QuestionBox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) =>
  createStyles({
    img : {
      margin : theme.spacing(2),
      width: '80%',
      height: '80%',
    },
    marginTopOne : {
      marginTop : theme.spacing(0.7)
    },
    marginBottomOne : {
      marginBottom : theme.spacing(1.5)
    }
  }),
);


const membersPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid >
        <Card>
          <CardHeader
            title= "Ajay Kumar"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid md={2}>
                <Avatar alt="Mp's image" src="/static/images/mp.jpg" className={classes.img}/>
              </Grid>
              <Grid md={8}>
                <Typography>
                  Gender : Male
                </Typography>
                <Typography>
                  Birthplace : Hyderabad 
                </Typography>
                <Typography>
                  Birthdate : 26-01-1989 
                </Typography>
                <Typography>
                  Marital Status : Married 
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title = "Overview"
        />
        <CardContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in 
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem Ipsum            
        </CardContent>
      </Card>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title = "Popular Questions"
          action = {
            <Link href = {`/search?states=1`} underline="none">
              <Button>
                All Questions
              </Button>
            </Link>
          }
        />
        <CardContent>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
        </CardContent>  
      </Card>
    </div>
  )
}

export default membersPage;
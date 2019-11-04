import PropTypes from 'prop-types';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import QuestionBox from '../../components/QuestionBox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    img : {
      margin : theme.spacing(2),
      width: '80%',
      height: '80%',
    },
    root: {
      flexGrow: 1,
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Overview" />
          <Tab label="Popular Questions" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in 
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem Ipsum            
      </TabPanel>
      <TabPanel value={value} index={1}>
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
      </TabPanel>
      </Card>
    </div>
  )
}

export default membersPage;
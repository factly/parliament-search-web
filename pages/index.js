import React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DefaultLayout from '../layouts/index';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
const searchWidth = 600;

const useStyles = makeStyles({
  header: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto', 
    width: searchWidth,
  },
  topics: {
    marginTop: 48
  },
  inputroot: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    marginTop : 16,
  },
  select: {
    width: searchWidth / 6,
    backgroundColor: ''
  },
  input: {
    marginLeft: 16,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: '28',
    margin: 4,
  },
  wrapper: {
    padding: 32,
  },
  parliament: {
    height: 300
  },
  media: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  topic: {
    minWidth: 100
  }
});

export default function Home() {
  const classes = useStyles();
  const [which, setWhich] = React.useState('all');
  const [search, setSearch] = React.useState('');

  var searchFunc = function(){
    Router.push('/search')
  }
  
  const sector = [
    {
      name: "Agriculture",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    },{
      name: "Art & Culture",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    },{
      name: "Commerce",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/banking_0.png?itok=uTYj50ur"
    },{
      name: "Mining",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/industries.png?itok=WgX-EftK"
    },{
      name: "Parliamentary Affairs",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    },{
      name: "Water & Sanitation",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/irregation.png?itok=4qhp3OE3"
    },{
      name: "Information & Communications",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/law-order.png?itok=F0przl3c"
    },{
      name: "Defence",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Economy",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/banking_0.png?itok=uTYj50ur"
    },{
      name: "Education & Skilling",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Environment & Forest",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Water Resources",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Finance",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Food",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Foreign Affairs",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Governance & Administration",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Health & Family Welfare",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Home Affairs, Law & Order",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Housing",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    },{
      name: "Industries",
      src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
    
    }
  ]

  return (
    <DefaultLayout>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <CardMedia
            className={classes.parliament}
            image="/static/images/parliament.png"
            title="Contemplative Reptile"
          />
          <Paper className={classes.inputroot}>
            <Select
              disableUnderline={true}
              onChange={(event) => {setWhich(event.target.value)}}
              className={classes.select}
              value={which}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'topics'}>Topics</MenuItem>
              <MenuItem value={'members'}>Members</MenuItem>
            </Select>
            <Divider className={classes.divider} />
            <InputBase
              onChange={(event) => {setSearch(event.target.value)}}
              value={search}
              className={classes.input}
              placeholder="Search anything"
            />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={() => searchFunc()}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className={classes.topics}>
          <Paper>
            <Grid container spacing={3}>
            {
              sector.map((x, i) => (
                <Grid item md={2} sm={6} key={i}>
                  <div className={classes.topic}>
                    <CardMedia
                      className={classes.media}
                      image={x.src}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography align="center" variant="subtitle2" gutterBottom>
                        {x.name}
                      </Typography>
                    </CardContent>   
                  </div>
                </Grid>
              ))
            }
            </Grid>
          </Paper>
        </div>
      </div>
    </DefaultLayout>
  );
}
import React from 'react'
import Head from "next/head";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CategoryIcon from '@material-ui/icons/Category';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  image: {
    width: 250,
    height: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const DefaultLayout = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div>
      <Head>
        <title>Factly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <div
            className={classes.list}
            role="presentation"
            onClose={() => setMobileOpen(false)}
            onKeyDown={() => setMobileOpen(false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon><AddLocationIcon /></ListItemIcon>
                <ListItemText primary={"States"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary={"Topics"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </div>
  )
}
export default DefaultLayout;
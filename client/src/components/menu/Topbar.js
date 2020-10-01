import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import HomeIcon from '@material-ui/icons/Home';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const Topbar = props => {
    const{ className, onDrawerOpen, isOpen, ...rest } = props;
    const classes = useStyles();

    return(
        <AppBar
        {...rest}  // assuming this prings in the rest of the props?
        position="absolute"
        className={clsx(className, classes.appBar, isOpen && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            className={clsx(classes.menuButton, isOpen && classes.menuButtonHidden)}
            >
              <MenuOpenIcon />
            </IconButton> 
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Machine Shop
            </Typography>
          </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onDrawerOpen: PropTypes.func
}

export default Topbar;
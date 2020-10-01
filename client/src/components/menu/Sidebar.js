import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
  }));

  const Sidebar = props => {
      const { onDrawerClose, isOpen, main, second } = props;
      const classes = useStyles();

      return(
          <Drawer
          variant="permanent"
          classes={{
              paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
          }}
          open={isOpen}
          >
              <div className={classes.toolbarIcon}>
                  <IconButton onClick={onDrawerClose}>
                      <ChevronLeftIcon />
                  </IconButton>
              </div>
              <Divider />
              <List>{main}</List>
              <Divider />
              <List>{second}</List>
          </Drawer>
      );
  };

  Sidebar.propTypes = {
      className: PropTypes.string,
      onDrawerClose: PropTypes.func,
      isOpen: PropTypes.bool,
      main: PropTypes.any.isRequired,
      second: PropTypes.any.isRequired,
  }

  export default Sidebar;
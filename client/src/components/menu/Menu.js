import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: 5
  },
  dropDown: {
    justifyContent: 'flex-end'
  },
}));

const Menu = props => {
  const { mainList, secondList, children } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx({
      [classes.root]: true
    })}>
      <CssBaseline /> 

      <Topbar onDrawerOpen={handleDrawerOpen} isOpen={open} />

      <Sidebar onDrawerClose={handleDrawerClose} isOpen={open} main={mainList} second={secondList} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};

Menu.propTypes = {
  mainList: PropTypes.any.isRequired,
  secondList: PropTypes.any.isRequired,
  children: PropTypes.node
};
export default Menu;
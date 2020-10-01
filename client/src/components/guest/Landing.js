import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Menu from '../menu/Menu';
import { mainListItems, secondaryListItems } from '../menu/routes/GuestRoutes';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import muiTheme from '../../theme/muiTheme';
import ViewOnlyCalendar from '../calendar/ViewOnlyCalendar';

const styles = theme => ({
  dropdown: {
    justifyContent: 'space-between',
    padding: theme.spacing(4)
  },
  button: {
    justifyContent: 'flex-start',
    padding: theme.spacing(4)
  },
  calendar: {
    justifyContent: 'center'
  }
});

class Landing extends Component {
  render() {

    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={muiTheme}>
      <Menu mainList={mainListItems} secondList={secondaryListItems}>
          <Grid className={classes.dropdown} container item xs={12}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Reservations
            </Typography>
          </Grid>
        <Grid className={classes.calendar} container item xs={12}>
            <ViewOnlyCalendar />
        </Grid>
      </Menu>
      </MuiThemeProvider>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);

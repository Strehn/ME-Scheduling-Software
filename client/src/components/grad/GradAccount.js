import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getUpcomingResID, deleteReservation } from "../../actions/upcomingResActions";
import { getPastResID } from "../../actions/pastResActions";
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Menu from '../menu/Menu';
import { mainListItems } from '../menu/routes/GradRoutes';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { forwardRef } from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import muiTheme from '../../theme/muiTheme';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  };

const styles = theme => ({
    dropdown: {
        justifyContent: 'flex-start',
        padding: theme.spacing(4)
    },
});


class GradAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Start Date', field: 'start' },
                { title: 'End Date', field: 'end' },
                { title: 'Machine ID', field: 'resourceId' },
                { title: 'Billing Code', field: 'billingCode.code' }
            ]
        }
    }

    componentDidMount() {
        this.props.getUpcomingResID(this.props.auth.user._id);
        this.props.getPastResID(this.props.auth.user._id);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { classes } = this.props;
        const { upcomingreservations, getUpcomingResID } = this.props.upcomingreservations;
        const { pastreservations, getPastResID } = this.props.pastreservations;

        const logout = (
            <div>
                <ListItem button onClick={this.onLogoutClick}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </div>
        );

        return (
            <MuiThemeProvider theme={muiTheme}>
                <Menu mainList={mainListItems} secondList={logout}>
                    <Grid className={classes.dropdown} container item xs={12}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Account
            </Typography>
                    </Grid>
                    <Grid className={classes.dropdown} item xs={12}>
                        <MaterialTable
                            icons={tableIcons}
                            title="Upcoming Reservations"
                            columns={this.state.columns}
                            data={upcomingreservations}
                            editable={{
                                onRowDelete: oldData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        this.props.deleteReservation(oldData._id)
                                        resolve()
                                    }, 1000)
                                  }),
                              }}
                            options={{
                                exportButton: false,
                                search: false
                            }}
                        />
                    </Grid>
                    <Grid className={classes.dropdown} item xs={12}>
                        <MaterialTable
                            icons={tableIcons}
                            title="Past Reservations"
                            columns={this.state.columns}
                            data={pastreservations}
                            options={{
                                exportButton: true,
                                search: false
                            }}
                        />
                    </Grid>
                </Menu>
            </MuiThemeProvider>
        );
    }
}

GradAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    upcomingreservations: PropTypes.object.isRequired,
    pastreservations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    upcomingreservations: state.upcomingreservations,
    pastreservations: state.pastreservations
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { logoutUser, getUpcomingResID, getPastResID, deleteReservation })
)(GradAccount);
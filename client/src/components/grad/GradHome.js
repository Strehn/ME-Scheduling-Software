import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { findCode } from "../../actions/billingActions";
import { createReservation } from "../../actions/upcomingResActions";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Menu from '../menu/Menu';
import Calendar from '../calendar/Calendar';
import { mainListItems } from '../menu/routes/GradRoutes';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import muiTheme from '../../theme/muiTheme';
import classnames from "classnames";

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
    },
    card: {
        margin: theme.spacing(2),
    }
});


class GradHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newRes: [],
            refresh: false,
            errors: {}
        };
    }

    getReservation(item) {
        this.setState({ newRes: item })
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.newRes.resFlg) { this.props.findCode(this.state); }
        else { window.confirm("Please select a reservation time."); }
    }

    submitReservation(code) {
        const reservation = {
            user: this.state.newRes.newRes.user,
            id: this.state.newRes.newRes.id,
            start: this.state.newRes.newRes.start,
            end: this.state.newRes.newRes.end,
            resourceId: this.state.newRes.newRes.resourceId,
            billingCode: code
        }

        this.props.createReservation(reservation);
        this.setState({
            refresh: true
        });
    }

    forceRefresh() {
        window.location.reload();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.codes.success && nextProps.codes.codes._id !== undefined) {
            this.submitReservation(nextProps.codes.codes._id);
        }

        if (nextProps.upcomingreservations !== undefined && this.state.refresh) {
            window.confirm("Reservation Complete");
            this.forceRefresh();
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        const { codes, findCode } = this.props.codes;

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
                            Reservations
                        </Typography>
                    </Grid>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>Step 1. Reserve Time on a Machine</Typography>
                            <p>Click and drag on the calendar to reserve time on a given machine below. You may only make one reservation at a time.</p>
                        </CardContent>
                        <Calendar data={
                            {
                                newRes: this.state.newRes,
                                getReservation: this.getReservation.bind(this)
                            }
                        } />
                    </Card>
                    <Card className={classes.card}>
                    <form noValidate onSubmit={this.onSubmit}>
                            <CardContent>
                                <Typography>
                                    Step 2. Reservation Information
                                    <div>
                                        <TextField
                                            required
                                            id="code"
                                            label="Billing Code"
                                            value={this.state.code}
                                            onChange={this.onChange}
                                            error={errors.codenotfound}
                                            helperText={errors.codenotfound}
                                            className={classnames("", {
                                                invalid: errors.codenotfound
                                            })}
                                        />
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" color="secondary" type="submit">Reserve</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Menu>
            </MuiThemeProvider>
        );
    }
}

GradHome.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    upcomingreservations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    codes: state.codes,
    errors: state.errors,
    upcomingreservations: state.upcomingreservations
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { logoutUser, findCode, createReservation })
)(GradHome);
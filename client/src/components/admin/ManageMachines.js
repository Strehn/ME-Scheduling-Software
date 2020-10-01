import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getMachines, createMachine, deleteMachine, updateMachine } from '../../actions/machineActions';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Menu from '../menu/Menu';
import { mainListItems } from '../menu/routes/AdminRoutes';
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
    //DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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


class ManageMachines extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'ID', field: 'id' },
                { title: 'Machine', field: 'name' }
            ],
        };
    }

    componentDidMount() {
        this.props.getMachines();
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { classes } = this.props;
        const { machines, getMachines } = this.props.machines;

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
                            Manage Machines
            </Typography>
                    </Grid>
                    <Grid className={classes.dropdown} item xs={12}>
                        <MaterialTable
                            icons={tableIcons}
                            title="Machines"
                            columns={this.state.columns}
                            data={machines}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.props.createMachine(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.props.updateMachine(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.props.deleteMachine(oldData._id)
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                            options={{
                                exportButton: false,
                                search: true
                            }}
                        />
                    </Grid>
                </Menu>
            </MuiThemeProvider>
        );
    }
}

ManageMachines.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    machines: state.machines
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { logoutUser, getMachines, createMachine, deleteMachine, updateMachine })
)(ManageMachines);
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { compose } from 'redux';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, TextField } from "@material-ui/core";
import muiTheme from '../../theme/muiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(2)
  },
  back: {
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  login: {
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  email: {
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  card: {
    justifyContent: 'left'
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated && this.props.auth.user.role === "undergrad") {
      this.props.history.push("/home");
    }

    if (this.props.auth.isAuthenticated && this.props.auth.user.role === "grad") {
      this.props.history.push("/ghome");
    }

    if (this.props.auth.isAuthenticated && this.props.auth.user.role === "admin") {
      this.props.history.push("/manage-reservations");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === "undergrad") {
      this.props.history.push("/home");
    }

    if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === "grad") {
      this.props.history.push("/ghome");
    }

    if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === "admin") {
      this.props.history.push("/manage-reservations");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <Grid className={classes.main} container>
            <Grid className={classes.back} container item xs={12}>
              <Button
                color="default"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                href="\"
              >
                Back To Home
      </Button>
            </Grid>
            <Grid className={classes.login} container xs={12}>
            <Grid>
            <Card className={classes.card}>
              <CardContent>
                <b>Admin Login:</b><br/>
                <p>E-mail: admin@uidaho.edu</p>
                <p>Password: password</p><br/>
                <b>Graduate Login:</b><br/>
                <p>E-mail: grad@uidaho.edu</p>
                <p>Password: password</p><br/>
                <b>Undergraduate Login:</b><br/>
                <p>E-mail: undergrad@uidaho.edu</p>
                <p>Password: password</p><br/>
              </CardContent>
            </Card>
            </Grid>
              <form noValidate onSubmit={this.onSubmit}>
                <Grid className={classes.email} container item xs={12}>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    error={errors.emailnotfound}
                    id="email"
                    type="email"
                    placeholder="email"
                    helperText={errors.email}
                    helperText={errors.emailnotfound}
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                  />
                </Grid>
                <Grid className={classes.email} container item xs={12}>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    error={errors.passwordincorrect}
                    id="password"
                    type="password"
                    placeholder="password"
                    helperText={errors.password}
                    helperText={errors.passwordincorrect}
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                </Grid>
                <Grid className={classes.email} container item xs={12}>
                  <Button
                    color="default"
                    variant="contained"
                    className={classes.button}
                    type="submit"
                  >
                    Login
      </Button>
                </Grid>
              </form>
            </Grid>
            {/* <Card>
              <CardContent>
                <b>Admin Login:</b><br/>
                <p>E-mail: admin@uidaho.edu</p>
                <p>Password: password</p><br/>
                <b>Graduate Login:</b><br/>
                <p>E-mail: grad@uidaho.edu</p>
                <p>Password: password</p><br/>
                <b>Undergraduate Login:</b><br/>
                <p>E-mail: undergrad@uidaho.edu</p>
                <p>Password: password</p><br/>
              </CardContent>
            </Card> */}
          </Grid>
        </div>
      </MuiThemeProvider >
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { loginUser })
)(Login);

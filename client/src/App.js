import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/guest/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateUndergradRoute from "./components/private-route/PrivateUndergradRoute";
import PrivateGradRoute from "./components/private-route/PrivateGradRoute";
import PrivateAdminRoute from "./components/private-route/PrivateAdminRoute";

import UndergradHome from "./components/undergrad/UndergradHome";
import UndergradAccount from "./components/undergrad/UndergradAccount";
import Reservation from "./components/undergrad/reservation/Reservation";

import GradHome from "./components/grad/GradHome";
import GradAccount from "./components/grad/GradAccount";
import GradReservation from "./components/grad/reservation/GradReservation";

import ManageReservations from './components/admin/ManageReservations';
import ManageMachines from './components/admin/ManageMachines';
import ManageUsers from './components/admin/ManageUsers';
import ManageBilling from './components/admin/ManageBilling';
import ManageHours from './components/admin/ManageHours';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* //<Navbar /> */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateUndergradRoute exact path="/home" component={UndergradHome} />
              <PrivateUndergradRoute exact path="/account" component={UndergradAccount} />
              <PrivateUndergradRoute exact path="/u-reservations" component={Reservation} />

              <PrivateGradRoute exact path="/ghome" component={GradHome} />
              <PrivateGradRoute exact path="/gaccount" component={GradAccount} />
              <PrivateGradRoute exact path="/g-reservations" component={GradReservation}/>

              <PrivateAdminRoute exact path="/manage-reservations" component={ManageReservations} />
              <PrivateAdminRoute exact path="/manage-machines" component={ManageMachines} />
              <PrivateAdminRoute exact path="/manage-users" component={ManageUsers} />
              <PrivateAdminRoute exact path="/manage-billing" component={ManageBilling} />
              <PrivateAdminRoute exact path="/areserve" component={ManageHours} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

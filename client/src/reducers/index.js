import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import billingReducer from "./billingReducer";
import userReducer from './userReducer';
import machineReducer from './machineReducer';
import upcomingResReducer from './upcomingResReducer';
import pastResReducer from './pastResReducer';
import schedulerReducer from "./schedulerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  codes: billingReducer,
  users: userReducer,
  machines: machineReducer,
  upcomingreservations: upcomingResReducer,
  pastreservations: pastResReducer,
  schedulerData: schedulerReducer
});

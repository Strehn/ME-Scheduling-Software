import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BuildIcon from '@material-ui/icons/Build';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DateRangeIcon from '@material-ui/icons/DateRange';


export const mainListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
    <ListItem button component="a" href="/manage-reservations">
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItem>
    <ListItem button component="a" href="/manage-machines">
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Machines" />
    </ListItem>
    <ListItem button component="a" href="/manage-users">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button component="a" href="/manage-billing">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Billing Codes" />
    </ListItem>
    {/* Change the url */}
    <ListItem button component="a" href="/areserve">
      <ListItemIcon>
        <EventTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Reserve" />
    </ListItem>
  </div>
);

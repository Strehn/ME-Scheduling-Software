import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BuildIcon from '@material-ui/icons/Build';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';


export const mainListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
    <ListItem button component="a" href="/ghome">
      <ListItemIcon>
        <EventTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItem>
    <ListItem button component="a" href="/gaccount">
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem>
  </div>
);

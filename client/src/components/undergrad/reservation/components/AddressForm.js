import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const gradStudent = [
  'Grad Student 1',
  'Grad Student 2',
  'Grad Student 3'
];

function getStyles(name, gradName, theme) {
  return {
    fontWeight:
      gradName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddressForm() {

  const classes = useStyles();
  const theme = useTheme();
  const [gradName, setgradName] = React.useState([]);

  const handleChange = event => {
    setgradName(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="datePciker"
            name="datePicker"
            label="Date"
            fullWidth
            autoComplete="fdate"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="timePciker"
            name="timePicker"
            label="Time"
            fullWidth
            autoComplete="ftime"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={clsx(classes.formControl, classes.noLabel)}>
            <Select
              displayEmpty
              value={gradName}
              onChange={handleChange}
            >
              <MenuItem value="">Available Grad Students</MenuItem>
              {gradStudent.map(name => (
                <MenuItem key={name} value={name} style={getStyles(name, gradName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="billing"
            name="billing"
            label="Billing Code"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeropleAltIcon from '@mui/icons-material/PeopleAlt';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PeropleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Agents" />
    </ListItemButton>
  </React.Fragment>
);

import React, { useContext } from 'react';
import { ListItemButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ThemeContext} from "../Themes/ThemeProvider.tsx"

function CustomizedButton({ ...props }) {
    const { dark } = useContext(ThemeContext);
    const classes = useStyles();
  
    return (
      <ListItemButton
        className={dark ? classes.darkButton : classes.lightButton}
        {...props}
      >
      </ListItemButton>
    );
  }

const useStyles = makeStyles( ({
  darkButton: {
    color: 'inherit', // White text for better contrast
    backgroundColor: 'none', // Darker Blue
    '&:hover': {
      backgroundColor: '#302e4d', // Lighter blue on hover for dark mode
    },
  },
  lightButton: {
    color: 'inherit', // Dark text for better contrast in light mode
    backgroundColor: 'none', // Blue
    '&:hover': {
      backgroundColor: '#F5F5F5', // smokey color on hover for light mode
    },
  },
}));

export default CustomizedButton;
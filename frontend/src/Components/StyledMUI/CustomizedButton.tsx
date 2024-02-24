import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ThemeContext} from "../Themes/ThemeProvider.tsx"

function CustomizedButton({ label, ...props }) {
    const { dark } = useContext(ThemeContext);
    const classes = useStyles();
  
    return (
      <Button
        className={dark ? classes.darkButton : classes.lightButton}
        {...props}
      >
        {label}
      </Button>
    );
  }

const useStyles = makeStyles( ({
  darkButton: {
    color: '#FFFFFF', // White text for better contrast
    backgroundColor: '#1565C0', // Darker Blue
    '&:hover': {
      backgroundColor: '#1976D2', // Brighter Blue on hover
    },
  },
  lightButton: {
    color: 'GhostWhite', // Dark text for better contrast in light mode
    backgroundColor: '#2196F3', // Blue
    '&:hover': {
      backgroundColor: '#64B5F6', // Lighter Blue on hover
    },
  },
}));

export default CustomizedButton;
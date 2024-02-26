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
    color: '#61dafb', // White text for better contrast
    backgroundColor: '#1565C0', // Darker Blue
    '&:hover': {
      backgroundColor: '#302e4d', // Lighter blue on hover for dark mode
    },
  },
  lightButton: {
    color: '#0096FA', // Dark text for better contrast in light mode
    backgroundColor: '#2196F3', // Blue
    '&:hover': {
      backgroundColor: '#F5F5F5', // Grey on hover for light mode
    },
  },
}));

export default CustomizedButton;
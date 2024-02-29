import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ThemeContext} from "../Themes/ThemeProvider.tsx"

function CustomizedButton({children, ...props}) {
  // eslint-disable-next-line
    const { dark,theme } = useContext(ThemeContext);
    const classes = useStyles();
  
    return (
      <Button
        className={dark ? classes.darkButton : classes.lightButton}
        {...props}
      >
        {children}
      </Button>
    );
  }

const useStyles = makeStyles( ({
  darkButton: {
    color: 'inherit', // White text for better contrast
    backgroundColor: 'none',
    '&:hover': {
      backgroundColor: '#302e4d', // Lighter blue on hover for dark mode
    },
  },
  lightButton: {
    color: 'inherit', // Dark text for better contrast in light mode
    backgroundColor: 'none',
    '&:hover': {
      backgroundColor: '#F5F5F5', // smokey color on hover for light mode
    },
  },
}));

export default CustomizedButton;
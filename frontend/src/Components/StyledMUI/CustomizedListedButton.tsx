import React, { useContext } from 'react';
import { ListItemButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ThemeContext} from "../Themes/ThemeProvider.tsx"

function CustomizedButton({ ...props }) {
  const {theme } = useContext(ThemeContext);
    
  const useStyles = makeStyles(({
    setting: {
      color: 'inherit', 
      backgroundColor: 'none',
      '&:hover': {
        backgroundColor: theme.hoverBackgroundColor, // Lighter purple blue on hover for dark mode
      },                                             // Smokey color on hover for light mode
    },
  }));

    const classes = useStyles();
  
    return (
      <ListItemButton
        className={classes.setting}
        {...props}
      >
      </ListItemButton>
    );
  }



export default CustomizedButton;
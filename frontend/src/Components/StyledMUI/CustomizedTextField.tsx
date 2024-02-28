import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {ThemeContext} from "../Themes/ThemeProvider.tsx"

function CustomizedTextField({ label, ...props })  {
    const {dark} = useContext(ThemeContext);
    const classes = useStyles();
    return (
      <TextField
        className={dark ? classes.darkTextField : classes.lightTextField}
        label={label}
        {...props}
      />
    );
  }
  const useStyles = makeStyles(({
    darkTextField: {
      '& .MuiInputBase-input': {
        color: 'white',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#4CAF50', // Dark Green for coherence
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#FF5722', // Dark Red for coherence
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Custom label color in dark mode
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#2196F3', // Steel Blue for coherence
        },
        '&:hover fieldset': {
          borderColor: '#1976D2', // Darker Blue for coherence on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1565C0', // Even darker Blue for coherence on focus
        },
      },
    },
    lightTextField: {
      '& .MuiInputBase-input': {
        color: 'black',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#4CAF50', // Dark Green for coherence
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#FF5722', // Dark Red for coherence
      },
      '& .MuiInputLabel-root': {
        color: 'black', // Custom label color in light mode
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#2196F3', // Steel Blue for coherence
        },
        '&:hover fieldset': {
          borderColor: '#1976D2', // Darker Blue for coherence on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1565C0', // Even darker Blue for coherence on focus
        },
      },
    },
  }))

  export default CustomizedTextField;
import React, { useContext } from 'react';
import { Select } from '@mui/material';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';

// Extend this function to accept props for further customization
const CustomizedSelect = ({ children, ...props }) => {
    const { theme,dark } = useContext(ThemeContext)
    const styles = {
      light: {
        color: '#0096FA',
        transition: "all 0.3s ease-in-out",
        borderRadius:"0px",
        '&:hover': {
          borderBottom:`${theme.color}`
        },
        '& .MuiInputBase-input': {
          borderBottom: `2px solid #2196F3`,
        },
        '& .MuiSelect-select': {
          // Additional styles for the inner select element
        },
        '&:focus': {
          borderBottom: theme.hoverBackgroundColor,
          boxShadow: `0 0 0 0.2rem rgba(${theme.rgbBackgroundColor},.25)`,
        },
      },
      dark: {
        color: '#61dafb',
        transition: "all 0.3s ease-in-out",
        borderColor: theme.color,
        borderRadius:"0px",
        '&:hover': {
          borderBottom:`${theme.color}`
        },
        '& .MuiInputBase-input': {
          borderBottom: `2px solid #2196F3`,
        },
        '& .MuiSelect-select': {
          // Additional styles for the inner select element
        },
        '&:focus': {
          borderBottom: theme.hoverBackgroundColor,
          boxShadow: `0 0 0 0.2rem rgba(${theme.rgbBackgroundColor},.25)`,
        },
      }
    };
      const customStyle = dark ? styles.dark : styles.light;
    return (

      <Select
      sx={{...customStyle}}
      {...props} // Spread the rest of the props to the Select component
    >
      {children}
    </Select>

    );
};
export default CustomizedSelect;
import React, { useContext } from 'react';
import { Typography, } from '@mui/material';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';

// Extend this function to accept props for further customization
const CustomizedTypography = ({ children, ...props }) => {
    const { theme,dark } = useContext(ThemeContext)
    const styles = {
        light:{
          color: theme.color ,
          transition: "all 1s ease-in-out",
          
        },
        dark:{
          color: theme.color,
          transition: "all 1s ease-in-out",
        }
      };
      const customStyle = dark ? styles.dark : styles.light;
    return (

        <Typography
            variant="h4" // default variant, can pass a different one as a prop if needed
            component="h2"
            gutterBottom
            style={{ ...customStyle,textAlign:'center' }} // allows custom inline styles
            {...props} // ensures any other Typography props can be passed
        >
            {children} 
        </Typography>

    );
};
export default CustomizedTypography;
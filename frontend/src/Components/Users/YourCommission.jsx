
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import '../../css/YourCommission.css';
import React, { useContext, useEffect, useState } from 'react'
export default function YourCommission() {
    const { theme } = useContext(ThemeContext)
  return (
    <div className='yourCommission'>
         <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '85%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
            <h2>Your Commissions:</h2>






        </Box>
    </div>
  )
}

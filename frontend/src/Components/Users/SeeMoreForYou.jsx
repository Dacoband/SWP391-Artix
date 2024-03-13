import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Work } from '../../share/ListofWork';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../../css/SeeMoreForYou.css';
export default function SeeMoreForYou() {
    const { theme } = useContext(ThemeContext)

    
  return (
    <div className='seemorecommentwork'>
         <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
            <div className='content-recomment'>
            <Typography variant='h5'>Random Works:</Typography>
            
            <div  className='listimage'>       
            <Box className= 'boxlistimage'>
                <ImageList variant="masonry" cols={4} gap={7}>

                    {Work.map((work) => (
                <ImageListItem key={work.id}>
                    <img
                     srcSet={`${work.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                     src={`${work.img}?w=248&fit=crop&auto=format`}
                     alt={work.title}
                     loading="lazy"
                    />
                </ImageListItem>
                ))}
               </ImageList></Box>
            </div></div>
        </Box>
      
    </div>
  )
}

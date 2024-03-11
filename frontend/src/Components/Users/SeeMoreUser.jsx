import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {ListofUsers} from '../../share/ListofUsers.js'
import '../../css/SeeMoreUser.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { CardActionArea } from '@mui/material';
export default function SeeMoreUser() {
    const { theme } = useContext(ThemeContext)
  return (
    <div>
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
       
          <Typography variant='h5'>Top 30 Recommended User:</Typography>
          <div className='grid-container'>
          {ListofUsers.map((user) => (
           <Card key={user.id} sx={{ width: '30%', marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${user.background}`}
          alt="green iguana"
        />
        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div">
          <div className='infouser'>
          <div className='avartar'> 
              <Avatar
                 alt="Remy Sharp"
                 src={`${user.avatar}`}
                 sx={{ width: 70, height: 70 }}
                /></div> 
            {user.User}</div>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>))}</div>








        </Box>

    </div>
  )
}

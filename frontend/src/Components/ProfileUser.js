import React from 'react'
import {Route, Routes} from 'react-router-dom';
import { ListofUsers } from '../share/ListofUsers';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
export default function ProfileUser() {
  const { userId } = useParams();
  const selectedUser = ListofUsers.find(user => user.id === parseInt(userId));

  if (!selectedUser) {
    return <div>Error</div>;
  }
  console.log(selectedUser)

  return (

    <div className=''>
      <div className='Banneruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>




        <div className='backgrounduser' style={{ backgroundImage: `url('${selectedUser.background}')` }}>
            hhh
        </div>



      </div>
      
    </div>
  );
}

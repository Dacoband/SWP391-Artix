import React from 'react'
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import { ListofUsers } from '../share/ListofUsers';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function ProfileUser() {
  const [isFollowing, setIsFollowing] = useState(true)
  const { userId } = useParams();
  const selectedUser = ListofUsers.find(user => user.id === parseInt(userId));

  const handleClick = () =>{
    setIsFollowing(!isFollowing)
  }

  if (!selectedUser) {
    return <div>Error</div>;
  }
  console.log(selectedUser)

  return (

    <div className=''>
      <div className='headeruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <Card sx={{ width: '100%' }}>
      
        <div className='backgrounduser' style={{ backgroundImage: `url('${selectedUser.background}')` }}>
            
        </div>
        <CardContent className='infouser'>
          <div className='avataruser' >
            <img src={selectedUser.avatar}/>
          </div>
          <div className='headerusername'>
          <Typography gutterBottom variant="h3" component="div"style={{ fontWeight: 700,marginBottom:'5px' }} >
            {selectedUser.User}
          </Typography>
          <Typography variant="body2" style={{ fontWeight: 500,fontSize:'18px'}} >
            Followers: {selectedUser.follower} | Following: {selectedUser.following}
          </Typography>
          </div>
          <div className='buttonfollow'  >
          {isFollowing == true && (
          <Button className='follow' variant="contained" href="#contained-buttons" onClick={()=> handleClick()}>
         + Follow
          </Button>)}
          {isFollowing == false && (
          <Button className='following' variant="contained" href="#contained-buttons" onClick={()=> handleClick()}>
         Following
          </Button>)}


          </div>
        </CardContent>
      
    </Card>
    




        



      </div>
      
    </div>
  );
}

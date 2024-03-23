import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ListofUsers } from '../../share/ListofUsers.js'
import '../../css/SeeMoreUser.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { CardActionArea, CardActions, Button } from '@mui/material';
import { GetCreatorList } from '../../API/UserAPI/GET.tsx';
import Pagination from '@mui/material/Pagination';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { PlaceHoldersImageCard } from './PlaceHolders.jsx';

export default function SeeMoreUser() {

  const { theme } = useContext(ThemeContext)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const [creatorList, setCreatorList] = useState<Creator[] | undefined>([]);
  useEffect(() => {
    const getArtList = async () => {
      let creatorList: Creator[] | undefined = await GetCreatorList()
      setCreatorList(creatorList)
    }
    getArtList()
  }, [])
  const currentUsers = creatorList ?? [].slice(indexOfFirstUser, indexOfLastUser);
  let paging = creatorList?.length? Math.ceil(creatorList.length / usersPerPage) : 0;
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  function UserList() {
    return (
      <>
        {currentUsers.map((user: Creator) => (
          <Card key={user.accountID} sx={{ width: '30%', marginBottom: '20px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`data:image/jpeg;base64,${user.backgroundPicture}`}
                alt="backgroundImage"
              />
              <CardContent>
                <div className='infouser'>
                  <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '0' }}>

                    <div className='avartar'>
                      <Avatar
                        alt="Remy Sharp"
                        src={`data:image/jpeg;base64,${user.profilePicture}`}
                        sx={{ width: 100, height: 100 }}
                        style={{ border: '3px solid white' }}
                      />
                    </div>
                    {user.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers: {user.followCount} | Likes: TOBEADDED
                  </Typography></div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" style={{ width: '100%', margin: '0', height: '30px' }}>
                + Follow
              </Button>
            </CardActions>
          </Card>))}
      </>
    )
  }

  return (
    <div className='Box-content'>
      <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          paddingTop: '30px'
        }}>

        <Typography variant='h5' style={{ marginLeft: '100px' }}>Top 30 Recommended User:</Typography>
        <div className='grid-container'>
          {creatorList?.length!==0?<UserList/>:<PlaceHoldersImageCard />}
        </div>
        <div className='pagination'>
          {creatorList?.length!==0?<Pagination 
          count={paging} 
          variant="outlined" 
          onChange={handleChangePage}/> : ""}
          </div>
      </Box>

    </div>
  )
}

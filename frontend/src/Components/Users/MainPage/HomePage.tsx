import React, { useContext, useEffect, useState } from 'react'
import CarouselTag from './CarouselTag.jsx';
import RecommendedWorks from './RecommendedWorks.jsx';
import RecommendedUsers from './RecommendedUsers.jsx';
import ImgForyou from './ImgForyou.jsx';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import { Work} from '../../../share/ListofWork.js'
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const role = sessionStorage.getItem('userRole')
  console.log(role)

// Attempt to retrieve the auth state from sessionStorage
const savedAuth = sessionStorage.getItem('auth');
// Check if there's any auth data saved and parse it
const [user,SetUser] = useState<Creator>()
useEffect(() => {
  const savedUser = savedAuth ? JSON.parse(savedAuth) : null;
  // Now 'auth' contains your authentication state or null if there's nothing saved
  SetUser(savedUser)
},[savedAuth])
  // user is the user login info store in the session
  const { theme } = useContext(ThemeContext)
  return (
    <Box className='homepage'>
      <div className='carouseltag'>
        {/* <div className='seemore'>See More</div> */}
        <CarouselTag />
      </div>
      <Box
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
        }}>
        < div className='recommendedwork'>
          <div className='headrecommended'>
            <Typography variant='h5'>Recommended Works {user?.userName!==""? `For You, ${user?.userName}`:"From The Community"}</Typography>
            <Link to={`artwordrecomment`}>
            <div className='seemore'>See More</div>
            </Link>
            </div>

          <div className='recommendedimg'>
            <RecommendedWorks /></div>
        </div>

        <div className='recommendedusers'>
          <div className='headrecommended'>
            <Typography variant='h5'>Recommended Users</Typography>
            <Link to={`userrecomment`}>
            <div className='seemore'>See More</div></Link>
            </div>
          <div>
            <RecommendedUsers />
          </div>
        </div>
        <div className='Randomimg'>
          <div className='headrecommended'>
          <Typography variant='h5'>Random Artworks, GO!!!</Typography>
          <Link to={`randomword`}>
            <div className='seemore'>See More</div></Link></div>
          <div className='foryouimg'>
            <ImgForyou />
          </div>
        </div>
      </Box>
    </Box>

  )
}

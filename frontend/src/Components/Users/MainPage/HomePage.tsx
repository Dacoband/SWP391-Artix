import React, { useContext } from 'react'
import CarouselTag from './CarouselTag.jsx';
import RecommendedWorks from './RecommendedWorks.jsx';
import RecommendedUsers from './RecommendedUsers.jsx';
import ImgForyou from './ImgForyou.jsx';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import { User } from '../../../Interfaces/UserInterface';

export default function HomePage() {
    // Attempt to retrieve the auth state from sessionStorage
const savedAuth = sessionStorage.getItem('auth');
// Check if there's any auth data saved and parse it
const user = savedAuth ? JSON.parse(savedAuth) : null;
// Now 'auth' contains your authentication state or null if there's nothing saved

  // user is the user login info store in the session
  const { theme } = useContext(ThemeContext)
  return (
    <Box className='homepage'>
      <div className='carouseltag'>
        <div className='seemore'>See More</div>
        <CarouselTag />
      </div>
      <Box
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.9)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
        }}>
        < div className='recommendedwork'>
          <div className='headrecommended'>
            <h3>Recommended Works  {user?.email_verified ? `For You, ${user.name}`:"From The Community"}</h3>
            <div className='seemore'>See More</div></div>

          <div className='recommendedimg'>
            <RecommendedWorks /></div>
        </div>

        <div className='recommendedusers'>
          <div className='headrecommended'>
            <h3>Recommended Users</h3>
            <div className='seemore'>See More</div>
            </div>
          <div>
            <RecommendedUsers />
          </div>
        </div>

        <div className='Randomimg'>
          <div className='headrecommended'>
            <h3>Random Artworks, GO!!!</h3>
            <div className='seemore'>See More</div></div>
          <div className='foryouimg'>
            <ImgForyou />
          </div>
        </div>
      </Box>
    </Box>

  )
}

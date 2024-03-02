import React, { useContext } from 'react'
<<<<<<< HEAD
import CarouselTag from './CarouselTag';
=======
import CarouselTag from'./CarouselTag';
>>>>>>> Volka
import RecommendedWorks from './RecommendedWorks';
import RecommendedUsers from './RecommendedUsers';
import ImgForyou from './ImgForyou';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
export default function HomePage() {
<<<<<<< HEAD
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
            <h3>Recommended Works</h3>
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
            <h3>For You</h3>
            <div className='seemore'>See More</div></div>
          <div className='foryouimg'>
            <ImgForyou />
          </div>
        </div>
      </Box>
    </Box>
=======
  const {theme} = useContext(ThemeContext)
  return (
    <div className='homepage'>
      <div className='carouseltag'>
        <div className='seemore'>See More</div>
        <CarouselTag/>
      </div>
      <Box sx={{color: theme.color, backgroundColor: `rgba(${theme.rgbBackgroundColor},0.9)`,transition:theme.transition}}>
      < div className='recommendedwork'>
        <div className='headrecommended'>
          <h3>Recommended Works</h3>
          <div className='seemore'>See More</div></div>

       <div className='recommendedimg'>
        <RecommendedWorks/></div>
      </div>

      <div className='recommendedusers'>
      <div className='headrecommended'>
          <h3>Recommended Users</h3>
          <div className='seemore'>See More</div></div>
          <div>
        <RecommendedUsers/></div>
      </div>

      <div className='Randomimg'>
      <div className='headrecommended'>
          <h3>For You</h3>
          <div className='seemore'>See More</div></div>
          <div className='foryouimg'>
            <ImgForyou/>
          </div>
      </div>
      </Box>
   </div>
>>>>>>> Volka
  )
}

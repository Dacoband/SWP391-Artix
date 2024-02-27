import React, { useContext } from 'react'
import CarouselTag from'./CarouselTag';
import RecommendedWorks from './RecommendedWorks';
import RecommendedUsers from './RecommendedUsers';
import ImgForyou from './ImgForyou';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
export default function HomePage() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className='homepage'>
      <div className='carouseltag'>
        <div className='seemore'>See More</div>
        <CarouselTag/>
      </div>
      <Box sx={{color: theme.color, backgroundColor: theme.backgroundColor}}>
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
  )
}

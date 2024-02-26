import React from 'react'

import CarouselTag from'./CarouselTag';
import RecommendedWorks from './RecommendedWords';
import RecommendedUsers from './RecommendedUsers';
import ImgForyou from './ImgForyou';
export default function HomePage() {
  return (
   
    <div className='homepage'>

      <div className='carouseltag'>
        <div className='seemore'>See More</div>
        <CarouselTag/>
      </div>

      < div className='recommendedwork'>
        <div className='headrecommended'>
          <h3>Recommended Words</h3>
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
          <div>
            <ImgForyou/>
          </div>




      </div>
      






   </div>


    
  )
}

import React from 'react'

import CarouselTag from'./CarouselTag';
import RecommendedWorks from './RecommendedWords'
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






   </div>


    
  )
}

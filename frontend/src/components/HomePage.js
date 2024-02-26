import React from 'react'
import { ListTag } from '../share/ListofTag'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import '../Javascript/carouseltag'
export default function HomePage() {
  return (
   
 
    
    <div className='homepage'>

      <div className='carouseltag'>
        <div className='seemore'>See More:</div>
        <carouseltag>
        <ArrowBackIosNewIcon  sx={{ fontSize: 15 }} className='arrow-left'/>
        <ul className='ListofTag'>
        {ListTag.map(tag => (
            <li key={tag.id}>
              <button className='itemtag'>{tag.nameTag}</button>
            </li>
          ))}
        </ul>
        <ArrowForwardIosIcon  sx={{ fontSize: 15 }} className='arrow-right'/>
        </carouseltag>
      </div>









    </div>
  )
}

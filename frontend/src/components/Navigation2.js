
import React from 'react'
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ExploreIcon from '@mui/icons-material/Explore';


export default function Navigation2() {
  return (
    
    <div className='Navigation2'>
    <div className='home'>
      <h3>HOME</h3>
        <nav>
          <ul>
          
            <li><a  href='#browse'><FilterNoneIcon style={{ marginRight: 10, verticalAlign: 'middle' }} />Browse Gallery</a></li>
            <li><a  href='#favouritecreator'><FavoriteIcon style={{ marginRight: 10, verticalAlign: 'middle' }} />Favourite Creator</a></li>
            <li><a  href='#discovery'><ExploreIcon style={{ marginRight: 10, verticalAlign: 'middle' }} />Discovery</a></li>
          </ul>
        </nav>
      </div>
        <div className='community'>
        <h3>COMMUNITY</h3>
        <nav>
          <ul>
           
            <li><a  href='#news'><DriveFileRenameOutlineIcon style={{ marginRight: 10, verticalAlign: 'middle' }}/>View Feeback</a></li>
            <li><a  href='#about'><InventoryIcon style={{ marginRight: 10, verticalAlign: 'middle' }}/>View Request</a></li>
            <li><a  href='#contact'><NoteAltIcon style={{ marginRight: 10, verticalAlign: 'middle' }}/>View Commissions</a></li>
          </ul>
        </nav>

        </div>
        </div>
    
    )
  }
import React from 'react'
import {Link} from 'react-router-dom'
export default function AppLogo() {
  return (
    <Link to={'/characters'}>
      <img style={{cursor:'pointer'}} className='app-logo' src = "/sliderImages/icon_demo.png" alt="App Icon" />
    </Link>
    
  )
}

import React, { useContext, useEffect, useState } from 'react'
import CarouselTag from './CarouselTag.jsx';
import RecommendedWorks from './RecommendedWorks.tsx';
import RecommendedUsers from './RecommendedUsers.jsx';
import ImgForyou from './ImgForyou.jsx';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import { Work} from '../../../share/ListofWork.js'
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces.ts';
import LoadingScreen from '../LoadingScreen.jsx'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  // Attempt to retrieve the auth state from sessionStorage
  // Check if there's any auth data saved and parse it
  const [user, setUser] = useState<Creator | null>
  (JSON.parse(sessionStorage.getItem('auth') ?? 'null'))
  //nullish coalescing operator (??) 

  useEffect(() => {
    const handleUserLogin = async () => {
      const savedAuth = sessionStorage.getItem('auth');
       const savedUser = savedAuth ? JSON.parse(savedAuth) : null;
      // Now 'auth' contains your authentication state or null if there's nothing saved
       setUser(savedUser)
      
    };
    window.addEventListener('userLoggedIn', handleUserLogin);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
    };
  }, []);// useEffect with [] can use to update the state only 1
  // user is the user login info store in the session

  const [artworklist, setArtworklist] = useState([])
  const [reccomendedArtworklist, setReccomendedArtworklist] = useState([])
  const [randomArtwork, setrandomArtwork] = useState([])
  const url = "https://localhost:7233/api/Artworks"
  
  useEffect(() => {
    console.log("User is: "+user?.userName)
    setIsLoading(true); // Start loading
    axios.get(url)
      .then(response => response.data)
      .then(data=>{
        setArtworklist(data)
        setReccomendedArtworklist(data.sort((a:Artwork, b:Artwork) => b.likes - a.likes).slice(0, 10))
        setrandomArtwork(data.sort(() => 0.5 - Math.random()).slice(0, 10)) 
        // Set the sorted and sliced list
        setIsLoading(false); // Finish loading
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [user]);

  const { theme } = useContext(ThemeContext)
  function PageSections(){
    return(
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
            <RecommendedWorks artworkList={reccomendedArtworklist} user={user} />
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
            <ImgForyou artworkList={randomArtwork} />
          </div>
        </div>
      </Box>
    </Box>
    )
  }


  return (
   isLoading ? <LoadingScreen/> : <PageSections/> 

  )
}

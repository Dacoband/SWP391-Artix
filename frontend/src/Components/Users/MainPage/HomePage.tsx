import React, { useContext, useEffect, useState } from 'react'
import CarouselTag from './CarouselTag.tsx';
import RecommendedWorks from './RecommendedWorks.tsx';
import RecommendedUsers from './RecommendedUsers.tsx';
import ImgForyou from './ImgForyou.tsx';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces.ts';
import {GetRandom10Arts, GetTop10Arts } from '../../../API/ArtworkAPI/GET.tsx';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {GetCreatorListNoBackground } from '../../../API/UserAPI/GET.tsx';

export default function HomePage() {
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

  
  const [reccomendedArtworklist, setReccomendedArtworklist] = useState<Artwork[]>([])
  const [randomArtwork, setrandomArtwork] = useState<Artwork[]>([])
  const [creatorList, setCreatorList] = useState<Creator[]>([])
   useEffect(() => {
    const getArtList = async () => {
        let top10Artworklist: Artwork[] | undefined = await GetTop10Arts();
        setReccomendedArtworklist(top10Artworklist?top10Artworklist:[]);
        //Get top liked artwork
        let randomArtworklist: Artwork[] | undefined = await GetRandom10Arts();
        setrandomArtwork(randomArtworklist?randomArtworklist:[]);
        //Get random artwork
    }
    const getCreatorList = async () =>{
      let creatorList: Creator[] | undefined = await GetCreatorListNoBackground()
      setCreatorList(creatorList? creatorList : [])
    }
    getCreatorList()
    getArtList()
  }, [user]);

  const { theme } = useContext(ThemeContext)


  return (
    <Box className='homepage'>
      <div className='carouseltag'>
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
            <RecommendedUsers creatorList={creatorList} />
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

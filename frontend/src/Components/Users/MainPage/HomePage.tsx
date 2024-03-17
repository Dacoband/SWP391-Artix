import React, { useContext, useEffect, useState } from 'react'
import CarouselTag from './CarouselTag.jsx';
import RecommendedWorks from './RecommendedWorks.tsx';
import RecommendedUsers from './RecommendedUsers.tsx';
import ImgForyou from './ImgForyou.tsx';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces.ts';
import { GetArtList } from '../../../API/ArtworkAPI/GET.tsx';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GetCreatorList } from '../../../API/UserAPI/GET.tsx';

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
      let artworklist:Artwork[]|undefined = await GetArtList()
      setReccomendedArtworklist(artworklist? artworklist.sort((a: Artwork, b: Artwork) => b.likes - a.likes).slice(0, 10):[])
      setrandomArtwork(artworklist? artworklist.sort(() => 0.5 - Math.random()).slice(0, 10):[])
      // add a nullish coalescing operator (??)
      // Set the sorted and sliced list
    
    }
    const getCreatorList = async () =>{
      let creatorList: Creator[] | undefined = await GetCreatorList()
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

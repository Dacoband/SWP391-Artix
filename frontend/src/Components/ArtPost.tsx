import React, {useContext, useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { Work } from '../share/ListofWork.js';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TestIcon from './TestIcon.jsx';
import Comments from './Comments.jsx';
import Box from '@mui/material/Box';
import { ThemeContext } from './Themes/ThemeProvider.tsx';
import { GetArtListById } from '../API/ArtworkAPI/GET.tsx';
import { Artwork } from '../Interfaces/ArtworkInterfaces.ts';
import { GetCreatorByID } from '../API/UserAPI/GET.tsx';
import { Creator } from '../Interfaces/UserInterface.ts';
export default function PostWork() {
  const {theme} = useContext(ThemeContext)
  const { id } = useParams();
  const [artwork,setArtwork] = useState<Artwork>()
  const [creator,setCreator] = useState<Creator>()
  useEffect(() => {
    const getArtWork = async () => {
      const artwork = await GetArtListById(id?id:"1");
      setArtwork(artwork)
      const creator = await GetCreatorByID(artwork? artwork.creatorID:"1")
      setCreator(creator)
    }
    getArtWork()
  },[id])
  return (
    <Box sx={{paddingTop:'2%'}}>
    <div className='poswork'
      style={{backgroundColor: theme.backgroundColor}}
    >
      <div className='info-postwork'
     
      >
        <div className='imgpost'>
          <img src={`data:image/jpeg;base64,${artwork?.imageFile}`} />
        </div>
        <div className='contentpost'>
          <div className='infor-user-post'>
            <div className='avatar-user-post'>
              <Stack direction="row" spacing={2}>
                <Avatar src={creator?.profilePicture}
                  sx={{ width: 50, height: 50 }} />

              </Stack></div>
            <div className='name-user-post'> {creator?.userName}</div>
          </div>
          <div className='content-post-img'>
            <div>Name Work:{artwork?.artworkName}</div>
            <div>Description:{artwork?.description}</div>
            <div>Tag:</div>
          </div>
        </div>
      </div>
      <Box className="comment-section">
        <TestIcon />
        <div>
          <Comments />
        </div>
      </Box>
    </div>
    </Box>
  )
}

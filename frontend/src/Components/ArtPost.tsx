import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Work } from '../share/ListofWork.js';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TestIcon from './TestIcon.jsx';
import Comments from './Comments.jsx';
import Box from '@mui/material/Box';
import { ListTag } from '../share/ListofTag.js';
import { ThemeContext } from './Themes/ThemeProvider.tsx';
import { GetArtListById } from '../API/ArtworkAPI/GET.tsx';
import { Artwork } from '../Interfaces/ArtworkInterfaces.ts';
import { GetCreatorByID } from '../API/UserAPI/GET.tsx';
import { Creator } from '../Interfaces/UserInterface.ts';
import Chip from '@mui/material/Chip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function PostWork() {
  const colors = ["#82c87e", "#c07ec8", "#c89c7e", "#7E8DC8", "#C07EC8", "#C87E8A"];
  const { theme } = useContext(ThemeContext)
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork>()
  const [creator, setCreator] = useState<Creator>()
  useEffect(() => {
    const getArtWork = async () => {
      const artwork = await GetArtListById(id ? id : "1");
      setArtwork(artwork)
      const creator = await GetCreatorByID(artwork ? artwork.creatorID : "1")
      setCreator(creator)
    }
    getArtWork()
  }, [id])

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Box sx={{ paddingTop: '2%' }}>
      <div className='poswork'
        style={{ backgroundColor: theme.backgroundColor, paddingBottom: '50px' }}
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

              <h4 style={{ marginBottom: '5px', marginTop: '10px' }}>Tag:</h4>
              <div className='tag-container'>
                {ListTag.map((tag, index) => (
                  <div key={tag.id} className='tag-item'>
                    <Stack direction="row" spacing={1}>
                      <Chip label={tag.nameTag} variant="outlined" onClick={handleClick} style={{ backgroundColor: colors[index % colors.length], marginRight: '5px', marginBottom: '5px', color: 'white' }} />
                    </Stack>
                  </div>
                ))}
              </div>
            </div >
          </div >
        </div >
        <Box className="comment-section" >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '68%' }}>
            <TestIcon />
            <div style={{ margin: 'auto 5px', }}>
              <Chip icon={<AttachMoneyIcon />} label={artwork?.price} onClick={handleClick} style={{ fontSize: '20px', padding: '20px', fontWeight: '600', backgroundColor: '#61dafb' }} />

            </div>
          </div>
          <div>
            <Comments />
          </div>
        </Box>
      </div >
    </Box >
  )
}

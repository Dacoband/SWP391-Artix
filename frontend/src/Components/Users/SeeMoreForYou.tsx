import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import '../../css/SeeMoreForYou.css';
import { GetArtList } from '../../API/ArtworkAPI/GET.tsx';
import { Artwork } from '../../Interfaces/ArtworkInterfaces';
import { PlaceHoldersImageCard } from './PlaceHolders.jsx';

export default function SeeMoreForYou() {
    const { theme } = useContext(ThemeContext)
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 30;
    const [artworkList, SetArtworkList] = useState<Artwork[]>([])

    useEffect(() => {
      const getArtworks = async () => {
        let artworkList: Artwork[] | undefined = await GetArtList()
        SetArtworkList(artworkList? artworkList:[])

      }
      getArtworks()
    })

    const handleChangePage = (event, value) => {
        setCurrentPage(value);}
    
    function ArtworkList(){
      return (
        <>
          {artworkList.map((work:Artwork) => (
            <ImageListItem key={work.artworkID}>
              <img
                src={`data:image/jpeg;base64,${work.imageFile}`}
                alt={work.artworkName}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </>
      )
    }
    
  return (
    <div className='seemorecommentwork'>
         <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
            <div className='content-recomment'>
            <Typography variant='h5'>Random Works:</Typography>
            
            <div  className='listimage'>       
            <Box className= 'boxlistimage'>
                <ImageList variant="masonry" cols={4} gap={7}>
                {artworkList.length!==0? <ArtworkList/>:<PlaceHoldersImageCard/>}
               </ImageList></Box>
            </div></div>
            <div className='pagination'>
            
            </div>

        </Box>
      
    </div>
  )
}
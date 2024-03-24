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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { Link } from 'react-router-dom';
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
            <Link key={work.artworkID} to={`artwork/${work.artworkID}`}>

            <ImageListItem key={work.artworkID}>
              {work.purchasable ?
                <AttachMoneyIcon style={{
                  position: 'absolute',
                  backgroundColor: 'green', // Hex code for a yellow color
                  color: 'white', // Icon color
                  borderRadius: '50%', // Makes the background rounded
                  padding: 'auto', // Adjust padding to manage the size of the rounded background
                  margin: '5px', // Make the icon floating inside the image
                  fontSize: '40px', // Adjust the size of the icon as needed
                  // Add other styling properties as required for your specific icon
                  bottom: 0,
                  right: 0,
                  zIndex: 2 // Ensure it's above the image
                }} 
                fontSize='large'
                />
                : ""}
              <img
                style={{ cursor: 'pointer' }}
                // onClick={() => handleClick(work.artworkID)}
                src={`data:image/jpeg;base64,${work.imageFile}`}
                alt={work.artworkName}
                loading="lazy"
              />
            </ImageListItem></Link>
            // <Link key={work.artworkID} to={`artwork/${work.artworkID}`}>
            // <ImageListItem key={work.artworkID}>

            //   <img
            //     src={`data:image/jpeg;base64,${work.imageFile}`}
            //     alt={work.artworkName}
            //     loading="lazy"
            //   />
            // </ImageListItem></Link>
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

import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Work } from '../../share/ListofWork';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../../css/SeeMoreOfArt1.css';
import Pagination from '@mui/material/Pagination';
export default function SeeMoreOfArt1() {
    const { theme } = useContext(ThemeContext)
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 30;

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = Work.slice(indexOfFirstImage, indexOfLastImage);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);}
    

    
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
            <Typography variant='h5'>Recommended Works:</Typography>
            
            <div  className='listimage'>       
            <Box className= 'boxlistimage'>
                <ImageList variant="masonry" cols={4} gap={7}>

                {currentImages.map((work) => (
                <ImageListItem key={work.id}>
                    <img
                     srcSet={`${work.img}`}
                     src={`${work.img}`}
                     alt={work.title}
                     loading="lazy"
                    />
                </ImageListItem>
                ))}
               </ImageList></Box>
            </div></div>
            <div className='pagination'>
            <Pagination count={Math.ceil(Work.length / imagesPerPage)} variant="outlined" onChange={handleChangePage} /></div>

            
        </Box>
      
    </div>
  )
}

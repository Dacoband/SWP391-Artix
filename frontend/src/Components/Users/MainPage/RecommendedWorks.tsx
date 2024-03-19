
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
import { Work } from '../../../share/ListofWork.js'
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces.ts';
import { AuthContext } from '../../AuthenContext';
import { PlaceHoldersImageCard } from '../PlaceHolders.jsx';

export default function RecommendedWords({artworkList,user}) {

  function ReccomendedArts(){
    return(
      <>
        <ImageList className='recommendedImages' cols={5} >
          {artworkList.map((work:Artwork) => (
            <Link key={work.artworkID} to={`artwork/${work.artworkID}`}>
              <CardActionArea >
                <ImageListItem>
                  <CardMedia
                    component="img"
                    style={{ objectFit: "fill", width: '15vw', height: '15vw', borderRadius: '5px', minWidth: '182px', minHeight: '182px' }}
                    image={work.imageFile && work.imageFile.length > 0 ? `data:image/jpeg;base64,${work.imageFile}` : "/images/loadingImages.gif"}
                    alt={work.artworkName}
                    loading="lazy"
                  />
                </ImageListItem>
              </CardActionArea>
            </Link>
          ))}
        </ImageList>
       
      </>
    )
  }

  return (
    <>
      <div className='headrecommended'>
        <Typography key={user?.accountID} variant='h5'>
          Recommended Works {user? `For You, ${user?.userName}` : "From The Community"}</Typography>
          <Link to={`artwordrecomment`}>
          <div className='seemore'>See More</div>
        </Link>
      </div>
      <div className='recommendedimg'>
        {artworkList.length !== 0? <ReccomendedArts/> : <PlaceHoldersImageCard/>}
      </div>
    </>
  )
}

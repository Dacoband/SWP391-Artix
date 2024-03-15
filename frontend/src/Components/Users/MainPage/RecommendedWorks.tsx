
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


export default function RecommendedWords({artworkList,user}) {

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
        <ImageList className='recommendedImages' cols={5} >
          {artworkList.map((work:Artwork) => (
            <Link to={`artwork/${work.artworkID}`}>
              <CardActionArea key={work.artworkID}>
                <ImageListItem key={work.artworkID}>
                  <CardMedia
                    component="img"
                    style={{ objectFit: "fill", width: '15vw', height: '15vw', borderRadius: '5px', minWidth: '182px', minHeight: '182px' }}
                    image={`data:image/jpeg;base64,${work.imageFile}`}
                    alt={work.artworkName}
                    loading="lazy"
                  />
                </ImageListItem>
              </CardActionArea>
            </Link>
          ))}
        </ImageList>
      </div>
    </>
  )
}

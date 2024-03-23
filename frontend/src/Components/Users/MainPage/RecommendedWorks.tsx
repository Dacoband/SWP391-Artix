
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Work } from '../../../share/ListofWork.js'
import { Creator } from '../../../Interfaces/UserInterface.ts';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces.ts';
import { AuthContext } from '../../AuthenContext';
import { PlaceHoldersImageCard } from '../PlaceHolders.jsx';

export default function RecommendedWords({ artworkList, user }) {

  function ReccomendedArts() {
    return (
      <>
        <ImageList className='recommendedImages' cols={5} >
          {artworkList.map((work: Artwork) => (
            <Link key={work.artworkID} to={`artwork/${work.artworkID}`}>
              <CardActionArea >
                <ImageListItem>
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
          Recommended Works {user ? `For You, ${user?.userName}` : "From The Community"}</Typography>
        <Link to={`artwordrecomment`}>
          <div className='seemore'>See More</div>
        </Link>
      </div>
      <div className='recommendedimg'>
        {artworkList.length !== 0 ? <ReccomendedArts /> : <PlaceHoldersImageCard />}
      </div>
    </>
  )
}

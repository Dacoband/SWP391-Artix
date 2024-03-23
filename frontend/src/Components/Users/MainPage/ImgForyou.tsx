import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Work } from '../../../share/ListofWork';
import { Link } from 'react-router-dom'
import { PlaceHoldersImageCard } from '../PlaceHolders';
import { Artwork } from '../../../Interfaces/ArtworkInterfaces';
export default function StandardImageList({ artworkList }) {

  function RandomArts() {
    return (
      <>
        <ImageList className='recommendedImages' cols={5}>
          {artworkList.map((work: Artwork) => (
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
              <Link to={`artwork/${work.artworkID}`}>
                <CardMedia
                  component="img"
                  style={{ objectFit: "fill", width: '15vw', height: '15vw', borderRadius: '5px', minWidth: '182px', minHeight: '182px' }}
                  image={work.imageFile && work.imageFile.length > 0 ? `data:image/jpeg;base64,${work.imageFile}` : "/images/loadingImages.gif"}
                  alt={work.artworkName}
                  loading="lazy"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      </>
    )
  }

  return (
    artworkList.length !== 0 ? <RandomArts /> : <PlaceHoldersImageCard />
  );
};

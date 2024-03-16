import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import { Work } from '../../../share/ListofWork';
import {Link} from 'react-router-dom'
import { PlaceHoldersImageCard } from '../PlaceHolders';
export default function StandardImageList({artworkList}) {

  function RandomArts(){
    return(
    <>
     <ImageList className='recommendedImages' cols={5}>
     {artworkList.map((work) => (
      <ImageListItem key={work.id}>
         <Link to={`artwork/${work.id}`}>
        <CardMedia
            component="img"
            style={{ objectFit:"fill",  width:'15vw' ,height: '15vw' ,borderRadius:'5px',minWidth:'182px',minHeight:'182px' }}
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
    artworkList.length !== 0 ? <RandomArts/>:<PlaceHoldersImageCard/>
  );
      };

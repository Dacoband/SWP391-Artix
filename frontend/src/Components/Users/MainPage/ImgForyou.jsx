import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import { Work } from '../../../share/ListofWork';
import {Link} from 'react-router-dom'
export default function StandardImageList({artworkList}) {
  const randomWork = artworkList.sort(() => 0.5 - Math.random()).slice(0, 10);
  return (
    <ImageList className='recommendedImages' cols={5}>
    {randomWork.map((work) => (
      <ImageListItem key={work.id}>
         <Link to={`artwork/${work.id}`}>
        <CardMedia
            component="img"
            style={{ objectFit:"fill",  width:'15vw' ,height: '15vw' ,borderRadius:'5px',minWidth:'182px',minHeight:'182px' }}
            image={`${work.img}`}
            alt={work.img}
            loading="lazy"
            />
            </Link>
      </ImageListItem>
    ))}
  </ImageList>
  );
      };

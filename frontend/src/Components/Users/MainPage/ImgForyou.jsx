import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Work } from '../../../share/ListofWork';
export default function StandardImageList() {
  const randomWork = Work.sort(() => 0.5 - Math.random()).slice(0, 10);
  return (
    <ImageList className='recommendedImages' cols={5}>
    {randomWork.map((work) => (
      <CardActionArea key={work.id}>
      <ImageListItem key={work.id}>
      <CardMedia
            component="img"
            style={{ objectFit:"fill",  width:'15vw' ,height: '15vw' ,borderRadius:'5px',minWidth:'182px',minHeight:'182px' }}
            image={`${work.img}`}
            alt={work.img}
            loading="lazy"
            />
      </ImageListItem>
      </CardActionArea>
    ))}
  </ImageList>
  );
      };

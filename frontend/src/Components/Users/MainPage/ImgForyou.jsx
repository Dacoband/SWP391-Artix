import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
<<<<<<< HEAD
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
=======
>>>>>>> Volka
import { Work } from '../../../share/ListofWork';
export default function StandardImageList() {
  const randomWork = Work.sort(() => 0.5 - Math.random()).slice(0, 10);
  return (
<<<<<<< HEAD
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
=======
    <ImageList sx={{ width: 1200, height: 450 ,overflow: 'hidden'}} cols={5} rowHeight={210}>
    {randomWork.map((work) => (
      <ImageListItem key={work.id}>
        <img
          srcSet={`${work.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`${work.img}?w=164&h=164&fit=crop&auto=format`}
          alt={work.img}
          loading="lazy"
        />
      </ImageListItem>
>>>>>>> Volka
    ))}
  </ImageList>
  );
      };

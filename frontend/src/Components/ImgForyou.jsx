import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../share/ListofWork';
import { Link } from 'react-router-dom';
export default function StandardImageList() {
  const randomWork = Work.sort(() => 0.5 - Math.random()).slice(0, 10);
  return (

    <ImageList sx={{ width: 1200, height: 450 ,overflow: 'hidden'}} cols={5} rowHeight={210}>
      {randomWork.map((work) => (
         <Link to={`/post/${work.id}`}> 
        <ImageListItem key={work.id}>
          <img
            srcSet={`${work.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${work.img}?w=164&h=164&fit=crop&auto=format`}
            alt={work.img}
            loading="lazy"
          />
        </ImageListItem></Link>
      ))}
    </ImageList>
  );
}

;

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../share/ListofWork';
export default function StandardImageList() {
  return (
    <ImageList sx={{ width: 1200, height: 450 ,overflow: 'hidden'}} cols={5} rowHeight={210}>
      {Work.map((work) => (
        <ImageListItem key={work.id}>
          <img
            srcSet={`${work.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${work.img}?w=164&h=164&fit=crop&auto=format`}
            alt={work.img}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

;

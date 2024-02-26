
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../share/ListofWork';

export default function RecommendedWords() {
    // Sắp xếp danh sách công việc theo số lượng like giảm dần
  const sortedWork = [...Work].sort((a, b) => b.like - a.like);
  // Lấy ra 9 phần tử đầu tiên
  const top10Work = sortedWork.slice(0, 10);

  return (

    <ImageList sx={{ width: 1000, height: 550 ,overflow: 'hidden'}} cols={5} rowHeight={200} >
      {top10Work.map((work) => (
        <ImageListItem key={work.id}>
          <img
            srcSet={`${work.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${work.img}?w=164&h=164&fit=crop&auto=format`}
            alt={work.img}
            loading="lazy"
          />
          <div>{work.author}</div>
        </ImageListItem>
        
      ))}
    </ImageList>
  )
}

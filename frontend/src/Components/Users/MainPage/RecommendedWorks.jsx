
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../../../share/ListofWork';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
export default function RecommendedWords() {
    // Sắp xếp danh sách công việc theo số lượng like giảm dần
  const sortedWork = [...Work].sort((a, b) => b.like - a.like);
  // Lấy ra 9 phần tử đầu tiên
  const top10Work = sortedWork.slice(0, 10);

  return (
    <ImageList className='recommendedImages' cols={5} >
      {top10Work.map((work) => (
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



  )
}

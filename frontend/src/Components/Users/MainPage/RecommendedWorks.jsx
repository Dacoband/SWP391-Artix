
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../../../share/ListofWork';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
export default function RecommendedWords() {
    // Sắp xếp danh sách công việc theo số lượng like giảm dần
  const sortedWork = [...Work].sort((a, b) => b.like - a.like);
  // Lấy ra 9 phần tử đầu tiên
  const top10Work = sortedWork.slice(0, 10);

  return (

    <ImageList sx={{ width: 1000, height: 500 ,overflow: 'hidden'}} cols={5} >
      {top10Work.map((work) => (
        <Card className='cardrecommended'>
        <CardActionArea>
        <ImageListItem style={{ width:'184px',height: '184px'}} key={work.id}>
          <CardMedia
            component="img"
            style={{ backgroundImage:'', width: '100%', height: 'auto' }}
            image={`${work.img}`}
            alt={work.img}
            loading="lazy"
            />
        </ImageListItem>
          <CardContent>
            <div className='userofworks'>{work.author}</div>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}
    </ImageList>



  )
}

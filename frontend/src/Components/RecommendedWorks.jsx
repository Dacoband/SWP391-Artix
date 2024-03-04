
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Work } from '../share/ListofWork';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function RecommendedWords() {
    // Sắp xếp danh sách công việc theo số lượng like giảm dần
  const sortedWork = [...Work].sort((a, b) => b.like - a.like);
  // Lấy ra 9 phần tử đầu tiên
  const top10Work = sortedWork.slice(0, 10);

  return (

    <ImageList sx={{ width: 1100, height: 500 ,overflow: 'hidden'}} cols={5} rowHeight={200} >
      {top10Work.map((work) => (
        <Card className='cardrecommended'>
        <CardActionArea>
          <CardMedia  style={{ objectFit: 'cover', width: '100%', height: '180px' }}>
          <ImageListItem style={{ width:'210px',height: '180px'}} key={work.id}>
          <img
            srcSet={`${work.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${work.img}?w=164&h=164&fit=crop&auto=format`}
            alt={work.img}
            loading="lazy"
          />
          
        </ImageListItem>
          </CardMedia>
          <CardContent>
            
            <div className='userofworks'>{work.author}</div>
            
            
          </CardContent>
        </CardActionArea>
      </Card>




       
        


      ))}



    </ImageList>



  )
}

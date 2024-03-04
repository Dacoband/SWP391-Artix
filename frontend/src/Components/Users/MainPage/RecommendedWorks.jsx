
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
export default function RecommendedWords() {
  const recommendedwork = {
    ArtworkID:0, // PK
    CreatorID:0,  // FK
    TagID:0,  // FK
    CategoryID:0,  // FK
    Description:'Description',
    DateCreated: new Date().toISOString(),
    Likes:0, 
    Purchasable:false, 
    Price:0,
  }
  const [recommendedworkList,setrecommendedworkList] = useState([recommendedwork])
  const url = "https://localhost:7233/api/Artworks"
  const [isLoading,setIsLoading] = useState(false)
  useEffect(()=>{
    axios.get(url)
    .then(response => response.data)
    .then(list => {setrecommendedworkList(list)})
    .then(console.log(recommendedworkList))
    .then(
          setIsLoading(!isLoading)
    )
    .catch(error => {console.log(error)})
  },[])
function Sort(){
   // Sắp xếp danh sách công việc theo số lượng like giảm dần
   const sortedWork = [...recommendedworkList].sort((a, b) => b.Likes - a.Likes);
   // Lấy ra 9 phần tử đầu tiên
   setrecommendedworkList(sortedWork.slice(0, 10));
}


  return (
    <ImageList className='recommendedImages' cols={5} >
      {recommendedworkList.map((work) => (
        <CardActionArea key={work.ArtworkID}>
        <ImageListItem key={work.ArtworkID}>
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

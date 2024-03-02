<<<<<<< HEAD
import React, { useContext } from "react";
import { ListofUsers} from '../../../share/ListofUsers'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ThemeContext } from "../../Themes/ThemeProvider.tsx";
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

function RecommendedUsers() {
  const {theme} = useContext(ThemeContext)

  const sortedUsers = [...ListofUsers].sort((a, b) => b.like - a.like);
  
  const top12Users = sortedUsers.slice(0, 12); // Get top 12 most 'liked' users
  
  /* What Next Is A Mess Of Randomness To Keep Things Fresh. Basically I will create 4 Carousel with 12 top users render 4 carousels in a row.
   PLEASE DON'T TOUCH IT */

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  // Function to create 4 unique sets of 3 non-duplicate items
  const createUniqueSets = (array, setCount, itemsPerSet) => {
    let shuffledData = shuffleArray(array);
    let uniqueSets = [];
    for (let i = 0; i < setCount; i++) {
      uniqueSets.push(shuffledData.slice(i * itemsPerSet, (i * itemsPerSet) + itemsPerSet));
    }
    return uniqueSets;
  };
  // Generate the 4 unique sets
  const uniqueSets = createUniqueSets(top12Users, 4, 3);

  /* THE CODE WORKS!!! DON'T ME WHY!!! */

  return (
    <div className="groupOfCarousel">
       {uniqueSets.map((set, index) => (
        <div key={index}>
          <Carousel
          infiniteLoop={true}
           showArrows={false}
           showStatus={false}
           showIndicators={false}
           showThumbs={false}
           autoPlay={true}
           interval="5000"
           className="carouselCustom"
          >
          {set.map((user) => (
            <div key={user.id} >
            <Card >
              <CardActionArea>
                <CardMedia >
                     <div className="inforuser" style={{background:theme.backgroundColor,color:theme.color}}>
                  <div className="imguser">
                    <img
                      srcSet={`${user.avatar}`}
                      src={`${user.avatar}`}
=======
import React from "react";
import { ListofUsers} from '../../../share/ListofUsers'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';

function RecommendedUsers() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const sortedUsers = [...ListofUsers].sort((a, b) => b.like - a.like);
  
  const top10Users = sortedUsers.slice(0, 10);
  
  return (
    <div >
      <Slider {...settings}>
        {top10Users.map((user) => (
          <div key={user.id} className="user-container" >
            <Card className="carouseluser" sx={{maxWidth: 250,borderRadius:2 }}>
              <CardActionArea>
                <CardMedia >
                     <div className="inforuser">
                  <div className="imguser">
                    <img
                      srcSet={`${user.avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${user.avatar}?w=164&h=164&fit=crop&auto=format`}
>>>>>>> Volka
                      alt={user.avatar}
                      loading="lazy" className="imgu"
                    />
                  </div>
                  <div className="contentuser">
                  <h2>{user.User}</h2>
                  <h4>Follower: {user.like}</h4>
                  </div></div>
                </CardMedia>
<<<<<<< HEAD
=======
                {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.User}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.like}
                  </Typography>
                </CardContent> */}
>>>>>>> Volka
              </CardActionArea>
              <CardActions className="card-follow-button">
                <Button size="small" color="primary">
                  + Follow
                </Button>
              </CardActions>
            </Card>
          </div>
<<<<<<< HEAD
          ))}
          </Carousel>
        </div>
      ))}
=======
        ))}
      </Slider>
>>>>>>> Volka
    </div>
  );
}

export default RecommendedUsers;

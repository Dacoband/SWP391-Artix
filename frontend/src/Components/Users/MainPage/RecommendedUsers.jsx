import React, { useContext } from "react";
import { ListofUsers} from '../../../share/ListofUsers'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ThemeContext } from "../../Themes/ThemeProvider.tsx";



function RecommendedUsers() {
  const {theme} = useContext(ThemeContext)
  const customArrow = 'customArrow'

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowCircleRightIcon
      className={`"${className} customArrow"`}
      sx={{
        ...style,
        fontSize: 30,
        display: "block",
        borderRadius:'50%',
        marginRight:'-15px',
        background:`100% ,${theme.backgroundColor}`,
        color: theme.color,
      }}
      onClick={onClick}
      />
    )
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        
        <ArrowCircleLeftIcon
        className={`"${className} customArrow}"`}
         sx={{
          ...style,
          textAlign:"center",
          fontSize: 30,
          display: "block",
          borderRadius:'50%',
          marginLeft:'-15px',
          background:`100% ,${theme.backgroundColor}`,
          color: theme.color,
         }}
         onClick={onClick}
        />

    )
  }

  const sortedUsers = [...ListofUsers].sort((a, b) => b.like - a.like);
  
  const top10Users = sortedUsers.slice(0, 10);
  
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
  };
  return (
    <div>
      <Slider {...settings}>
        {top10Users.map((user) => (
          <div key={user.id} className="user-container" >
            <Card className="carouseluser">
              <CardActionArea>
                <CardMedia >
                     <div className="inforuser">
                  <div className="imguser">
                    <img
                      srcSet={`${user.avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${user.avatar}?w=164&h=164&fit=crop&auto=format`}
                      alt={user.avatar}
                      loading="lazy" className="imgu"
                    />
                  </div>
                  <div className="contentuser">
                  <h2>{user.User}</h2>
                  <h4>Follower: {user.like}</h4>
                  </div></div>
                </CardMedia>
                {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.User}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.like}
                  </Typography>
                </CardContent> */}
              </CardActionArea>
              <CardActions className="card-follow-button">
                <Button size="small" color="primary">
                  + Follow
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecommendedUsers;

import React from "react";
import { ListofUsers} from '../share/ListofUsers'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(0, 0, 0, 0)",
          color: "black",
          marginTop: "-24px"
        }}
        onClick={onClick}
      >
        <ArrowForwardIosIcon  sx={{ fontSize: 30 }} style={{ color: "black" }} />
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(0, 0, 0, 0)",
          color: "black",
          marginTop: "-24px",
        }}
        onClick={onClick}
      >
        <ArrowBackIosIcon  sx={{ fontSize: 30 }} style={{ color: "black" }} />
      </div>
    );
  }

function RecommendedUsers() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const sortedUsers = [...ListofUsers].sort((a, b) => b.like - a.like);
  
  const top10Users = sortedUsers.slice(0, 10);
  
  return (
    <div >
      <Slider {...settings}>
        {top10Users.map((user) => (
          <div key={user.id} className="user-container" >
            <Card className="carouseluser" sx={{ maxWidth: 300 }}>
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

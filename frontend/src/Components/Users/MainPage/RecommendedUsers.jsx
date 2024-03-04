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
                      srcSet={`${user.avatar}`}
                      src={`${user.avatar}`}
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

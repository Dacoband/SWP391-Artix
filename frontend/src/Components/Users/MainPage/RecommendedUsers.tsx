import React, { useContext } from "react";
import { ListofUsers } from '../../../share/ListofUsers.js'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ThemeContext } from "../../Themes/ThemeProvider.tsx";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Creator } from "../../../Interfaces/UserInterface.ts";
import { PlaceHoldersImageCard } from "../PlaceHolders.jsx";


function RecommendedUsers({creatorList}) {
  const { theme } = useContext(ThemeContext)

  const sortedUsers = creatorList.sort((a: Creator, b: Creator) => b.followCount - a.followCount);

  const top12Users = sortedUsers.slice(0, 12); // Get top 12 most 'liked' users

  /* What Next Is A Mess Of Randomness To Keep Things Fresh. Basically I will create 4 Carousel with 12 top users render 4 carousels in a row.
   PLEASE DON'T TOUCH IT */

  // Function to shuffle an array
const shuffleArray = (array: number[]): never[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray as never[];
};

// Function to create 4 unique sets of 3 non-duplicate items
const createUniqueSets = (array: number[], setCount: number, itemsPerSet: number): never[][] => {
  const shuffledData = shuffleArray(array);
  let uniqueSets: never[][] = [];
  for (let i = 0; i < setCount; i++) {
    uniqueSets.push(shuffledData.slice(i * itemsPerSet, i * itemsPerSet + itemsPerSet) as never[]);
  }
  return uniqueSets;
};

// Generate the 4 unique sets
const uniqueSets = createUniqueSets(top12Users, 4, 3);

  /* THE CODE WORKS!!! DON'T ME WHY!!! */

  function ListOfCarouselCreators(){
    return(
      <>
    {uniqueSets.map((set: Creator[], index) => (
      <div key={index}>
        <Carousel
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          autoPlay={true}
          interval={5000}
          className="carouselCustom"
        >
          {set.map((user) => (
            <div key={user.creatorID} >
              <Link to={`profile/${user.creatorID}`}>
                <Card >
                  <CardActionArea>
                    <CardMedia >
                      <div className="inforuser" style={{ background: theme.backgroundColor, color: theme.color }}>
                        <div className="imguser">
                          <img
                            src={user.profilePicture?
                              `data:image/jpeg;base64,${user.profilePicture}`
                              :
                              "/images/anon.jpg"
                            }
                            alt={user.userName}
                            loading="lazy" className="imgu"
                          />
                        </div>
                        <div className="contentuser">
                          <h1>{user.userName}</h1>
                          <h2>Follower: {user.followCount??0}</h2>
                        </div>
                      </div>
                    </CardMedia>
                  </CardActionArea>
                  <CardActions className="card-follow-button">
                    <Button size="small" color="primary">
                      + Follow
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    ))}
    </>
    )
  }

  return (
    <div className="groupOfCarousel">
      {creatorList.length!==0 ? <ListOfCarouselCreators/>:<PlaceHoldersImageCard/>}
    </div>
  );
}

export default RecommendedUsers;

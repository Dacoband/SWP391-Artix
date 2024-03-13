import React, { useContext } from 'react'
import { Work } from '../../share/ListofWork';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { ListofUsers } from '../../share/ListofUsers';
import { NavLink, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CakeIcon from '@mui/icons-material/Cake';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import { Link } from 'react-router-dom';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function ProfileUser() {
  const [isFollowing, setIsFollowing] = useState(false)
  let { id } = useParams()
  const selectedUser = ListofUsers.find(user => user.id === parseInt(id));
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <div className=''>
      <div className='headeruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <Card sx={{ width: '100%' }}>

          <div className='backgrounduser' style={{ backgroundImage: `url('${selectedUser.background}')` }}>
            <Button className='button-edit-background' style={{ color: '#04a1fd', backgroundColor: '#1A1A2E', borderRadius: '10px', fontSize: '14px', top: '80%', left: '85%' }}><CameraAltIcon /> Edit Cover Image</Button>
          </div>
          <CardContent className='infouser1'>
            <div className='infousername'>
              <div className='avataruser' >
                <img src={selectedUser.avatar} />
                <div className='buttonavatar'>
                  <Button style={{ color: 'white', borderRadius: '50%' }}>
                    <Avatar style={{ outline: '2px solid #fff' }}>
                      <CameraAltIcon />
                    </Avatar>
                  </Button>
                </div>
              </div>
              <div className='headerusername'>
                <Typography gutterBottom variant="h3" component="div" style={{ fontWeight: 700, marginBottom: '5px' }} >
                  {selectedUser.User}
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500, fontSize: '18px' }} >
                  Followers: {selectedUser.follower} | Following: {selectedUser.following}
                </Typography>
              </div> </div>

            <div className='buttonheaderuser'  >

              <Button className='buttonchat' style={{ marginRight: '20px', height: '40px' }} variant="contained" href="#contained-buttons" >
                <ChatIcon /> Chat</Button>

              {isFollowing == true && (
                <Button className='follow' style={{ width: '120px', height: '40px' }} variant="contained" href="#contained-buttons" onClick={() => handleClick()}>
                  + Follow
                </Button>)}
              {isFollowing == false && (
                <Button className='following' style={{ width: '120px', height: '40px' }} variant="contained" href="#contained-buttons" onClick={() => handleClick()}>
                  Following
                </Button>)}

            </div>
          </CardContent>
        </Card>

      </div>
      <div className='tabsBackground' style={{ backgroundColor: theme.backgroundColor }} >
        <div className='inforuser2'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='navofuser'>
              <div className='navuser'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Home" {...a11yProps(0)} />
                  <Tab label="Shop" {...a11yProps(1)} />
                  <Tab label="Favourites" {...a11yProps(2)} />
                </Tabs>
              </div>
              <div className='buttonSubcribe'>
                <Button variant="contained" href="#contained-buttons"> <ShoppingBagIcon style={{ marginRight: '5px' }} />  Subcribe</Button>
                <Button variant="contained" href="#contained-buttons" style={{ marginLeft: '20px' }}>Report</Button>
              </div>
            </Box>
            <CustomTabPanel value={value} index={0} >
              <div className='tabhome'>
                <div className='biouser'>
                  <Box
                    // height= {150}
                    width={350}
                    my={4}
                    gap={4}
                    p={2}
                    style={{
                      border: '2px solid grey',
                      top: 0, // this defines the top position when it's sticky
                      zIndex: 10 // you may want to add a zIndex to ensure it stacks on top of other contents
                    }} className='boxintroduct'
                  >
                    <h2 className='headintroduct'>About {selectedUser.User}:</h2>
                    <div className='contentintroduct'><CakeIcon className='iconintroduct' />Birday: {selectedUser.birday} </div>
                    <div className='contentintroduct'><RoomIcon className='iconintroduct' />Location: {selectedUser.location}</div>
                    <div className='contentintroduct'><EmailIcon className='iconintroduct' />Email: {selectedUser.email} </div>
                    <div className='contentintroduct'><PhoneIcon className='iconintroduct' />Phone: {selectedUser.Phone}</div>
                    <div className='contentintroduct'> <AutoAwesomeIcon className='iconintroduct' />My Bio: {selectedUser.bio}  </div>
                  </Box></div>
                <div className='workofuser'>
                  <div className='head-workofuser'>
                    <h2> My Works:</h2>
                    <Box>
                      <ImageList variant="masonry" cols={3} gap={8}>
                        {Work.map((work) => (
                          <ImageListItem key={work.id}>
                            <img
                              srcSet={`${work.img}`}
                              src={`${work.img}`}
                              alt={work.title}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Box>
                  </div>
                </div>
              </div>


            </CustomTabPanel>

            <CustomTabPanel value={value} index={1} className='tabshop'>
              {/* <ImageList sx={{ width:1200 , height: 450 ,overflow: 'hidden'}} cols={5} rowHeight={210}> */}
              <ImageList sx={{ width: 1200, height: 'auto', overflow: 'visible' }} cols={4}>
                {/* <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
        </ImageListItem> */}
                {Work.map((work) => (
                  <ImageListItem key={work.id}>
                    <img
                      srcSet={`${work.img}?w=240&fit=crop&auto=format&dpr=2 2x`}
                      src={`${work.img}?w=240&fit=crop&auto=format`}
                      alt={work.title}
                      loading="lazy"
                      style={{ height: '200px' }}
                    />
                    <ImageListItemBar
                      title={work.price}
                      subtitle={work.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${work.author}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </CustomTabPanel>


            <CustomTabPanel value={value} index={2} className='tabfavourites'>

              <Box sx={{ width: 1200, height: 450, overflow: 'visible' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                  {Work.map((work) => (
                    <ImageListItem key={work.id}>
                      <img
                        srcSet={`${work.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${work.img}?w=248&fit=crop&auto=format`}
                        alt={work.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </CustomTabPanel>

          </Box>

        </div>
      </div>
    </div>
  );
}

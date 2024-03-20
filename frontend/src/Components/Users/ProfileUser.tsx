import React, { useContext, useEffect } from 'react'
import { Work } from '../../share/ListofWork.js';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { ListofUsers } from '../../share/ListofUsers.js';
import { Link, useParams } from 'react-router-dom';
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
import CustomizedImageButton from '../StyledMUI/CustomizedImageButton.jsx'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { PutCreatorBackgroundPicture, PutCreatorProfilePicture } from '../../API/UserAPI/PUT.tsx';
import { GetArtListById } from '../../API/ArtworkAPI/GET.tsx';
import { Artwork } from '../../Interfaces/ArtworkInterfaces.ts';
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
  const [user, setUser] = useState<Creator>()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [blobImage, setBlobImage] = useState();

  const [previewProfile, setPreviewProfile] = useState<string>();
  const [previewBackground, setPreviewBackground] = useState<string>();
  let { id } = useParams()
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await GetCreatorByID(id ? id : "0")
      setUser(userProfile)
    }
    const getUserArtworks = async () => {
      const userArtworks = await GetArtListById(id ? id : "0")
      setArtworks(userArtworks as unknown as Artwork[])
    }
    getUserProfile()
    getUserArtworks()
  }, [])


  //Covert Blob to Base64 string to easily view the image
  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  async function postImageToDatabase(imageData: string, imageType: string) {
    if (imageType === "profilePicture") {
      let plainBase64Data = imageData.split(',')[1];
      PutCreatorProfilePicture(user ? user.creatorID : "1", plainBase64Data)
    }
    else if (imageType === "backgroundPicture") {
      let plainBase64Data = imageData.split(',')[1];
      PutCreatorBackgroundPicture(user ? user.creatorID : "1", plainBase64Data)
    } else {
      console.log("error: POSTING FAILED! Check below for further details:")
    }

  }

  const handleImageChange = async (e) => {
    const { name, files } = e.target;
    if (name === "profilePicture" || name === "backgroundPicture") {
      const file = files?.[0];
      if (file) {
        try {
          const base64Image = await blobToBase64(file);
          // Match the arguments to the function definition
          await postImageToDatabase(base64Image, name); // Here `name` should be of type 'profilePicture' | 'backgroundPicture'
          if (name === "profilePicture") {
            setPreviewProfile(base64Image);
          } else {
            setPreviewBackground(base64Image);
          }
          console.log('Posting images...');
        } catch (error) {
          console.error('Error posting image to database', error);
        }
      }
    }
  };


  return (
    <div className=''>
      <div className='headeruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <Card sx={{ width: '100%' }}>

          <div className='backgrounduser' style={{ backgroundImage: `url('${user?.backgroundPicture ? "data:image/jpeg;base64," + user?.backgroundPicture : previewBackground}')` }}>
            <div
              className='backgroundPicture'
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                color: '#04a1fd',
                backgroundColor: '#1A1A2E',
                borderRadius: '10px', fontSize: '14px',
                top: '80%',
                left: '83%',
                width: '15vw',
              }}
            >
              <input
                accept='.png,.jpeg,.jpg,.tif,.gif'
                style={{ display: 'none' }}
                id={"backgroundPicture"}
                name={"backgroundPicture"}
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor={"backgroundPicture"}>
                <Button
                  className='button-edit-background'
                  component="span"
                  startIcon={<CameraAltIcon />}
                >
                  Edit Cover Image
                </Button>
              </label>
            </div>
          </div>
          <CardContent className='infouser1'>
            <div className='infousername'>
              <div className='avataruser' >
                <img src={user?.profilePicture ? "data:image/jpeg;base64," + user?.profilePicture : previewProfile} />
                <div className='buttonavatar'>
                  <div className='profilePicture'
                    style={{
                      backgroundColor: "none",
                      position: "absolute",
                      top: 10,
                      right: 0,
                      transform: "translate(10%, 100%)",
                      zIndex: 2,
                    }}
                  >
                    <input
                      style={{ display: 'none' }}
                      accept='.png,.jpeg,.jpg,.tif,.gif'
                      id={"profilePicture"}
                      name={"profilePicture"}
                      type="file"
                      onChange={handleImageChange}
                    />

                    <label htmlFor={"profilePicture"}>
                      <Button style={{ color: 'white', borderRadius: '150px' }}
                        component="span" //Component = 'span' allow you to span the lable across the input
                      >
                        <Avatar style={{ outline: '2px solid #fff' }}>
                          <CameraAltIcon />
                        </Avatar>
                      </Button>
                    </label>
                  </div>

                </div>
              </div>
              <div className='headerusername'>
                <Typography gutterBottom variant="h3" component="div" style={{ fontWeight: 700, marginBottom: '5px' }} >
                  {user?.userName}
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500, fontSize: '18px' }} >
                  Followers: {user?.followCount}
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
            <Box sx={{ borderBottom: 1 }} className='navofuser'>
              <div className='navuser'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ color: theme.color2, zIndex: '7' }}>
                  <Tab label="Home" {...a11yProps(0)} style={{ color: theme.color2, }} />
                  <Tab label="Shop" {...a11yProps(1)} style={{ color: theme.color2, }} />
                  <Tab label="Favourites" {...a11yProps(2)} style={{ color: theme.color2, }} />
                </Tabs>
              </div>
              <div className='buttonSubcribe'>
                <Link to={`commission`}>
                  <Button variant="contained" href="#contained-buttons"> <ShoppingBagIcon style={{ marginRight: '5px' }} />Commission</Button>
                </Link>
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
                      color: theme.color2,
                      border: '2px solid grey',
                      top: 0, // this defines the top position when it's sticky
                      zIndex: 10 // you may want to add a zIndex to ensure it stacks on top of other contents
                    }} className='boxintroduct'
                  >
                    <h2 className='headintroduct'>About {user?.userName}:</h2>
                    <div className='contentintroduct'><CakeIcon className='iconintroduct' />Birday: TOBEADDED </div>
                    <div className='contentintroduct'><RoomIcon className='iconintroduct' />Location: {user?.address}</div>
                    <div className='contentintroduct'><EmailIcon className='iconintroduct' />Email: TOBEADDED </div>
                    <div className='contentintroduct'><PhoneIcon className='iconintroduct' />Phone: {user?.phone}</div>
                    <div className='contentintroduct'> <AutoAwesomeIcon className='iconintroduct' />My Bio: {user?.biography}  </div>
                  </Box></div>
                <div className='workofuser'>
                  <div className='head-workofuser'>
                    <h2 style={{ color: theme.color2, }}> My Works:</h2>
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

            <CustomTabPanel value={value} index={1}>
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


            <CustomTabPanel value={value} index={2}>

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

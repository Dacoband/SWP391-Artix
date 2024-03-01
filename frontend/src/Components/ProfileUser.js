import React from 'react'
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import { ListofUsers } from '../share/ListofUsers';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
import PaymentIcon from '@mui/icons-material/Payment';
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
  const [isFollowing, setIsFollowing] = useState(true)
  const { userId } = useParams();
  const selectedUser = ListofUsers.find(user => user.id === parseInt(userId));

  const handleClick = () =>{
    setIsFollowing(!isFollowing)
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  if (!selectedUser) {
    return <div>Error</div>;
  }
  console.log(selectedUser)

  return (

    <div className=''>
      <div className='headeruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <Card sx={{ width: '100%' }}>
      
        <div className='backgrounduser' style={{ backgroundImage: `url('${selectedUser.background}')` }}>
            
        </div>
        <CardContent className='infouser1'>

          <div className='infousername'>
          <div className='avataruser' >
            <img src={selectedUser.avatar}/>
          </div>
          <div className='headerusername'>
          <Typography gutterBottom variant="h3" component="div"style={{ fontWeight: 700,marginBottom:'5px' }} >
            {selectedUser.User}
          </Typography>
          <Typography variant="body2" style={{ fontWeight: 500,fontSize:'18px'}} >
            Followers: {selectedUser.follower} | Following: {selectedUser.following}
          </Typography>
          </div> </div>

          <div className='buttonheaderuser'  >
            
          <Button className='buttonchat' style={{marginRight:'20px',height:'40px'}} variant="contained" href="#contained-buttons" >
          <ChatIcon/> Chat</Button>

          {isFollowing == true && (
          <Button className='follow' style={{width:'120px',height:'40px'}} variant="contained" href="#contained-buttons" onClick={()=> handleClick()}>
         + Follow
          </Button>)}
          {isFollowing == false && (
          <Button className='following' style={{width:'120px',height:'40px'}} variant="contained" href="#contained-buttons" onClick={()=> handleClick()}>
         Following
          </Button>)}

          </div>
        </CardContent>
      
    </Card>
    

      </div>
      <div className='inforuser2'>
      <Box sx={{ width: '100%' }}>
   
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='navofuser'>
        <div className='navuser'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Introduct" {...a11yProps(1)} />
          <Tab label="Shop" {...a11yProps(2)} />
        </Tabs>
        </div>
        <div className='buttonSubcribe'>
        <Button variant="contained" href="#contained-buttons"> <ShoppingBagIcon style={{marginRight:'5px'}}/>  Subcribe</Button>
        <Button variant="contained" href="#contained-buttons" style={{marginLeft:'20px'}}>Report</Button>
        </div>
      </Box>
      <CustomTabPanel value={value} index={0}>
        hihis
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
      <Box
      height= {150}
      width={800}
      my={4}
    
      gap={4}
      p={2}
      style={{ 
      
      border: '2px solid grey',
     }} className='boxintroduct'
    >
    <h2  className='headintroduct'>About {selectedUser.User}:</h2>
    <div className='bilointroduct'>
    <div className='contentintroduct'><CakeIcon className='iconintroduct'/>Birday: {selectedUser.birday} </div>
    <div className='contentintroduct' style={{marginRight:'300px'}}><RoomIcon  className='iconintroduct'/>Location: {selectedUser.location}</div></div>
    <div className='contentintroduct'><EmailIcon  className='iconintroduct'/>Email: {selectedUser.email} </div>
    <div className='contentintroduct'><PhoneIcon  className='iconintroduct'/>Phone: {selectedUser.Phone}</div>
    <div className='contentintroduct'> <AutoAwesomeIcon  className='iconintroduct'/>My Bio: {selectedUser.bio}  </div>
    
    </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>

      </div>






      
    </div>
  );
}

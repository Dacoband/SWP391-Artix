import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ExploreIcon from '@mui/icons-material/Explore';
import StarsIcon from '@mui/icons-material/Stars';
import MarkunreadMailboxRoundedIcon from '@mui/icons-material/MarkunreadMailboxRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import {ThemeContext} from '../Themes/ThemeProvider.tsx'
import AppLogo from './AppLogo.jsx';
import CustomizedButton from './CustomizedListedButton.tsx';
import { Link } from 'react-router-dom';
export default function CustomizedDrawer() {
  const {theme} = useContext(ThemeContext)
  const [drawer, SetDrawer] = useState(false)
  const toggleDrawer = () => {
    SetDrawer(!drawer)
  }

  const HomePage = ['View All', 'Hot Topic', 'You Loved These', 'Explore']
  const Personal = ['Your Works', 'Your Commisions', 'Your Requests']
  const linkListPersonal = [
    '/chua',
    'yourcommision',
    'yourrequest'
  ];

  const IconListHomePage = [
    <CollectionsIcon />,
    <WhatshotIcon/>,
    <StarsIcon/>,
    <ExploreIcon/>,
  ]
  const IconListPersonal = [
    <CropOriginalIcon/>,
    <MarkunreadMailboxRoundedIcon/>,
    <DesignServicesRoundedIcon/>
  ]
  const MyDrawerList = (

    <Box sx={{ width: "16rem",color:theme.color }} role="presentation" onClick={toggleDrawer}>
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuOpenIcon sx={{color:theme.color}} />  {/* Change the icon when clicked */}
        </IconButton>
       <AppLogo/>
      </Toolbar>
      
      {/* "&::before, &::after": WILL CHANGE Divider Line Color With Text children init */}
      <Divider sx={{"&::before, &::after":{backgroundColor:theme.color}}} variant='middle'>
        <Typography variant='h6'>Home Page</Typography>
      </Divider>
      <List>
        {HomePage.map((text, index) => (
          <ListItem key={text} disablePadding>
            <CustomizedButton >
              <ListItemIcon sx={{color:theme.color}}>
                  {IconListHomePage[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </CustomizedButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{"&::before, &::after":{backgroundColor:theme.color}}} variant='middle'>
        <Typography variant='h6'>Personal</Typography>
      </Divider>
      <List>
        {Personal.map((text, index) => (
          <ListItem key={text} disablePadding>
            <CustomizedButton component={Link} to={linkListPersonal[index]} >
              <ListItemIcon sx={{color:theme.color}}>
                {IconListPersonal[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
              </CustomizedButton >
          </ListItem>
        ))}
      </List>
    </Box>
  ) 

  return (
    <>
      <IconButton sx={{color:theme.color}} onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer 
        PaperProps={{sx:{backgroundColor:theme.backgroundColor}}} //Change the background of the menu bar
        open={drawer} onClose={toggleDrawer} 
        >
        {MyDrawerList}
      
      </Drawer>
    </>
  )
}

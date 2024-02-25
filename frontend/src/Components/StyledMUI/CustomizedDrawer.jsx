import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Toolbar from '@mui/material/Toolbar';
import {ThemeContext} from '../Themes/ThemeProvider.tsx'
import AppLogo from './AppLogo.jsx';

export default function CustomizedDrawer() {
  const {theme} = useContext(ThemeContext)
  const [drawer, SetDrawer] = useState(false)
  const toggleDrawer = (action) => {
    SetDrawer(action)
  }

  const MyDrawerList = (

    <Box sx={{ width: "20vw" }} role="presentation" onClick={() => toggleDrawer(false)}>
      <Toolbar>
        <IconButton onClick={() => toggleDrawer(false)}>
          <MenuOpenIcon sx={{color:theme.color}} />  {/* Change the icon when clicked */}
        </IconButton>
       <AppLogo/>
      </Toolbar>
      <List>
        <Divider variant='middle'>Community</Divider>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider variant='middle'>Personal</Divider>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  ) 

  return (
    <>
      <IconButton sx={{color:theme.color}} onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer 
        PaperProps={{sx:{backgroundColor:theme.backgroundColor}}} //Change the background of the menu bar
        open={drawer} onClose={() => toggleDrawer(false)} 
        >
        {MyDrawerList}
      </Drawer>
    </>
  )
}

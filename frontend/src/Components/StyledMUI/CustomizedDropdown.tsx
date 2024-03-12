import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthenContext.tsx';
import { User } from '../../Interfaces/UserInterface';

//Create an interface for your function to assign types to its props
interface CustomizedDropdownProps{
  user: User;
}
export default function CustomizedDropdown({user}:CustomizedDropdownProps) {
    const {theme,toggleTheme,dark} = useContext(ThemeContext)
    const {logout} = useAuth();
    // Custom style for the Menu component
    const CustomizedMenu = styled(Menu)(() => ({
      '& .MuiPaper-root': {
        backgroundColor: theme.backgroundColor,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
        color:theme.color,
        border:theme.borderColor,
      },
      '':{
        border: `1px, ${theme.color}`
      }
      // Any additional styles you want to apply
    }));
    const [anchorEl, setAnchorEl] = useState(null)
    const [open,setOpen] = useState(false)
  useEffect(()=>{
   
}
)
const handleClick = (event) => {
  setAnchorEl(event.currentTarget)
  setOpen(!open)
};


  return (
    <div>
      <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : ''}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : 'false'}
          >
            <Avatar src={user? user.picture : ""} sx={{ width: 32, height: 32 }}>{user ? user.given_name.charAt[0] : null}</Avatar>
        </IconButton>
      <CustomizedMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'left',flexDirection: 'column' }}>
        <Divider sx={{"&::before, &::after":{backgroundColor:theme.color}}} variant='middle'>
        <Typography variant='caption'>Account</Typography>
        </Divider>
        <MenuItem onClick={handleClick}><Link to={`creatorform`}>Profile</Link></MenuItem>
        <MenuItem onClick={handleClick}>My Dashboard</MenuItem>
        <MenuItem onClick={handleClick}>My Account</MenuItem>
        <Divider sx={{"&::before, &::after":{backgroundColor:theme.color}}} variant='middle'>
        <Typography variant='caption'>Theme</Typography>
        </Divider>
        <MenuItem onClick={toggleTheme}>
          {dark ? "Dark" : "Light"}
          <Switch  checked={dark} />
          </MenuItem>
        <Divider sx={{"backgroundColor":{backgroundColor:theme.color}}} variant='middle'/>
        <MenuItem onClick={logout}>Logout</MenuItem>
        </Box>
      </CustomizedMenu>
    </div>
  );
}

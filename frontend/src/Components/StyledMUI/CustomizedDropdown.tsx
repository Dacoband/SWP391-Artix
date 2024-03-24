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
import { Creator } from '../../Interfaces/UserInterface';
import { LightDarkSwitch } from './CustomizedLightDarkSwitch.tsx';

//Create an interface for your function to assign types to its props
interface CustomizedDropdownProps {
  user: Creator;
  handleClickAsGuest: any;
}
export default function CustomizedDropdown({ user, handleClickAsGuest }: CustomizedDropdownProps) {


  const { theme, toggleTheme, dark } = useContext(ThemeContext)
  const { logout } = useAuth();
  // Custom style for the Menu component
  const CustomizedMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
      backgroundColor: theme.backgroundColor,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
      color: theme.color,
      border: theme.borderColor,
    },
    '': {
      border: `1px, ${theme.color}`
    }
    // Any additional styles you want to apply
  }));
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
  }
  )
  const handleClickDropdown = (event) => {
    if (user === null) {
      handleClickAsGuest()
    }
    else {
      setAnchorEl(event.currentTarget)
      setOpen(!open)
    }
  };

  function DropdownContent() {
    return (
      <>
        <Divider sx={{ "&::before, &::after": { backgroundColor: theme.color } }} variant='middle'>
          <Typography variant='caption'>Account</Typography>
        </Divider>
        <MenuItem ><Link to={`profile/${user.creatorID}`}>Profile</Link></MenuItem>
        <MenuItem ><Link to={`dashboarduser`}>My Dashboard</Link></MenuItem>
        <MenuItem >My Account</MenuItem>
        <Divider sx={{ "&::before, &::after": { backgroundColor: theme.color } }} variant='middle'>
          <Typography variant='caption'>Theme</Typography>
        </Divider>
        <MenuItem >
          <LightDarkSwitch onClick={toggleTheme} checked={dark} />
        </MenuItem>
        <Divider sx={{ "backgroundColor": { backgroundColor: theme.color } }} variant='middle' />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </>
    )
  }

  function Dropdown() {
    return (
      <CustomizedMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClickDropdown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
          <DropdownContent />
        </Box>
      </CustomizedMenu >

    )
  }
  return (
    <div>
      <IconButton
        onClick={handleClickDropdown}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : ''}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <Avatar src={user ? `data:image/jpeg;base64,${user.profilePicture}` : ""} sx={{ width: 32, height: 32 }}>{user ? user.userName.charAt[0] : ""}</Avatar>
      </IconButton>
      {
        user === null ?
          <></>
          :
          <Dropdown />
      }
    </div>
  );
}

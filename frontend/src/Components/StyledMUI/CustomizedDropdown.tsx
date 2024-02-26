import React, { useContext, useState } from 'react';
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

  
  // Custom style for the Menu component
  

export default function CustomizedDropdown() {
    const {theme,toggleTheme,dark} = useContext(ThemeContext)
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  };
  const handleClose = () => {
    setAnchorEl(null)
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
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
        </IconButton>
      <CustomizedMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Dashboard</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <Divider sx={{"&::before, &::after":{backgroundColor:theme.color}}} variant='middle'>
        <Typography variant='caption'>Theme</Typography>
        </Divider>
        <MenuItem onClick={toggleTheme}>
          {dark ? "Dark" : "Light"}
          <Switch checked={dark} />
          </MenuItem>
        <Divider sx={{"backgroundColor":{backgroundColor:theme.color}}} variant='middle'/>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Box>
      </CustomizedMenu>
    </div>
  );
}
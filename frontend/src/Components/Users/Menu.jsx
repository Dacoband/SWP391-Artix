import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import CustomizedDrawer from '../StyledMUI/CustomizedDrawer.tsx';
import AppLogo from '../StyledMUI/AppLogo.jsx';
import ExpandingSearchBar from '../StyledMUI/CustomizedSearchBar.jsx'
import CustomizedDropdown from '../StyledMUI/CustomizedDropdown.tsx';

export default function Menu() {
  const { theme } = useContext(ThemeContext);
// Attempt to retrieve the auth state from sessionStorage
const savedAuth = sessionStorage.getItem('auth');
// Check if there's any auth data saved and parse it
const user = savedAuth ? JSON.parse(savedAuth) : null;
// Now 'auth' contains your authentication state or null if there's nothing saved
  return (
    <div>
      <Box sx={{ flexGrow: 1, boxShadow: '50px' }}>
        <AppBar sx={{ transition: theme.transition, color: theme.color, backgroundColor: theme.backgroundColor }} position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomizedDrawer />
              <AppLogo />
              <ExpandingSearchBar />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit"><Link to={"/"}>Home</Link></Button>

              <Button color="inherit"><Link to={"artworkform"}>Publish Your Works</Link></Button>
             <CustomizedDropdown user={user}/>
            </Box>

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

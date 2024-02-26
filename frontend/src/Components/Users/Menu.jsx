import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import CustomizedDrawer from '../StyledMUI/CustomizedDrawer.jsx';
import AppLogo from '../StyledMUI/AppLogo.jsx';
import ExpandingSearchBar from '../StyledMUI/CustomizedSearchBar.jsx'
import CustomizedDropdown from '../StyledMUI/CustomizedDropdown.tsx';


export default function Menu() {
  const { theme } = useContext(ThemeContext);
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
              <Button color="inherit"><Link to={"create"}>Create</Link></Button>
             <CustomizedDropdown/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

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
<<<<<<< HEAD
import CustomizedDropdown from '../StyledMUI/CustomizedDropdown.tsx';

=======
>>>>>>> origin/Volka

export default function Menu() {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
<<<<<<< HEAD
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
              <Button color="inherit"><Link to={"create"}>Publish Your Works</Link></Button>
             <CustomizedDropdown/>
            </Box>
=======
      <Box sx={{ flexGrow: 1 ,boxShadow: '50px'}}>
        <AppBar sx={{transition:theme.transition,color:theme.color,backgroundColor: theme.backgroundColor }} position="static">
          <Toolbar>
              <CustomizedDrawer/>
              <AppLogo/>
              <ExpandingSearchBar/>
            <Button color="inherit"><Link to={"/"}>Home</Link></Button>
            <Button color="inherit"><Link to={"create"}>Create</Link></Button>
            <Button color="inherit" onClick={toggleTheme}>{dark?"Dark":"Light"}</Button>
>>>>>>> origin/Volka
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import CustomizedDrawer from '../StyledMUI/CustomizedDrawer.jsx';
import AppLogo from '../StyledMUI/AppLogo.jsx';


export default function Menu() {
  const { theme, toggleTheme, dark } = useContext(ThemeContext);
  return (
    <div>
      <Box sx={{ flexGrow: 1 ,boxShadow: '50px'}}>
        <AppBar sx={{transition:theme.transition,color:theme.color,backgroundColor: theme.backgroundColor }} position="static">
          <Toolbar>
              <CustomizedDrawer/>
              <AppLogo/>
            <Typography color="inherit" variant="h5" component="div" sx={{flexGrow: 1, fontFamily:theme.fontFamily}}>
              Gensokyo
            </Typography>
            <Button color="inherit"><Link to={"/"}>Home</Link></Button>
            <Button color="inherit"><Link to={"create"}>Create</Link></Button>
            <Button color="inherit" onClick={toggleTheme}>{dark?"Dark":"Light"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

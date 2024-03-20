import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
function AdminNavbar() {
  // The side drawer width
  const drawerWidth = 240;
  // Sidebar navigation list
  // const adminNavItems = [
  //   { text: 'Dashboard', icon: <HomeIcon /> , link: '/' },
  //   { text: 'Users', icon: <PeopleIcon />, },
  //   { text: 'Reports', icon: <BarChartIcon /> },
    // Add more navigation items here
  // ];
  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        style={{
          width: drawerWidth,
        }}
        open
      >
        <List>
          {/* Dashboard */}
          
          <ListItemButton button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          {/* Users */}
          <Link to={`listuser`}>
          <ListItemButton button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton></Link>

          {/* Reports */}
          <Link to={'report'}>
          <ListItemButton button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton></Link>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: 3 }}>
        {/* Main content will go here */}
      </div>
    </div>
  );
}
export default AdminNavbar;
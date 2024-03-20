import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
function AdminNavbar() {
  // The side drawer width
  const drawerWidth = 240;
  // Sidebar navigation list
  const adminNavItems = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'Users', icon: <PeopleIcon /> },
    { text: 'Reports', icon: <BarChartIcon /> },
    // Add more navigation items here
  ];
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
          {adminNavItems.map((item, index) => (
            <ListItemButton button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: 3 }}>
        {/* Main content will go here */}
      </div>
    </div>
  );
}
export default AdminNavbar;
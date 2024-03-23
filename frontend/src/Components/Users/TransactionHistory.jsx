import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import  { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import '../../css/TransactionHistory.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TablePagination from '@mui/material/TablePagination';

import { Order } from '../../share/Order.js';
// MUI Tab
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
   
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

 

export default function TransactionHistory() {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const { theme } = useContext(ThemeContext)
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //MUI
  // Handle change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page number back to 0 when changing rows per page
  };
  const sortedOrders = Order.sort((a, b) => new Date(b.date) - new Date(a.date));


  // Calculate the portion of users to display based on pagination
  const paginatedUsers = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  const [open, setOpen] = useState(false);
  const handleClose = () => {setOpen(false);};


  return (
    <div className='transaction'>
         <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '85%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          minHeight:'700px'
        }}>
            <h1>Transaction History:</h1>
        <Box sx={{ width: '90%',margin:'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: theme.color3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label= {<div style={{display:'flex',color:theme.color2}}><ShoppingCartIcon style={{transform: 'translateY(-5px)'}}/>Bought History</div>} {...a11yProps(0)} />
          <Tab label={<div style={{display:'flex',color:theme.color2}}><AttachMoneyIcon style={{transform: 'translateY(-5px)'}}/>Sold History</div>} {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <TableContainer component={Paper} style={{marginBottom:'50px', marginTop:'40px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow style={{backgroundColor:'#0b81ff'}}>
            
            <TableCell  style={{color:'white'}} align="left">Name Artwork</TableCell>
            <TableCell style={{color:'white'}} align="left">Artist</TableCell>
            <TableCell style={{color:'white'}} align="left">Pice</TableCell>
            <TableCell style={{color:'white'}} align="left">Date</TableCell>
            <TableCell style={{color:'white'}} align="left">Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.artworkName}
              </TableCell>
              {/* userNamereceiver là của người bán */}
              <TableCell align="left">{order.userNamereceiver}</TableCell>
              <TableCell align="left">{order.price}</TableCell>
              <TableCell align="left">{order.date}</TableCell>
              <TableCell align="left">
                  {order.complete ? 'Complete':'admin is processing'}
                </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={5}
          component="div"
          count={Order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
        




      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <TableContainer component={Paper} style={{marginBottom:'50px', marginTop:'40px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow style={{backgroundColor:'#0b81ff'}}>
            
            <TableCell  style={{color:'white'}} align="left">Name Customer</TableCell>
            <TableCell style={{color:'white'}} align="left">Customer Name</TableCell>
            <TableCell style={{color:'white'}} align="left">Pice</TableCell>
            <TableCell style={{color:'white'}} align="left">Date</TableCell>
            <TableCell style={{color:'white'}} align="left">Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.artworkName}
              </TableCell>
              {/* userNamereceiver là của người mua */}
              <TableCell align="left">{order.userNamerequestor}</TableCell>
              <TableCell align="left">{order.price}</TableCell>
              <TableCell align="left">{order.date}</TableCell>
              <TableCell align="left">
                  {order.complete ? 'Complete':'Admin is processing'}
                </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={5}
          component="div"
          count={Order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
      </CustomTabPanel>
    
    </Box>








    </Box>
    </div>
  )
}

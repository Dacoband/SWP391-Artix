import React from 'react'

import { Container, Box, Typography, Paper, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Order } from '../../share/Order.js';
import TablePagination from '@mui/material/TablePagination';
import PhotoIcon from '@mui/icons-material/Photo';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PaymentIcon from '@mui/icons-material/Payment'; 
export default function ManageOrders() {
  //Mui Table page
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
// Accpet
const [acceptedItems, setAcceptedItems] = useState({});
//ID của đơn hàng
// Đổi lại id thành OrderDetailID để khớp với bản tụi mình đang làm nha
const handleAccept = (id) => {
  setAcceptedItems((prevState) => ({
      ...prevState,
      [id]: true, 
  }));
};
//Backdrop Mui
const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);
const [selectedOrderID, setSelectedOrderID] = useState(null);
const handleClose = () => {
  setOpen(false);
};
const handleOpen = (id) => {
  setSelectedOrderID(id);
  setOpen(true);
};
const handleOpen2 = (id) => {
  setSelectedOrderID(id);
  setOpen2(true);
};


  return (
    <Container style={{marginLeft:'300px'}}>
    <Typography variant="h4" gutterBottom style={{fontWeight:'bold', marginTop:'40px'}}>
       Manage Orders:
     </Typography>
     <TableContainer component={Paper} style={{marginBottom:'50px', marginTop:'40px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow style={{backgroundColor:'#0b81ff'}}>
            
            <TableCell  style={{color:'white'}} align="left">Name Artwork</TableCell>
            <TableCell style={{color:'white'}} align="left">Customer Name</TableCell>
            <TableCell style={{color:'white'}} align="left">Artist</TableCell>
            <TableCell style={{color:'white'}} align="left">Pice</TableCell>
            <TableCell style={{color:'white'}} align="left">Cost</TableCell>
            <TableCell style={{color:'white'}} align="left">Transaction image</TableCell>
            <TableCell style={{color:'white'}} align="left">Date</TableCell>
            <TableCell style={{color:'white'}} align="left">Account Artist</TableCell>
            
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
              <TableCell align="left">{order.userNamerequestor}</TableCell>
              <TableCell align="left">{order.userNamereceiver}</TableCell>
              <TableCell align="left">{order.price}$</TableCell>
              <TableCell align="left">{order.price *0.9}$</TableCell>
              <TableCell align="left"> <Button onClick={() => handleOpen(order.id)}><PhotoIcon fontSize="large" style={{marginLeft:'40px',color:'black'}}/></Button></TableCell>
              <TableCell align="left">{order.date}</TableCell>
              <TableCell align="left"><Button onClick={() => handleOpen(order.id)}><PaymentIcon fontSize="large" style={{marginLeft:'40px',color:'black'}}/></Button></TableCell>
             
             
              <TableCell align="left">
              {order.complete ? (
                <Button color='success'>Complete</Button>
               ) : (
                <div>
                 {!acceptedItems[order.id] && (
                <Button  onClick={() => handleAccept(order.id)}>Accept</Button>)}
                {acceptedItems[order.id] && (
                  <Button color='success'>Complete</Button>
               )}

                </div>
               )}
                </TableCell>
             

             {/* Backdrop */}
                <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open={open && selectedOrderID === order.id}
             onClick={handleClose}
           >
            <Button onClick={handleClose} style={{fontSize:'50px', transform: 'translateY(-350px) translateX(800px)', color:'white'}}>X</Button>
             <img src={order.image} style={{maxWidth:'700px'}}/>
           </Backdrop>
           <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open={open2 && selectedOrderID === order.id}
             onClick={handleClose}
           >
            <Button onClick={handleClose} style={{fontSize:'50px', transform: 'translateY(-350px) translateX(800px)', color:'white'}}>X</Button>
             <img src={order.image} style={{maxWidth:'700px'}}/>
           </Backdrop>
            
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
   
        
     
</Container>
  )
}

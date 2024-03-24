import React, { useEffect } from 'react'
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
import { OrderDetails, OrderDetailsExtended, OrderHeader, OrderHeaderExtended } from '../../Interfaces/OrderInterfaces.ts';
import { GetOrderDetailList, GetOrderDetailListNoImage, GetOrderDetailListNoImageExtended, GetOrderDetaiPaymentlID, GetOrderHeaderByID } from '../../API/OrderAPI/GET.tsx';
import { Payment } from '../../Interfaces/PaymentIntrerfaces.ts'
import { GetPaymentAccount } from '../../API/PaymentAPI/GET.tsx';
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Creator } from '../../Interfaces/UserInterface.ts';
export default function ManageOrders() {
  const [orderList,setOderList] = useState<OrderDetailsExtended[]>()
  const [orderHeader,setOrderHeader] = useState<OrderHeader>()
  const [payment,SetPayment] = useState<Payment>()
  const [bill,SetBill] = useState<string>()

  useEffect(() =>{
    const getOrderList = async() =>{
      let orderList:OrderDetailsExtended[]|undefined = await GetOrderDetailListNoImageExtended()
      setOderList(orderList)
     // let orderHeader:OrderHeader[]|undefined = await GetO()
    }
    getOrderList()
  },[])

    const handleGetBill = async(id:string)=>{
      let bill:string|undefined = await GetOrderDetaiPaymentlID(id)
      SetBill(bill)
    }

    const handleGetQR = async(id:string)=>{
      let orderHeader:OrderHeaderExtended = await GetOrderHeaderByID(id)
      let payment:Payment = await GetPaymentAccount(orderHeader.accountID)
      SetPayment(payment)
      SetBill(bill)
    }

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
const sortedOrders = orderList?.sort((a, b) => parseInt(b.orderID) - parseInt(a.orderID));


// Calculate the portion of users to display based on pagination
const paginatedUsers = sortedOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
const [open, setOpen] = React.useState(false);
const [open2, setOpen2] = React.useState(false);
const [selectedOrderID, setSelectedOrderID] = useState(null);
const handleClose = () => {
  setOpen(false);
  setOpen2(false);
};
// handle for seeing the bill
const handleOpen = (orderDetailID) => {
  setSelectedOrderID(orderDetailID);
  setOpen(true);
};

// handle for seeing the qr to pay the creator
const handleOpen2 = (orderDetailID) => {
  setSelectedOrderID(orderDetailID);
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
          {orderList?.map((order) => (
            <TableRow
              key={order.orderID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.artworkName}
              </TableCell>
              {/* userNamereceiver là của người bán */}
              <TableCell align="left">{order.creatorFirstName}</TableCell>
              <TableCell align="left">{order.creatorUsername}</TableCell>
              <TableCell align="left">{order.price}$</TableCell>
              <TableCell align="left">{order.price??0 * 0.9}$</TableCell>
              <TableCell align="left"> <Button onClick={() => {handleOpen(order.orderDetailID);handleGetBill(order.orderDetailID)}}><PhotoIcon fontSize="large" style={{marginLeft:'40px',color:'black'}}/></Button></TableCell>
              <TableCell align="left">{order.dateOfPurchase?.toString()}</TableCell>
              <TableCell align="left"><Button onClick={() => {handleOpen2(order.orderDetailID);handleGetQR(order.orderID)}}><PaymentIcon fontSize="large" style={{marginLeft:'40px',color:'black'}}/></Button></TableCell>
             
             {/* Payment For Creator  */}
              <TableCell align="left">
              { orderHeader?.orderID?(
                <Button color='success'>Complete</Button>
               ) : (
                <div>
                 {!acceptedItems[order.orderDetailID??1] && (
                <Button  onClick={() => handleAccept(order.orderID)}>Accept</Button>)}
                {acceptedItems[order.orderID??0] && (
                  <Button color='success'>Complete</Button>
               )}

                </div>
               )}
                </TableCell>
             

             {/* Backdrop for bill image */}
                <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open={open && selectedOrderID === order.orderDetailID}
             onClick={handleClose}
           >
            <Button onClick={handleClose} style={{fontSize:'50px', transform: 'translateY(-350px) translateX(800px)', color:'white'}}>X</Button>
             <img src={`${bill}`} style={{maxWidth:'700px',height:'90vh'}}/>
           </Backdrop>
                  {/* Backdrop for creator QR image */}
           <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open={open2 && selectedOrderID === order.orderDetailID}
             onClick={handleClose}
           >
            <Button onClick={handleClose} style={{fontSize:'50px', transform: 'translateY(-350px) translateX(800px)', color:'white'}}>X</Button>
             <img src={`data:image/jpeg;base64,${payment}`} style={{maxWidth:'700px',height:'90vh'}}/>
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

import React, { useEffect } from 'react'
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Order } from '../../share/Order.js';
import TablePagination from '@mui/material/TablePagination';
import PhotoIcon from '@mui/icons-material/Photo';
import { useState } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import { OrderDetails, OrderDetailsExtended, OrderHeader, OrderHeaderExtended } from '../../Interfaces/OrderInterfaces.ts';
import { GetOrderDetailList, GetOrderDetailListNoImage, GetOrderDetailListNoImageExtended, GetOrderDetaiPaymentlID, GetOrderHeader, GetOrderHeaderByID } from '../../API/OrderAPI/GET.tsx';
import { Payment } from '../../Interfaces/PaymentIntrerfaces.ts'
import { GetPaymentAccount } from '../../API/PaymentAPI/GET.tsx';
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { PutOrderHeader } from '../../API/OrderAPI/PUT.tsx';
export default function ManageOrders() {
  const [orderList, setOderList] = useState<OrderDetailsExtended[]>()
  const [orderHeader, setOrderHeader] = useState<OrderHeader[] | undefined>()
  const [payment, SetPayment] = useState<Payment>()
  const [bill, SetBill] = useState<string>()
  const [loading, setLoading] = useState(false);
  const [sendCompleted, setSendCompleted] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);

  useEffect(() => {
    const getOrderList = async () => {
      setLoading(true)
      let orderList: OrderDetailsExtended[] | undefined = await GetOrderDetailListNoImageExtended()
      setOderList(orderList)
      let orderHeader: OrderHeader[] | undefined = await GetOrderHeader()
      setOrderHeader(orderHeader)
      setLoading(false)
    }
    getOrderList()
  }, [open3])

  const handleGetBill = async (id: string) => {
    let bill: string | undefined = await GetOrderDetaiPaymentlID(id)
    SetBill(bill)
  }

  const handleGetQR = async (id: string) => {
    let orderHeader: OrderHeaderExtended = await GetOrderHeaderByID(id)
    let payment: Payment = await GetPaymentAccount(orderHeader.accountID)
    SetPayment(payment)
  }

  const handleConfirmations = async (id: string) => {
    setLoading(true)
    try {
      let orderHeader: OrderHeaderExtended = await GetOrderHeaderByID(id)
      const updateOrderHeader: OrderHeader = {
        orderID: orderHeader.orderID,
        creatorID: orderHeader.creatorID,
        confirmation: true
      }
      const response = await PutOrderHeader(updateOrderHeader, orderHeader.orderID)
      console.log(response)
      setSendCompleted(true)
      setOpen3(true)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }


  
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // Ignore close events from clicking away
    if (reason === 'clickaway') {
      return;
    }
    setOpen3(false);
  };


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


  // Calculate the portion of users to display based on paginatio
  //Backdrop Mui

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
    <Container style={{ marginLeft: '300px' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginTop: '40px' }}>
        Manage Orders:
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: '50px', marginTop: '40px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow style={{ backgroundColor: '#0b81ff' }}>

              <TableCell style={{ color: 'white' }} align="left">Order ID</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Buyer Name</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Seller Name</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Pice</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Cost</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Transaction image</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Date</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Account Artist</TableCell>
              <TableCell style={{ color: 'white' }} align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {orderList?.map((order) => (
              <TableRow
                key={order.orderID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.orderID}
                </TableCell>
                {/* userNamereceiver là của người bán */}
                <TableCell align="left">{order.buyerName}</TableCell>
                <TableCell align="left">{order.sellerName}</TableCell>
                <TableCell align="left">{order.price}$</TableCell>
                <TableCell align="left">{order.price ?? 0 * 0.9}$</TableCell>
                <TableCell align="left"> <Button onClick={() => { handleOpen(order.orderDetailID); handleGetBill(order.orderDetailID) }}><PhotoIcon fontSize="large" style={{ marginLeft: '40px', color: 'black' }} /></Button></TableCell>
                <TableCell align="left">{order.dateOfPurchase?.toString()}</TableCell>
                <TableCell align="left"><Button onClick={() => { handleOpen2(order.orderDetailID); handleGetQR(order.orderID) }}><PaymentIcon fontSize="large" style={{ marginLeft: '40px', color: 'black' }} /></Button></TableCell>

                {/* Payment For Creator  */}
                <TableCell align="left">
                  {order.orderID === orderHeader?.find(header => header.orderID === order.orderID).orderID && orderHeader?.find(header => header.orderID === order.orderID)?.confirmation===true  ? 
                      <Button color='success'>Complete</Button>
                   : 
                      <Button onClick={() => handleConfirmations(order.orderID)}>Accept</Button>
                  }
                </TableCell>


                {/* Backdrop for bill image */}
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open && selectedOrderID === order.orderDetailID}
                  onClick={handleClose}
                >
                  <Button onClick={handleClose} style={{ fontSize: '50px', transform: 'translateY(-350px) translateX(800px)', color: 'white' }}>X</Button>
                  <img src={`${bill}`} style={{ maxWidth: '700px', height: '90vh' }} />
                </Backdrop>
                {/* Backdrop for creator QR image */}
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open2 && selectedOrderID === order.orderDetailID}
                  onClick={handleClose}
                >
                  <Button onClick={handleClose} style={{ fontSize: '50px', transform: 'translateY(-350px) translateX(800px)', color: 'white' }}>X</Button>
                  <img src={`data:image/jpeg;base64,${payment}`} style={{ maxWidth: '700px', height: '90vh' }} />
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
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={sendCompleted ? "success" : "error"} sx={{ width: '100%' }}>
            {sendCompleted ? "Your form has been submitted successfully!" : "Sending Form Failed!"}
          </Alert>
        </Snackbar>
      </TableContainer>



    </Container>
  )
}

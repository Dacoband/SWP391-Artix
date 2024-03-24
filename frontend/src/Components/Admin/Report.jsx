import React from 'react'
import AdminNavbar from './NavigationAd';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ListofUsers } from '../../share/ListofUsers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VerifiedIcon from '@mui/icons-material/Verified';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import TablePagination from '@mui/material/TablePagination';
import { Container, Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogActions from '@mui/material/DialogActions';
export default function Report() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
   // Handle change page
   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page number back to 0 when changing rows per page
  };

  // Calculate the portion of users to display based on pagination
  const paginatedUsers = ListofUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  const [open, setOpen] = useState(false);
  const handleClose = () => {setOpen(false);};


  return (
    <Container style={{marginLeft:'350px'}}>
    <Typography variant="h4" gutterBottom style={{fontWeight:'bold', marginTop:'40px'}}>
          List Of Report:
        </Typography>


        <TableContainer component={Paper} style={{marginBottom:'70px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow style={{backgroundColor:'#0b81ff'}}>
            <TableCell style={{color:'white'}}>ID Report</TableCell>
            <TableCell  style={{color:'white'}} align="left">Reported User ID</TableCell>
            <TableCell style={{color:'white',width:'220px'}} align="left">Reported User Name</TableCell>
            <TableCell style={{color:'white',width:'500px'}} align="left">Reason for being reported</TableCell>
            
            <TableCell style={{color:'white',width:'100px'}} align="left">Ban Account</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              {/* user.User là user Name */}
              <TableCell align="left">{user.User}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.Phone}</TableCell>
              
              <TableCell align="left">
                 <Button variant="contained" color="error" onClick={ ()=>{setOpen(true)}}>
                 <WarningIcon/>
               </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={ListofUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      {"Congraturation"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      <Alert severity="success">
    <AlertTitle>You want to ban this account ?</AlertTitle>
    </Alert>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {/* chỗ này gắn hàm vô : onClick={()=>handleDelete()}*/}
      <Button  >yes</Button>
      <Button autoFocus onClick={handleClose}>
       No
      </Button>
    </DialogActions>
  </Dialog>
    
    </Container>
  )
}

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
  
  


  return (
    <Container style={{marginLeft:'260px'}}>
    <Typography variant="h4" gutterBottom style={{fontWeight:'bold', marginTop:'40px'}}>
          List Of Report:
        </Typography>


        <TableContainer component={Paper} style={{marginBottom:'70px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow style={{backgroundColor:'#0b81ff'}}>
            <TableCell style={{color:'white'}}>ID</TableCell>
            <TableCell  style={{color:'white'}} align="left">User Name</TableCell>
            <TableCell style={{color:'white',width:'350px'}} align="left">Email</TableCell>
            <TableCell style={{color:'white'}} align="left">Phone</TableCell>
            <TableCell style={{color:'white'}} align="left">Vip</TableCell>
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
                  {user.vip ? <VerifiedIcon color="success"/> : null}
                </TableCell>
              <TableCell align="left">
                 <Button variant="contained" color="error">
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
    
    
    </Container>
  )
}

// // dung cho searchuser
// import '../../css/SearchListadmin.css'
// import { SearchResult } from './SearchResult'
// import { Link } from 'react-router-dom';
// export const SearchResultsList = ({ dataCreator }) => {
//   console.log(dataCreator);
//     return (
//       <div className="results-list">
//         {dataCreator.map((dataCreator, id) => {
//           return  <SearchResult result={dataCreator.userName} resultId={dataCreator.creatorID} resultIdkey={id} />;
//         })}
//         </div>
//   );
// };




import React, { useEffect } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogActions from '@mui/material/DialogActions';
import { GetCreatorListNoImage } from '../../API/UserAPI/GET.tsx';

export const SearchResultsList = ({ dataCreator }) => {
  // console.log(dataCreator);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(4);
  // const [userList,setUserList] = useState([])
  // Handle change page
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // Handle change rows per page
  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0); // Reset page number back to 0 when changing rows per page
  // };

  // Calculate the portion of users to display based on pagination
  // const paginatedUsers = userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  return (

    <div style={{ height: 'auto', width: '100%', marginTop: '40px' }}>
      <TableContainer component={Paper} style={{ marginBottom: '70px' }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table" >
          <TableHead style={{ display: 'flex', flexDirection: 'column',backgroundColor: '#0b81ff' }}>
            <TableRow style={{ display: 'flex', justifyContent: 'space-around', }}>
              <TableCell style={{ color: 'white',width: '0' }} align="left">ID</TableCell>
              <TableCell style={{ color: 'white',width: '100px' }} align="left">User Name</TableCell>
              <TableCell style={{ color: 'white',width: '300px' }} align="left">Email</TableCell>
              <TableCell style={{ color: 'white',width: '100px' }} align="left">Phone</TableCell>
              <TableCell style={{ color: 'white',width: '50px' }} align="left">Vip</TableCell>
              <TableCell style={{ color: 'white',width: '50px' }} align="left">Ban Account</TableCell></TableRow>
          </TableHead>
          <TableBody style={{ display: 'flex', flexDirection: 'column', }} >
            {dataCreator.map((dataCreator, id) => (
              <div>
                <TableRow style={{ display: 'flex', justifyContent: 'space-around', }}>
                  <TableCell sx={{ width: '0' }} align="left">{dataCreator.creatorID}</TableCell>
                  <TableCell sx={{ width: '100px' }} align="left">{dataCreator.userName}</TableCell>
                  <TableCell sx={{ width: '300px' }} align="left">{dataCreator.email}</TableCell>
                  <TableCell sx={{ width: '100px' }} align="left">{dataCreator.phone}</TableCell>
                  <TableCell sx={{ width: '50px' }} align="left">{dataCreator.vip ? <VerifiedIcon color="success" /> : null}</TableCell>
                  <TableCell sx={{ width: '50px' }} align="left"><Button variant="contained" color="error" onClick={() => { setOpen(true) }}><WarningIcon /> </Button>
                  </TableCell>
                </TableRow>
              </div>
            ))}
          </TableBody>
        </Table>

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

      </TableContainer>







    </div>

  )
}


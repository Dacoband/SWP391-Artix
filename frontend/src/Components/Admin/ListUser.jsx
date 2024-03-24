import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import ExpandingSearchBarAdmin from './SearchBar';
export default function ListUser() {
  return (
    
     <Container style={{marginLeft:'350px'}}>
       <Typography variant="h4" gutterBottom style={{fontWeight:'bold', marginTop:'40px'}}>
          List Of Users:
        </Typography>
        <ExpandingSearchBarAdmin/>
   </Container>
  );
}

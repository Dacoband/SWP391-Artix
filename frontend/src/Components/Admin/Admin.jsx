import React from 'react'
import { Container, Box, Typography, Paper } from '@mui/material';
import AdminNavbar from './NavigationAd';
import MyLineChart from './Charts/LineChart';

export default function Admin() {
  return (
    <Container maxWidth="lg">
      <AdminNavbar />
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {/* Other sections will go here */}

        <Paper style={{ padding: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h6" gutterBottom>
               Monthly Visitors
          </Typography>
          <MyLineChart /> {/* This is where the chart gets rendered */}
        </Paper>
      </Box>
    </Container>
  )
}

import React from 'react'
import { Container, Box, Typography, Paper } from '@mui/material';
import AdminNavbar from './NavigationAd';
import MyLineChart from './Charts/LineChart';
import '../../css/Admin.css';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
  
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Statistical chart of likes of works',
    },
  },
  scales: {
    x: {
      grid: {
        color: '#ECECEC', // Màu của đường lưới trục X
        lineWidth: 1, // Độ dày của đường lưới trục X
      },
      ticks: {
        // color: 'theme.color2', // Màu của nhãn trục X
        max: 10, // Số lượng thanh trục X
      },
    },
    y: {
      grid: {
        color: '#ECECEC', // Màu của đường lưới trục Y
        lineWidth: 1, // Độ dày của đường lưới trục Y
      },
      ticks: {
        // color: 'black', // Màu của nhãn trục Y
        max: 10, // Số lượng thanh trục Y
      },
    },
  },
};




// sơ đồ 2
export const data2 = {
  labels: ['Non-VIP Users', 'VIP Users'],
  datasets: [
    {
      label: '# of Votes',
      data: [15,5],
      backgroundColor: [
        'rgb(46, 144, 250)',
        'rgb(234, 197, 79)',
        
      ],
      borderColor: [
        'rgb(46, 144, 250)',
        'rgb(234, 197, 79)',
   
      ],
      borderWidth: 1,
    },
  ],
};
const options2 = {
  responsive: true,
  cutoutPercentage: 70, // Điều chỉnh độ dày của biểu đồ, giá trị từ 0 đến 100
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 15,
        },
      },
    },
    title: {
      color:'black',
      display: true,
      text: 'User statistics diagram ',
      font: {
        size: 20,
      },
    },
  },
};
// sơ đồ 1
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  
  labels,
  datasets: [
    {
      label: 'Number of likes',
      data: ['30','20','30','40','50','60','70'],
      backgroundColor: '#01b8ef', 
      boderColor:'black',// Màu của cột chính
      boderWidth:'1'
    },
    
  ],
};
export default function Admin() {
  return (
    <Container maxWidth="lg">
      <AdminNavbar />
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        {/* Other sections will go here */}
        <div className='total'>
          <Box>
            Total Users:

          </Box>
          <Box>
            Total Arts:

          </Box>

        </div>
        <div className='allchart'>
         <Box className='boxchart'>
        <div className='chart'style={{width:'800px',margin:'auto', padding:'25px'}}>
        <Bar options={options} data={data} /></div></Box> 


      <Box className='boxdoughnut'>
        <div className='doughnut' style={{width:'350px'}}>
          <h4>Total: 20 users</h4>
        <Doughnut options={options2} data={data2} />

        </div></Box>



        </div>

        
      </Box>
    </Container>
  )
}

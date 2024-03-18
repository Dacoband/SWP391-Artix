// import React, { useContext, useEffect, useState } from 'react'

  
// function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;
//     return (
//         <div
//           role="tabpanel"
//           hidden={value !== index}
//           id={`simple-tabpanel-${index}`}
//           aria-labelledby={`simple-tab-${index}`}
//           {...other}
//         >
//           {value === index && (
//             <Box sx={{ p: 2 }}>
//               <Typography>{children}</Typography>
//             </Box>
//           )}
//         </div>
//       );
//     }
    
//     CustomTabPanel.propTypes = {
//       children: PropTypes.node,
//       index: PropTypes.number.isRequired,
//       value: PropTypes.number.isRequired,
//     };
    
//     function a11yProps(index) {
//       return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//       };
//     }


// export default function DashboardUser() {
//     const { theme } = useContext(ThemeContext)
 


//     // Sắp xếp danh sách tác phẩm theo thời gian từ mới nhất đến cũ nhất
//     const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
//     // Lấy 10 tác phẩm mới nhất
//     const latestWorks = sortedWork.slice(0, 10);

//      const sortedWork2 = Work.sort((a, b) => b.like - a.like);
//      const likeWorks = sortedWork2.slice(0, 10);
        
    
   
//         const [value, setValue] = React.useState(0);

//         const handleChange = (event, newValue) => {
//           setValue(newValue);
//         };

//   return (
//     <div className='boxdashboard'>
//         <Box className='box'
//         sx={{
//           color: theme.color,
//           backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
//           transition: theme.transition,
//           width: '90%',
//           margin: 'auto',
//           borderRadius: '5px',
//           marginBottom: '15px',
          
//         }}>


//           <h1>Your Dashboard :</h1>
//      <div className='tong'>    
//      <div className='1' style={{width:'60%'}}>    
//              <Box sx={{ width: '100%' }}>
//             <div className='headertab'>  
//       <Box sx={{ borderBottom: 1, borderColor: 'gray',width:'80%',}}>
//         <Tabs value={value} onChange={handleChange} style={{color:theme.color2,zIndex:'7'}} centered>
//           <Tab label=" Top 10 newest works" {...a11yProps(0)} />
//           <Tab label="Top 10 works with the most likes" {...a11yProps(1)} />
        
//         </Tabs>
//       </Box></div>
//       <CustomTabPanel value={value} index={0}>
//         <div className='contentdashboard'>
//       <div className='chart'>
//                  <LineChart
//                           xAxis={[{ data: latestWorks.map((work, index) => index + 1) }]}
//                           series={[{ data: latestWorks.map(work => work.like) }]}
                      
//                         width={720}
//                         height={450}
                        
                        
//                     />
//             </div>


//             <div className='explication'>
//    <h2>Featured Artworks: </h2>
//   {latestWorks.map((work, index) => (
//     <div className='namework' key={index}>
//       {index + 1}: {work.namework} 
//       {/* {work.date} */}
//     </div>
//   ))}
// </div>
                
            
//             </div>
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//       <div className='contentdashboard'>
//       <div className='chart' style={{color:theme.color2}}>
//                  <LineChart
//                           xAxis={[{ data: likeWorks.map((work, index) => index + 1) }]}
//                           series={[{ data: likeWorks.map(work => work.like) }]}
                      
//                         width={720}
//                         height={450}
                        
//                     />
//             </div>


//             <div className='explication'>
//    <h2>Featured Artworks: </h2>
//    <div className='nameworks-container'>
//   {likeWorks.map((work, index) => (
//     <div className='namework' key={index}>
//       {index + 1}: {work.namework}
//       {/* {work.like} */}
//     </div>
//   ))}
// </div>
// </div>
                
            
//             </div>
//       </CustomTabPanel>
      
//     </Box>
//     </div> 


//         <div className='overview'>
          
//           <div className='contentoverview'>
//            <h2>Information overview</h2>

//            <div className='line'>
//            <div className='line1'> Total commission received: 100   </div>
//             <div className='line1'>Total commission sent :  100    </div>
//             <div className='line1'>Your post number:  5  </div></div>
//             <div className='line'>
//             <div className='line1'>Number of works sold: </div>
//             <div className='line1'>Number of works bought: </div>
//             <div className='line1'>Your number of likes: 20 </div>   
//                </div>
         
          
//           </div>
//         </div>
//         </div> 
        


//         </Box>



//     </div>
    
//   )
// }
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Work } from '../../share/ListofWork.js';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import '../../css/DashboardUser.css';
import { createTheme } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

//MUI

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
        <Box sx={{ p: 2 }}>
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
//Chart2- chỉnh biểu đồ
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
      text: 'Biểu đồ cột của Chart.js',
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

//data

    // Sắp xếp danh sách tác phẩm theo thời gian từ mới nhất đến cũ nhất
    const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Lấy 10 tác phẩm mới nhất
    const latestWorks = sortedWork.slice(0, 10);
// lấy lượt like
     const sortedWork2 = Work.sort((a, b) => b.like - a.like);
     const likeWorks = sortedWork2.slice(0, 10);
     
// thông tin x/y của 10 tp gần nhất
const labels = latestWorks.map((work, index) => index + 1) ;

export const data = {
  
  labels,
  datasets: [
    {
      label: 'Số lượt like',
      data: latestWorks.map(work => work.like) ,
      backgroundColor: '#01b8ef', 
      boderColor:'black',// Màu của cột chính
      boderWidth:'1'
    },
    
  ],
};
// thông tin của x/y của 10 tác phẩm nhiều like nhất

const labels2 = likeWorks.map((work, index) => index + 1) ;

export const data2 = {
  
  labels : labels2,
  datasets: [
    {
      label: 'Số lượt like',
      data: likeWorks.map(work => work.like) ,
      backgroundColor: '#01b8ef', 
      boderColor:'black',// Màu của cột chính
      boderWidth:'1'
    },
    
  ],
};


export default function DashboardUser() {
  const { theme } = useContext(ThemeContext)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='boxdashboard'>
       <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '85%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
          <h1>Your Dashboard :</h1>



          <div>
          <Box sx={{ width: '100%' }}>
           <div className='headertab'> 
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                   <Tabs value={value} onChange={handleChange}   aria-label="basic tabs example">
                   <Tab label="Top 10 newest works" {...a11yProps(0)} />
                   <Tab label="Top 10 works with the most likes" {...a11yProps(1)} />
          
                   </Tabs>
              </Box></div>

              <CustomTabPanel value={value} index={0}>
                  <div className='contentdashboard' >
                  <div className='chart'style={{width:'900px'}}>
                     <Bar options={options} data={data} />
                  </div>   
                     <div className='explication' style={{border:'1px solid', borderColor:theme.color3}}>
                        <h3> <EditNoteIcon style={{transform: 'translateY(22%)'}}/>Featured Artworks: </h3>
                        <div className='nameworks-container'>
                        {latestWorks.map((work, index) => (
                           <div className='namework' key={index}>
                              {index + 1}: {work.namework} 
                               {/* {work.date} */}
                            </div>
                         ))}</div>
                      </div>
                   </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
              <div style={{width:'900px'}}>
                     <Bar options={options} data={data2} />
                     <div className='explication'>
                        <h2>Featured Artworks: </h2>
                        {likeWorks.map((work, index) => (
                           <div className='namework' key={index}>
                              {index + 1}: {work.namework} 
                               {/* {work.date} */}
                            </div>
                         ))}
                      </div>
                   </div>
        
              </CustomTabPanel>
   
    </Box>
          </div>


         < div className='contentoverview'>
           <h1>Information overview</h1>

            <div className='line'>
            <div className='line1'> Total commission received: 100   </div>
             <div className='line1'>Total commission sent :  100    </div>
             <div className='line1'>Your post number:  5  </div></div>
             <div className='line'>
             <div className='line1'>Number of works sold: </div>
             <div className='line1'>Number of works bought: </div>
             <div className='line1'>Your number of likes: 20 </div>   
               </div>
         
          
           </div>

    




    




</Box>
</div>




  
  );
}




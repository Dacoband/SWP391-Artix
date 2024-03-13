import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Work } from '../../share/ListofWork.js';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


  
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


export default function DashboardUser() {
    const { theme } = useContext(ThemeContext)


    // Sắp xếp danh sách tác phẩm theo thời gian từ mới nhất đến cũ nhất
    const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Lấy 10 tác phẩm mới nhất
    const latestWorks = sortedWork.slice(0, 10);

    // const sortedWork = Work.sort((a, b) => {
    //     const dateComparison = new Date(b.date) - new Date(a.date);
    //     if (dateComparison !== 0) {
    //       return dateComparison;
    //     }
    //     return new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`);
    //   });
    
    //   const latestWorks = sortedWork.slice(0, 10);
    
   
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
          setValue(newValue);
        };

  return (
    <div>
        <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '95%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
             <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="TOP 10 NEW" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className='chart'>
                 <LineChart
                          xAxis={[{ data: latestWorks.map((work, index) => index + 1) }]}
                          series={[{ data: latestWorks.map(work => work.like) }]}
                      
                        width={700}
                        height={450}
                    />
            </div>


            <div>
                Name: {latestWorks.map(work => 
                    
                    
                    <div>{work.namework} and {work.date} and {work.like}</div>)} 
            </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      
    </Box>


        




        </Box>







    </div>
  )
}
// import React, { useContext, useState } from 'react';
// import { ThemeContext } from '../Themes/ThemeProvider.tsx';
// import Box from '@mui/material/Box';
// import { Work } from '../../share/ListofWork.js';
// import { LineChart } from '@mui/x-charts/LineChart';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// export default function DashboardUser() {
//     const { theme } = useContext(ThemeContext);
//     const [works, setWorks] = useState([]);
//     const [showChart, setShowChart] = useState(false);

//     const sortWorksByDate = () => {
//         const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setWorks(sortedWork.slice(0, 10));
//         setShowChart(true);
//     };

//     const sortWorksByLikes = () => {
//         const sortedWork = Work.sort((a, b) => b.like - a.like);
//         setWorks(sortedWork.slice(0, 10));
//         setShowChart(true);
//     };

//     return (
//         <div>
//             <Box className='box'
//                 sx={{
//                     color: theme.color,
//                     backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
//                     transition: theme.transition,
//                     width: '95%',
//                     margin: 'auto',
//                     borderRadius: '5px',
//                     marginBottom: '15px',
//                 }}>
//                 <div className='chart'>
//                     {showChart && (
//                         <LineChart
//                             xAxis={[{ data: works.map((work, index) => index + 1) }]}
//                             series={[{ data: works.map(work => work.like) }]}
//                             width={700}
//                             height={450}
//                         />
//                     )}
//                 </div>
//                 <button onClick={sortWorksByDate}>Top 10 mới nhất</button>
//                 <button onClick={sortWorksByLikes}>Top 10 like nhiều nhất</button>

//                 <div>
//                     {works.map(work => 
//                         <div>Name: {work.namework}, Date: {work.date}, Likes: {work.like}</div>
//                     )}
//                 </div>
//             </Box>
//         </div>
//     );
// }
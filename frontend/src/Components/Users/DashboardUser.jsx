// import React, { useContext, useEffect, useState } from 'react'
// import { ThemeContext } from '../Themes/ThemeProvider.tsx';
// import Box from '@mui/material/Box';
// import { Work } from '../../share/ListofWork.js';
// import { LineChart } from '@mui/x-charts/LineChart';



// export default function DashboardUser() {
//     const { theme } = useContext(ThemeContext)


//     // Sắp xếp danh sách tác phẩm theo thời gian từ mới nhất đến cũ nhất
//     const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
//     // Lấy 10 tác phẩm mới nhất
//     const latestWorks = sortedWork.slice(0, 10);

//     // const sortedWork = Work.sort((a, b) => {
//     //     const dateComparison = new Date(b.date) - new Date(a.date);
//     //     if (dateComparison !== 0) {
//     //       return dateComparison;
//     //     }
//     //     return new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`);
//     //   });
    
//     //   const latestWorks = sortedWork.slice(0, 10);
    
    

//   return (
//     <div>
//         <Box className='box'
//         sx={{
//           color: theme.color,
//           backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
//           transition: theme.transition,
//           width: '95%',
//           margin: 'auto',
//           borderRadius: '5px',
//           marginBottom: '15px',
          
//         }}>


//          <div className='chart'>
//                  <LineChart
//                           xAxis={[{ data: latestWorks.map((work, index) => index + 1) }]}
//                           series={[{ data: latestWorks.map(work => work.like) }]}
                      
//                         width={700}
//                         height={450}
//                     />
//             </div>


//             <div>
//                 Name: {latestWorks.map(work => 
                    
                    
//                     <div>{work.namework} and {work.date} and {work.like}</div>)} 
//             </div>




//         </Box>







//     </div>
//   )
// }
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import { Work } from '../../share/ListofWork.js';
import { LineChart } from '@mui/x-charts/LineChart';

export default function DashboardUser() {
    const { theme } = useContext(ThemeContext);
    const [works, setWorks] = useState([]);
    const [showChart, setShowChart] = useState(false);

    const sortWorksByDate = () => {
        const sortedWork = Work.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorks(sortedWork.slice(0, 10));
        setShowChart(true);
    };

    const sortWorksByLikes = () => {
        const sortedWork = Work.sort((a, b) => b.like - a.like);
        setWorks(sortedWork.slice(0, 10));
        setShowChart(true);
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
                <div className='chart'>
                    {showChart && (
                        <LineChart
                            xAxis={[{ data: works.map((work, index) => index + 1) }]}
                            series={[{ data: works.map(work => work.like) }]}
                            width={700}
                            height={450}
                        />
                    )}
                </div>
                <button onClick={sortWorksByDate}>Top 10 mới nhất</button>
                <button onClick={sortWorksByLikes}>Top 10 like nhiều nhất</button>

                <div>
                    {works.map(work => 
                        <div>Name: {work.namework}, Date: {work.date}, Likes: {work.like}</div>
                    )}
                </div>
            </Box>
        </div>
    );
}
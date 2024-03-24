
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
import { GetArtsNoImageByCreatorId } from '../../API/ArtworkAPI/GET.tsx';
import { Artwork } from '../../Interfaces/ArtworkInterfaces';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { GetTotalLikeByCreatorID } from '../../API/UserAPI/GET.tsx';
import { GetCommissionRecieverById, GetCommissionRequestorById } from '../../API/CommissionAPI/GET.tsx';
import { IExtraCommissionForm } from '../../Interfaces/CommissionForm.ts';
import { Divider } from '@mui/material';


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

export default function DashboardUser() {
  const { theme } = useContext(ThemeContext)
  const [artworkDatas, setArtworkDatas] = useState<Artwork[]>();
  const [totalLikes, setTotalLikes] = useState<number>();
  const [commissionSent, setCommissionSent] = useState<IExtraCommissionForm[]>([]);
  const [commissionRecieved, setCommissionRecieved] = useState<IExtraCommissionForm[]>([]);

  const savedAuth = sessionStorage.getItem('auth');
  const savedUser: Creator = savedAuth ? JSON.parse(savedAuth) : null;
  const [value, setValue] = useState(0);
  useEffect(() => {
    //const getArtworks
    const getArtworks = async () => {
      let getArtworks: Artwork[] | undefined = await GetArtsNoImageByCreatorId(savedUser.creatorID);
      setArtworkDatas(getArtworks ?? []);  //nullish coalescing operator (??) 
    }
    const getCreator = async () => {
      let totalLikes = await GetTotalLikeByCreatorID(savedUser.creatorID)
      setTotalLikes(totalLikes)
    }
    const getCommissionData = async () => {
      let sent = await GetCommissionRecieverById(savedUser.creatorID)
      setCommissionSent(sent ?? [])
      let recieved = await GetCommissionRequestorById(savedUser.creatorID)
      setCommissionRecieved(recieved ?? [])
    }
    getCreator()
    getArtworks()
    getCommissionData()
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  //Chart2- chỉnh biểu đồ
  const options = {
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
          color: '#ECECEC',
          lineWidth: 1, 
        },
        ticks: {
         
          max: 10, 
        },
      },
      y: {
        grid: {
          color: '#ECECEC', // Màu của đường lưới trục Y
          lineWidth: 1, // Độ dày của đường lưới trục Y
        },
        ticks: {
        
          max: 10, // Số lượng thanh trục Y
        },
      },
    },
  };

  //data
  // Sắp xếp danh sách tác phẩm theo thời gian từ mới nhất đến cũ nhất
  const sortedWork = artworkDatas?.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  // Lấy 10 tác phẩm mới nhất
  const latestWorks = sortedWork?.slice(0, 10);
  // lấy lượt like
  const sortedWork2 = artworkDatas?.sort((a, b) => b.likes - a.likes);
  const likeWorks = sortedWork2?.slice(0, 10);

  // thông tin x/y của 10 tp gần nhất
  const labels = artworkDatas?.map((work, index) => index + 1);



  const data = {

    labels: labels?.slice(0, 10),
    datasets: [
      {
        label: 'Number of likes',
        data: latestWorks?.map(work => work.likes),
        backgroundColor: '#01b8ef',
        boderColor: 'black',// Màu của cột chính
        boderWidth: '1'
      },

    ],
  };
  // thông tin của x/y của 10 tác phẩm nhiều like nhất

  const labels2 = likeWorks?.map((work, index) => index + 1);
  const data2 = {

    labels: labels2,
    datasets: [
      {
        label: 'Number of likes',
        data: likeWorks?.map(work => work.likes),
        backgroundColor: '#01b8ef',
        boderColor: 'black',// Màu của cột chính
        boderWidth: '1'
      },

    ],
  };


  return (
    <div className='boxdashboard'>
      <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '90%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',

        }}>
        <h1>Your Dashboard :</h1>



        <div>
          <Box sx={{ width: '100%' }}>
            <div className='headertab'>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Top 10 newest works" {...a11yProps(0)} />
                  <Tab label="Top 10 works with the most likes" {...a11yProps(1)} />

                </Tabs>
              </Box></div>

            <CustomTabPanel value={value} index={0}>
              <div className='contentdashboard' >
                <div className='chart' style={{ width: '900px' }}>
                  <Bar options={options} data={data} />
                </div>
                <div className='explication' style={{ border: '1px solid', borderColor: theme.color3, height: "auto" }}>
                  <h3> <EditNoteIcon style={{ transform: 'translateY(22%)' }} />Featured Artworks: </h3>
                  <div className='nameworks-container'>
                    {latestWorks?.map((work, index) => (
                      <div className='namework' key={index}>
                        {index + 1}: {work.artworkName}
                        {/* {work.date} */}
                      </div>
                    ))}</div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className='contentdashboard' >
                <div className='chart' style={{ width: '900px' }}>
                  <Bar options={options} data={data2} />
                </div>
                <div className='explication' style={{ border: '1px solid', borderColor: theme.color3, height: 'auto' }}>
                  <h3> <EditNoteIcon style={{ transform: 'translateY(22%)' }} />Featured Artworks: </h3>
                  <div className='nameworks-container'>
                    {likeWorks?.map((work, index) => (
                      <div className='namework' key={index}>
                        {index + 1}: {work.artworkName}
                        {/* {work.date} */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CustomTabPanel>

          </Box>
        </div>
        <Divider variant='middle' sx={{ borderColor: theme.color }} />
        < div className='contentoverview'>
          <Typography align='center' variant='h3' sx={{ marginBottom: "2%" }}>Information overview</Typography>
          <div className='overview' style={{display:"flex",justifyContent:'space-around'}}>
            <div className='line'>
              <Typography variant='h6' className='line1'> Total commission received: {commissionRecieved.length}   </Typography>
              <Typography variant='h6' className='line1'>Total commission sent :  {commissionSent.length}    </Typography>
              <Typography variant='h6' className='line1'>Your post number: {artworkDatas?.length}  </Typography>
            </div>
            <div className='line'>
              
              <Typography variant='h6' className='line1'>Total number of likes: {totalLikes ?? 0} </Typography>
              <Typography variant='h6' className='line1'>Number of works sold: TOBEADDED </Typography>
              <Typography variant='h6' className='line1'>Number of works bought: TOBEADDED </Typography>
            </div>
          </div>

        </div>
      </Box>
    </div>
  );
}




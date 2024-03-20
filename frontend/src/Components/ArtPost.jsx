import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { Work } from '../share/ListofWork';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TestIcon from './TestIcon';
import Comments from './Comments';
import Box from '@mui/material/Box';
import { ListTag } from '../share/ListofTag.js';
import { ThemeContext } from './Themes/ThemeProvider.tsx';
import Chip from '@mui/material/Chip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function PostWork() {
  const colors = ["#82c87e", "#c07ec8", "#c89c7e", "#7E8DC8", "#C07EC8","#C87E8A"];
  const {theme} = useContext(ThemeContext)
  const { id } = useParams();
  const selectedWork = Work.find(work => work.id === parseInt(id));
  if (!selectedWork) {
    return <div>Error</div>;
  }
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  console.log(selectedWork)
  return (
    <Box sx={{paddingTop:'2%'}}>
    <div className='poswork'
      style={{backgroundColor: theme.backgroundColor , paddingBottom:'50px'}}
    >
      <div className='info-postwork'
     
      >
        <div className='imgpost'>
          <img src={selectedWork.img} />
        </div>
        <div className='contentpost'>
          <div className='infor-user-post'>
            <div className='avatar-user-post'>
              <Stack direction="row" spacing={2}>
                <Avatar src={selectedWork.avatar}
                  sx={{ width: 50, height: 50 }} />

              </Stack></div>
            <div className='name-user-post'> {selectedWork.author}</div>
          </div>
          <div className='content-post-img'>
          <h4 style={{marginBottom:'10px'}}>Name Work:</h4>
            <div>{selectedWork.namework}</div>
            <h4 style={{marginBottom:'5px',marginTop:'10px'}}>Description:</h4>
            <div>{selectedWork.description}</div>
            <h4 style={{marginBottom:'5px',marginTop:'10px'}}>Tag:</h4>
            <div className='tag-container'>
               {ListTag.map((tag, index) => (
                 <div key={tag.id} className='tag-item'>
                 <Stack direction="row" spacing={1}>
                 <Chip label={tag.nameTag} variant="outlined" onClick={handleClick} style={{ backgroundColor: colors[index % colors.length] , marginRight:'5px',marginBottom:'5px',color:'white' }} />
                </Stack>
               </div>
               ))}
</div>
          </div>
        </div>
      </div>
      <Box className="comment-section" >
        <div style={{display:'flex',justifyContent:'space-between',width:'68%'}}>
        <TestIcon />
        <div style={{margin:'auto 5px',}}>
            <Chip icon={<AttachMoneyIcon />} label= {selectedWork.price} size="large"  onClick={handleClick} style={{fontSize:'20px',padding:'20px',fontWeight:'600',backgroundColor:'#61dafb'}} />
      
          </div>
        </div>
        <div>
          <Comments />
        </div>
      </Box>
    </div>
    </Box>
  )
}

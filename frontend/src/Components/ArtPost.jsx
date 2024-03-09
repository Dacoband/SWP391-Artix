import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { Work } from '../share/ListofWork';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TestIcon from './TestIcon';
import Comments from './Comments';
import Box from '@mui/material/Box';
import { ThemeContext } from './Themes/ThemeProvider.tsx';
export default function PostWork() {
  const {theme} = useContext(ThemeContext)
  const { id } = useParams();
  const selectedWork = Work.find(work => work.id === parseInt(id));
  if (!selectedWork) {
    return <div>Error</div>;
  }
  console.log(selectedWork)
  return (
    <Box sx={{paddingTop:'2%'}}>
    <div className='poswork'
      style={{backgroundColor: theme.backgroundColor}}
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
            <div>Name Work:{selectedWork.namework}</div>
            <div>Description:{selectedWork.description}</div>
            <div>Tag:</div>
          </div>
        </div>
      </div>
      <Box className="comment-section">
        <TestIcon />
        <div>
          <Comments />
        </div>
      </Box>
    </div>
    </Box>
  )
}

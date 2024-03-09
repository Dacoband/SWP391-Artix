import React from 'react'
import { useParams } from 'react-router-dom';
import { Work } from '../share/ListofWork';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TestIcon from './TestIcon';
import Comments from './Comments';
export default function PostWork() {
  const { workId } = useParams();
  const selectedWork = Work.find(work => work.id === parseInt(workId));
  if (!selectedWork) {
    return <div>Error</div>;
  }
  console.log(selectedWork)


  

  return (
    <div className='poswork'>
      <div className='info-postwork'>
        <div className='imgpost'>
        <img src={selectedWork.img}/>

        </div>
        <div className='contentpost'>
          <div className='infor-user-post'>
           <div className='avatar-user-post'>
            <Stack direction="row" spacing={2}>
             <Avatar  src={selectedWork.avatar} 
             sx={{ width: 50, height: 50 }}/>
        
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
      <TestIcon/>
      <div>
        <Comments/>
      </div>
      

      <div className=''>








        
      </div>




    </div>
  )
}

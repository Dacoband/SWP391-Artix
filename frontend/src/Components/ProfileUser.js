import React from 'react'
import {Route, Routes} from 'react-router-dom';
import { ListofUsers } from '../share/ListofUsers';
import { useParams } from 'react-router-dom';
export default function ProfileUser() {
  const { userId } = useParams();
  const selectedUser = ListofUsers.find(user => user.id === parseInt(userId));

  if (!selectedUser) {
    return <div>Error</div>;
  }

  return (
    <div className=''>
      <div className='Banneruser'>
        {/* <div className='backgrounduser'>
          <img src={selectedUser.background} alt='Background'></img>
        </div> */}
        <div className='backgrounduser' style={{ backgroundImage: `url(${selectedUser.background})` }}>
          {/* No need for the <img> tag here */}
        </div>



      </div>
      
    </div>
  );
}

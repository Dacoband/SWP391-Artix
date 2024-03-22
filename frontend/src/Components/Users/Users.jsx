import React from 'react'
import { Route, Routes, Outlet } from "react-router-dom"
// eslint-disable-next-line
import HomePage from './MainPage/HomePage.tsx';
// eslint-disable-next-line 
import Page from './Page.jsx';
import Footer from './Footer.jsx';
import Menu from './Menu.tsx';
import Background from '../Themes/Background.jsx';
import UserInfoForm from './UserForms/CreateUserInfo.jsx';
import UploadArtwork from './UserForms/UploadArtwork.tsx';
import ProfileUser from './ProfileUser.tsx';
import ArtPost from '../ArtPost.tsx';
import SeeMoreOfArt1 from './SeeMoreOfArt1.tsx';
import SeeMoreUser from './SeeMoreUser.tsx';
// eslint-disable-next-line 
import SeeMoreForYou from './SeeMoreForYou.tsx';
import DashboardUser from './DashboardUser.jsx';
import CommissionForm from './CommissionForm.jsx';
import YourCommission from './YourCommission.jsx';
import YourRequest from './YourRequest.jsx';
export default function Users() {
  return (
    <div>
      <Menu />
      <Background>
      {/* <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}> */}
        <Routes>
          <Route path={`/`} element={<HomePage/>} />
          <Route path={`creatorform`} element={<UserInfoForm/>}/>
          <Route path={`artworkform`} element={<UploadArtwork/>}/>
          <Route path={`profile/:id`} element={<ProfileUser />}/>
          
          <Route path={`profile/:id/commission`} element={<CommissionForm/>}/>
          
          <Route path={`artwork/:id`} element={<ArtPost />}/>

          <Route path={`artwordrecomment`} element={<SeeMoreOfArt1/>}/>
          <Route path={`userrecomment`} element={<SeeMoreUser/>}/>
          <Route path={`randomword`} element={<SeeMoreOfArt1/>}/>
          <Route path={`dashboarduser`} element={<DashboardUser/>}/>
          <Route path={`yourcommision`} element={<YourCommission/>}/>
          <Route path={`yourrequest`} element={<YourRequest/>}/>
        </Routes>
        <Outlet />
        {/* Outlet is use to render child components */}
      {/* </div> */}
      <Footer/>
      </Background>
    </div>
  )
}

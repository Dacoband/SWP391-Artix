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
import DashboardUser from './DashboardUser.tsx';
import CommissionForm from './CommissionForm.tsx';
import YourCommission from './YourCommission.tsx';
import YourRequest from './YourRequest.tsx';
import TransactionHistory from './TransactionHistory.jsx';
import Payment from './Payment.jsx';
import ProtectedRoute from '../../ProtectedRoutes/ProtectedRoute.tsx';
export default function Users() {
  return (
    <div>
      <Menu />
      <Background>
        {/* <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}> */}
        <Routes>
          <Route path={`/`} element={<HomePage />} />
          <Route path={`creatorform`} element={<UserInfoForm />} />
          <Route path={`profile/:id`} element={<ProfileUser />} />

          <Route path={`artwork/:id`} element={<ArtPost />} />
          <Route element={<ProtectedRoute allowedRoles={['AT','AD']} />}>
            <Route path={`artwork/:id/payment`} element={<Payment />} />
            <Route path={`yourcommision`} element={<YourCommission />} />
            <Route path={`yourrequest`} element={<YourRequest />} />
            <Route path={`transaction`} element={<TransactionHistory />} />
            <Route path={`artworkform`} element={<UploadArtwork />} />
            <Route path={`profile/:id/commission`} element={<CommissionForm />} />
            <Route path={`dashboarduser`} element={<DashboardUser />} />
          </Route>
          <Route path={`artwordrecomment`} element={<SeeMoreOfArt1 />} />
          <Route path={`userrecomment`} element={<SeeMoreUser />} />
          <Route path={`randomword`} element={<SeeMoreForYou/>} />
          <Route path={`artwordrecomment/artwork/:id`} element={<ArtPost />} />
          <Route path={`randomword/artwork/:id`} element={<ArtPost />} />
          



          {/* <Route path={`payment`} element={<Payment/>}/> */}

        </Routes>
        <Outlet />
        {/* Outlet is use to render child components */}
        {/* </div> */}
        <Footer />
      </Background>
    </div>
  )
}

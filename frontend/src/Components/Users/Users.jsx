import React from 'react'
import { Route, Routes, Outlet } from "react-router-dom"
// eslint-disable-next-line
import HomePage from './MainPage/HomePage.tsx';
// eslint-disable-next-line 
import Page from './Page.jsx';
import Footer from './Footer.jsx';
import Menu from './Menu.jsx';
import CreatePeople from './UserForms/CreatePeople.jsx';
import Background from '../Themes/Background.jsx';
import UserInfoForm from './UserForms/CreateUserInfo.jsx';
import UploadArtwork from './UserForms/UploadArtwork.jsx';
import ProfileUser from './ProfileUser.jsx';
import ArtPost from '../ArtPost.jsx';

export default function Users() {
  return (
    <div>
      <Menu />
      <Background>
      {/* <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}> */}
        <Routes>
          <Route path={`/`} element={<HomePage/>} />
          <Route path={`create`} element={<CreatePeople />} />
          <Route path={`creatorform`} element={<UserInfoForm/>}/>
          <Route path={`artworkform`} element={<UploadArtwork/>}/>
          <Route path={`profile/:id`} element={<ProfileUser />}/>
          <Route path={`artwork/:id`} element={<ArtPost />}/>
        </Routes>
        <Outlet />
        {/* Outlet is use to render child components */}
      {/* </div> */}
      <Footer/>
      </Background>
    </div>
  )
}

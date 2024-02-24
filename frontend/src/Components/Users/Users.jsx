import React from 'react'
import { Route, Routes, Outlet } from "react-router-dom"
import Page from './Page.jsx';
import Footer from './Footer.jsx';
import PeopleDetail from './PeopleDetail.jsx';
import UpdatePeople from './UpdatePeople.jsx';
import Menu from './Menu.jsx';
import CreatePeople from './CreatePeople.jsx';
import Background from '../Themes/Background.jsx';


export default function Users() {
  return (
    <div>
      <Menu />
      <Background>
      {/* <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}> */}
        <Routes>
          <Route path={`/`} element={<Page />} />
          <Route path={`:id`} element={<PeopleDetail />} />
          <Route path={`:id/edit`} element={<UpdatePeople />} />
          <Route path={`create`} element={<CreatePeople />} />
        </Routes>
        <Outlet />
        {/* Outlet is use to render child components */}
      {/* </div> */}
      </Background>
      <Footer />
    </div>
  )
}

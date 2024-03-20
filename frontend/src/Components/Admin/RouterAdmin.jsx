import React from 'react'
import { Route, Routes, Outlet } from "react-router-dom";
import Admin from './Admin';
import AdminNavbar from './NavigationAd'
import ListUser from './ListUser'
import Report from'./Report'
export default function RouterAdmin() {
  return (
    <div>
        <AdminNavbar/>
        <Routes>
          <Route path={`/`} element={<Admin/>} />
          <Route path={`listuser`} element={<ListUser />} />
          <Route path={`report`} element={<Report/>}/>
          </Routes>
          <Outlet />





    </div>
  )
}

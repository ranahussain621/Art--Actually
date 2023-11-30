import React from 'react'
import UserDashboard from "../../Components/DashbaordSidebar"
import SidebarAdmin from '../../Dashboard/Sidebar/SidebarAdmin'
import TopNavbar from '../../Components/TopNavbar/TopNavbar';

import { Route,Routes } from 'react-router-dom';


export const Dashboard = () => {
  return (
<> 





  <Routes>
  <Route path="/user-dashboard/*" element={<TopNavbar />} />
  </Routes>
  <Routes>
  <Route path="/user-dashboard/*" element={<UserDashboard />} />
  </Routes>

    <Routes>
    <Route path='/admin-dashboard/*' element={<SidebarAdmin />} /> 
    </Routes>


</>
  )
}

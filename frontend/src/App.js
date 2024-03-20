
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './Components/FrontPage.jsx';
import Admin from './Components/Admin/Admin.jsx'
import Mod from './Components/Mods/Mod.jsx';
import Users from './Components/Users/Users.jsx';
import CreateAccount from './Components/Forms/CreateAccount.jsx';
import Unauthorized from './ProtectedRoutes/Unauthorized.jsx';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute.tsx';
function App() {
  const role = sessionStorage.getItem('userRole')
  console.log(role)
  return (
    <div className='App'>
        {/* <Menu />
        <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}>
        <Routes>
          <Route path='/' element={<Page />}> </Route>
          <Route path='/Details/:id' element={<PeopleDetail />}></Route>
          <Route path='/Update/:id' element={<UpdatePeople />}></Route>
          <Route path='/Create' element={<CreatePeople />}></Route>
        </Routes>
        </div>
        <Footer /> 
        These are later use :>
        */}
        <Routes>
          <Route path='/' element={<FrontPage/>}/>
          <Route path='/unauthorized' element={<Unauthorized/>}/>
          <Route element={<ProtectedRoute allowedRoles={['AD']}/>}>
            <Route path="/admin" element={<Admin/>}></Route>
          </Route>
          <Route path="/mod" element={<Mod/>}></Route>
          <Route path="/createaccount" element={<CreateAccount/>}/>
          <Route path="/characters/*" element={<Users/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
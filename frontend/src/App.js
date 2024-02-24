
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './Components/FrontPage.jsx';
import Admin from './Components/Admin/Admin.jsx'
import Mod from './Components/Mods/Mod.jsx';
import Users from './Components/Users/Users.jsx';
function App() {
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
          <Route path="/admin" element={<Admin/>}>

            </Route>
          <Route path="/mod" element={<Mod/>}>

            </Route>
          <Route path="/characters/*" element={<Users/>}>

          </Route>
        </Routes>
    </div>
  );
}

export default App;

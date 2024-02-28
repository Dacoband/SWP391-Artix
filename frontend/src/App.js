
import './App.css';
import { Route, Routes } from 'react-router-dom';

import ProfileUser from './Components/ProfileUser';
import TestIcon from './Components/TestIcon';
import TestIcon2 from './Components/TestIcon2';
import HomePage from './Components/HomePage';
function App() {
  return (
    <div className="App">
     
      
     {/* <TestIcon/> */}
     {/* <TestIcon2/> */}
      {/* <HomePage/> */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
      </Routes>
   
      

    </div>
  );
}

export default App;
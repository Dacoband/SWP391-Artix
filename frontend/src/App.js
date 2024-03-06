
import './App.css';
import { Route, Routes } from 'react-router-dom';

import ProfileUser from './Components/ProfileUser';
import TestIcon from './Components/TestIcon';
import PostWork from './Components/PostWork';
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
        <Route path="/post/:workId" element={<PostWork/>}/>
      </Routes>
   
      

    </div>
  );
}

export default App;
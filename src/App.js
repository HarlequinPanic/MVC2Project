import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { fetchFighters } from './utils/utils';
import Home from './routes/Home';
import UserList from './routes/UserList';
import Navbar from './components/Navbar';
import RegisterTourney from './routes/RegisterTourney';

function App() {
  const [fighters, setFighters] = useState([])

  useEffect(() =>{
    fetchFighters()
      .then(data => {setFighters(data)})
  }, [])

  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home fighters={fighters}/>}/>
        <Route path={"/userlist"} element={<UserList />}/>
        <Route path={"/registertourney"} element={<RegisterTourney fighters={fighters}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

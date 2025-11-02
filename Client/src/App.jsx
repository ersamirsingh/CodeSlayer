import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import How from './components/How';
import Landing from './pages/Landing';
import Home from './pages/Home';
import { checkAuth } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import About from './components/About';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import EmployerPlatform from './pages/EmployerPlatform';
import Profile from './pages/Profile';
import ContactPage from './components/ContactPage';
import Applications from './components/Applications';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state=>state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
       
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
        ></Route>
        <Route
          path="/home"
          element={isAuthenticated ? <Home/> : <Signup />}
        ></Route>

        <Route
          path="/how"
          element={<How/>}
        ></Route>
        <Route
          path="/about"
          element={<About/>}
        ></Route>
        <Route
          path="/jobs"
          element={<Jobs/>}
        ></Route>
        <Route
          path="/jobsdetails"
          element={<JobDetails/>}
        ></Route>
        <Route
          path="/employplatform"
          element={<EmployerPlatform/>}
        ></Route>
         <Route
          path="/contactpage"
          element={<ContactPage/>}
        ></Route>
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile/> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/aplication"
          element={isAuthenticated ? <Applications/> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App

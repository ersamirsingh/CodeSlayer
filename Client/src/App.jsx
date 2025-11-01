import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeheader from './components/HomeHeader';
import How from './components/How';
import Home from './pages/Home';
import { checkAuth } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import About from './components/About';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state=>state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        ></Route> */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/login" /> : <Signup />}
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
      </Routes>
    </Router>
  );
}

export default App

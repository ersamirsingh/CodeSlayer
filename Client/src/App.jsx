import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeheader from './components/HomeHeader';
import How from './components/How';
import Home from './pages/Home';
import { checkAuth } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/login" /> : <Signup />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App

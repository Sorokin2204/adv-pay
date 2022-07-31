import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import DrawerAppBar from './components/MainLayout';
import TrancTable from './components/TrancTable';
import { Typography } from '@mui/material';
import HomePage from './pages/Home';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/slices/user.slice';
import { useEffect } from 'react';
import Loading from './components/Loading';
import SucessPage from './pages/Success';
import ErrorPage from './pages/Error';
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getUserState: { loading, data, error },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (!data && !loading && error) {
      navigate('/auth');
    }
  }, [data, loading, error]);

  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/auth', element: <AuthPage /> },
  ]);
  console.log(location);
  return !loading && (data || error) && routes;
}

export default App;

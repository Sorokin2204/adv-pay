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
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import DonatePage from './pages/DonatePage';
import RulesPage from './pages/RulesPage';
import SupportPage from './pages/SupportPage';
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
    if (!data && !loading && error && location.pathname.substring(0, 5) !== '/auth') {
      navigate('/');
    }
  }, [data, loading, error]);

  let routes = useRoutes([
    { path: '/account', element: <HomePage /> },
    { path: '/', element: <MainPage /> },
    { path: '/auth', element: <AuthPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/donate', element: <DonatePage /> },
    { path: '/rules', element: <RulesPage /> },
    { path: '/support', element: <SupportPage /> },
  ]);
  console.log(location);
  return !loading && (data || error) && routes;
}

export default App;

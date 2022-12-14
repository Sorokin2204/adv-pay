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
import GamePage from './pages/GamePage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FaqPage from './pages/FaqPage';
import ReviewsPage from './pages/ReviewsPage';
import GuarantePage from './pages/GuarantePage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ProfilePage from './pages/ProfilePage';
import { gapi } from 'gapi-script';
import { useState } from 'react';
import axios from 'axios';
import WorkOnSite from './components/WorkOnSite';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getUserState: { loading, data, error },
  } = useSelector((state) => state.user);
  const [settingsData, setSettingsData] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_AUTH_API_KEY,
      });
    }
    gapi.load('client:auth2', start);
    dispatch(getUser());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/settings`)
      .then((resp) => {
        setSettingsData({ loading: false, data: resp.data, error: null });
      })
      .catch(() => {
        setSettingsData({ loading: false, data: null, error: true });
      });
  }, []);
  console.log(settingsData);
  useEffect(() => {
    const staticPageRule =
      location.pathname.substring(0, 5) !== '/auth' &&
      location.pathname !== '/about' &&
      location.pathname !== '/donate' &&
      location.pathname !== '/rules' &&
      location.pathname !== '/support' &&
      location.pathname !== '/faq' &&
      location.pathname !== '/reviews' &&
      location.pathname !== '/guarante' &&
      location.pathname !== '/return-policy';
    if (!data && !loading && error && staticPageRule) {
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
    { path: '/game/:id', element: <GamePage /> },
    { path: '/terms-of-use', element: <TermsOfUsePage /> },
    { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
    { path: '/faq', element: <FaqPage /> },
    { path: '/reviews', element: <ReviewsPage /> },
    { path: '/guarante', element: <GuarantePage /> },
    { path: '/return-policy', element: <ReturnPolicyPage /> },
    { path: '/profile', element: <ProfilePage /> },
  ]);
  return !settingsData.loading ? settingsData?.data?.[1]?.activeWarning == true ? <WorkOnSite /> : !loading && (data || error) && routes : <></>;
}

export default App;

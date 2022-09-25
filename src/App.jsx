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
    { path: '/game/:id', element: <GamePage /> },
    { path: '/terms-of-use', element: <TermsOfUsePage /> },
    { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
    { path: '/faq', element: <FaqPage /> },
    { path: '/reviews', element: <ReviewsPage /> },
    { path: '/guarante', element: <GuarantePage /> },
    { path: '/return-policy', element: <ReturnPolicyPage /> },
  ]);
  return !loading && (data || error) && routes;
}

export default App;

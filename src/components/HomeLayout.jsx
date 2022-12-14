import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ExitIcon from '@mui/icons-material/ExitToApp';
import AccountIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { purple, grey } from '@mui/material/colors';
import { shadows } from '@mui/system';
import { Container, Fab, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCardIcon from '@mui/icons-material/AddCard';
import BuyModal from './BuyModal';
import SuccessModal from './SuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/slices/user.slice';
import { currencyFormat } from '../utils/currencyFormat';
import PaymentModal from './PaymentModal';
import ErrorModal from './ErrorModa';
import Loading from './Loading';
import { createTransactionReset } from '../redux/slices/transaction.slice';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ResetPassModal from './ResetPassModal';
import GameButton from './GameButton';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function HomeLayout(props) {
  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  const {
    getUserState: { loading, data, error },
  } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [settingsData, setSettingsData] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/settings`).then((resp) => {
      setSettingsData(resp.data);
    });
  }, []);

  useEffect(() => {
    if (settingsData) {
      if (settingsData?.[0]?.activeWarning) {
        const warningDate = localStorage.getItem('warningTime');
        const warningDateMoment = moment(warningDate);
        if (warningDateMoment.isValid()) {
          if (moment().isAfter(warningDateMoment)) {
            setShowWarning(true);
          }
        } else {
          setShowWarning(true);
        }
      }
    }
  }, [settingsData]);

  return (
    <Paper sx={{ height: '100%' }}>
      {showWarning && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#555', padding: '30px', width: '100vw', zIndex: '1000000', color: 'white', textAlign: 'center', boxSizing: 'border-box' }}>
          <Box sx={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center', lineHeight: '24px' }}>{settingsData?.[0]?.textWarning}</Box>
          <IconButton
            onClick={() => {
              setShowWarning(false);
              localStorage.setItem('warningTime', moment().add(3, 'hours').toDate());
            }}
            disableRipple
            sx={{ position: 'fixed', right: '10px', top: '5px' }}>
            <Close />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0 !important',
          },
        }}>
        <AppBar
          component="nav"
          sx={{
            boxShadow: 0,
            backgroundColor: '#060606',
          }}>
          <Toolbar variant="dense">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                <Box sx={{ display: { mobile: 'none', xs: 'block' } }}>
                  <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    <MenuIcon sx={{ fontSize: '30px' }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={() => navigate('/about')}>?? ??????????????</MenuItem>
                    <MenuItem onClick={() => navigate('/donate')}>????????????????????</MenuItem>
                    <MenuItem onClick={() => navigate('/faq')}>FAQ</MenuItem>
                    <MenuItem onClick={() => navigate('/reviews')}>????????????</MenuItem>
                    <MenuItem onClick={() => navigate('/guarante')}>????????????????</MenuItem>
                    <MenuItem onClick={() => navigate('/support')}>??????????????????</MenuItem>
                  </Menu>
                </Box>
                <Box sx={{ display: { mobile: 'block', xs: ' none' } }}>
                  <Link to="/">
                    <img src="/logo.png" style={{ height: '60px', width: '101px', objectFit: 'cover', display: 'block' }} />
                  </Link>
                </Box>
              </Box>
              <Box sx={{ display: { mobile: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', mr: 1 }}>
                <Button disableRipple={true} onClick={() => navigate('/about')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                  ?? ??????????????
                </Button>{' '}
                <Button disableRipple={true} onClick={() => navigate('/donate')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                  ????????????????????
                </Button>{' '}
                <Button disableRipple={true} onClick={() => navigate('/faq')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block', minWidth: 0 }}>
                  FAQ
                </Button>
                <Button disableRipple={true} onClick={() => navigate('/reviews')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                  ????????????
                </Button>{' '}
                <Button disableRipple={true} onClick={() => navigate('/guarante')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                  ????????????????
                </Button>
                <Button disableRipple={true} onClick={() => navigate('/support')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                  ??????????????????
                </Button>
              </Box>
              <Box>
                {!data && !loading && error ? (
                  <Button class="login-custom" disableRipple={true} onClick={() => navigate('/auth')} sx={{ '&:hover': { backgroundColor: 'transparent', transform: 'scale(0.78)' }, my: 2, color: 'white', display: 'block' }} variant="outlined">
                    <div></div>
                    <span> ??????????</span>
                  </Button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GameButton
                      onClick={() => {
                        navigate('/account');
                      }}
                    />
                    <Button
                      style={{ height: '30px', lineHeight: '2', textTransform: 'none', background: '#000000a3', color: ' rgb(255 255 255)', height: '30px', lineHeight: '2', textTransform: 'none', border: '1px solid rgb(255 255 255 / 50%)' }}
                      variant="outlined"
                      onClick={() => navigate('/profile')}>
                      ??????????????
                    </Button>
                  </div>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            width: '100%',
            paddingTop: '68px',
          }}>
          <Container style={{ ...(props.isFullContainer && { maxWidth: 'none' }) }}>
            <div className="">
              {props.children}
              {/* <Fab
                onClick={handleClickOpen}
                color="warning"
                aria-label="add"
                sx={{
                  position: 'fixed',
                  right: '20px',
                  bottom: '20px',
                }}>
                <AddIcon />
              </Fab> */}
            </div>
          </Container>
        </Box>
        {/* <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 100000000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
          }}>
          ???? ?????????? ?????????????? ?????????????????????? ????????????. ?????????? ???????? ????????????????????
        </Box> */}
        <Footer />
      </Box>
    </Paper>
  );
}

export default HomeLayout;

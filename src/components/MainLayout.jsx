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
import { Container, Fab, Menu, MenuItem, Paper } from '@mui/material';
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
import { createTransactionReset, getTransactions } from '../redux/slices/transaction.slice';
import Footer from './Footer';
import { getPackage } from '../redux/slices/package.slice';
import { getPayments } from '../redux/slices/payment.slice';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window, isFull } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [mobileOpenSucc, setMobileOpenSucc] = React.useState(false);
  const [openSucc, setOpenSucc] = React.useState(false);
  const [openPay, setOpenPay] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorText, setErrorText] = React.useState(false);
  const dispatch = useDispatch();
  const {
    getUserState: { loading, data, error },
  } = useSelector((state) => state.user);
  const {
    getCreditCardState: { error: errorCreditCard },
  } = useSelector((state) => state.creditCard);
  const {
    getPackageState: { error: errorGetPackage },
  } = useSelector((state) => state.package);
  const {
    createTransactionState: { error: errorCreateTransaction },
    getTransactionsState: { error: errorGetTransactions },
  } = useSelector((state) => state.transaction);
  const {
    getPaymentsState: { error: errorgetPayments },
  } = useSelector((state) => state.payment);
  React.useEffect(() => {
    if (!loading && data && !error) {
      dispatch(getPackage());
      dispatch(getTransactions());
      dispatch(getPayments());
    }
  }, []);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (errorCreditCard?.error === 'PROBLEM_WITH_TOKEN' || errorGetPackage?.error === 'PROBLEM_WITH_TOKEN' || errorCreateTransaction?.error === 'PROBLEM_WITH_TOKEN' || errorGetTransactions?.error === 'PROBLEM_WITH_TOKEN' || errorgetPayments?.error === 'PROBLEM_WITH_TOKEN') {
      dispatch(getUser());
    }
  }, [errorCreditCard, errorGetPackage, errorCreateTransaction, errorGetTransactions]);
  const dispath = useDispatch();

  const {
    createTransactionState: { error: transError, loading: transLoading, data: transData },
  } = useSelector((state) => state.transaction);

  const {
    getUserState: { data: user },
  } = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleClickOpenSucc = () => {
    setOpenSucc(true);
  };

  const handleCloseSucc = (value) => {
    setOpenSucc(false);
    dispath(getUser());
  };
  const handleClickOpenPay = () => {
    setOpenPay(true);
  };

  const handleClosePay = (value) => {
    setOpenPay(false);
  };
  const handleCloseError = (value) => {
    setOpenError(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (transData) {
      setOpenSucc(true);
      dispath(createTransactionReset());
    }
  }, [transData]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const openMenu = Boolean(anchorEl);
  React.useEffect(() => {
    if (transError) {
      const err =
        transError?.error === 'PACKAGE_NOT_ACTIVE' ? (
          <div>
            Данный пакет не доступен. <br />
            Попробуйте выбрать другой
          </div>
        ) : transError?.error === 'BALANCE_ERROR' ? (
          'Недостаточно средств'
        ) : transError?.error === 'ACCOUNT_NOT_FOUND' ? (
          <div>
            Аккаунт не найден. <br />
            Проверьте ID аккаунта перед оплатой
          </div>
        ) : (
          'Произошла непредвиденная ошибка'
        );
      setErrorText(err);
      setOpenError(true);
      dispath(createTransactionReset());
    }
  }, [transError]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return !loading && data && !error ? (
    <>
      <Paper
        sx={{
          borderRadius: 0,
          height: 'auto',
          overflow: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0 !important',
          },
        }}>
        <Box sx={{ display: 'flex', height: '70%' }}>
          <AppBar
            component="nav"
            sx={{
              boxShadow: 3,
              //   borderBottom: '1px solid grey',
              // background: '',
            }}>
            <Toolbar variant="dense">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <Box sx={{ display: { mobile: 'none', xs: 'block' } }}>
                    <Button id="basic-button" aria-controls={openMenu ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClickMenu}>
                      <MenuIcon sx={{ fontSize: '30px' }} />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}>
                      <MenuItem onClick={() => navigate('/about')}>О сервисе</MenuItem>
                      <MenuItem onClick={() => navigate('/donate')}>Инструкция</MenuItem>
                      <MenuItem onClick={() => navigate('/faq')}>FAQ</MenuItem>
                      <MenuItem onClick={() => navigate('/reviews')}>Отзывы</MenuItem>
                      <MenuItem onClick={() => navigate('/guarante')}>Гарантии</MenuItem>
                      <MenuItem onClick={() => navigate('/support')}>Поддержка</MenuItem>
                    </Menu>
                  </Box>
                  <Link to="/">
                    <img src="/logo.png" style={{ height: '60px', width: '101px', objectFit: 'cover', display: 'block' }} />
                  </Link>
                </Box>
                <Box sx={{ display: { mobile: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', mr: 1 }}>
                  <Button disableRipple={true} onClick={() => navigate('/about')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                    О сервисе
                  </Button>{' '}
                  <Button disableRipple={true} onClick={() => navigate('/donate')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                    Инструкция
                  </Button>{' '}
                  <Button disableRipple={true} onClick={() => navigate('/faq')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block', minWidth: 0 }}>
                    FAQ
                  </Button>
                  <Button disableRipple={true} onClick={() => navigate('/reviews')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                    Отзывы
                  </Button>{' '}
                  <Button disableRipple={true} onClick={() => navigate('/guarante')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                    Гарантии
                  </Button>
                  <Button disableRipple={true} onClick={() => navigate('/support')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, my: 2, color: 'white', display: 'block' }}>
                    Поддержка
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, height: '100%' }}>
                  <Button onClick={handleClickOpenPay} sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }} variant="contained" size="small">
                    Пополнить
                  </Button>
                  <IconButton onClick={handleClickOpenPay} sx={{ display: { xs: 'flex', sm: 'none' } }} aria-label="delete" size="medium">
                    <AddCardIcon fontSize="inherit" color="primary" style={{}} />
                  </IconButton>
                  <Typography sx={{ whiteSpace: 'nowrap', display: 'block', fontWeight: '600', mr: 1 }} color="success.light">
                    {currencyFormat(user.balance)}
                  </Typography>
                  <Typography color="primary" sx={{ display: 'block' }}>
                    {user.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate('/account');
                    }}
                    sx={{ mr: 1, ml: 1 }}>
                    Игры
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate('/profile');
                    }}>
                    Кабинет
                  </Button>
                  {/* <IconButton
                    onClick={() => {
                      navigate('/account');
                    }}
                    aria-label="delete"
                    size="medium">
                    <AccountIcon fontSize="inherit" color="primary" style={{}} />
                  </IconButton>
                  <IconButton onClick={() => onExit()} aria-label="delete" color="error" size="medium">
                    <ExitIcon fontSize="inherit" />
                  </IconButton>{' '} */}
                </Box>
              </Box>

              <div variant="h6" component="div" style={{ flexGrow: 1 }}></div>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}>
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              width: '100%',
              paddingTop: '48px',
              height: '100%',
            }}>
            <div sx={{ height: '100%', ...(isFull && { maxWidth: 'none', padding: 0 }) }}>
              <div className="" style={{ display: 'grid', gridTemplateRows: '1fr auto', height: 'calc(100vh - 65px' }}>
                <Container style={{ ...(isFull && { maxWidth: 'none', padding: 0 }) }}> {props.children}</Container>
                <Footer />
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
            </div>
            <BuyModal open={open} onClose={handleClose} />
            {transLoading && <Loading />}
            <ErrorModal open={openError} text={errorText} onClose={handleCloseError} />
            <SuccessModal open={openSucc} onClose={handleCloseSucc} />
            <PaymentModal open={openPay} onClose={handleClosePay} />
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
              fontSize: '24px',
              textAlign: 'center',
            }}>
            На сайте ведутся технические работы. Скоро сайт заработает
          </Box> */}
        </Box>{' '}
      </Paper>
    </>
  ) : (
    <Navigate to="/auth" />
  );
}

export default DrawerAppBar;

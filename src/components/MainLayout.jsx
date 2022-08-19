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
import Footer from './Footer';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mobileOpenSucc, setMobileOpenSucc] = React.useState(false);
  const [openSucc, setOpenSucc] = React.useState(false);
  const [openPay, setOpenPay] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorText, setErrorText] = React.useState(false);

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

  const onExit = () => {
    localStorage.removeItem('token');
    dispath(getUser());
  };

  React.useEffect(() => {
    if (transData) {
      setOpenSucc(true);
      dispath(createTransactionReset());
    }
  }, [transData]);

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

  return (
    <Paper
      sx={{
        height: '100%',
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
            {/* <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
            <div variant="h6" component="div" style={{ flexGrow: 1 }}></div>
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
              <IconButton aria-label="delete" size="medium">
                <AccountIcon fontSize="inherit" color="primary" style={{}} />
              </IconButton>
              <IconButton onClick={() => onExit()} aria-label="delete" color="error" size="medium">
                <ExitIcon fontSize="inherit" />
              </IconButton>{' '}
            </Box>
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
          <Container sx={{ height: '100%' }}>
            <div className="">
              {props.children}
              <Fab
                onClick={handleClickOpen}
                color="warning"
                aria-label="add"
                sx={{
                  position: 'fixed',
                  right: '20px',
                  bottom: '20px',
                }}>
                <AddIcon />
              </Fab>
            </div>
          </Container>
          <BuyModal open={open} onClose={handleClose} />
          {transLoading && <Loading />}
          <ErrorModal open={openError} text={errorText} onClose={handleCloseError} />
          <SuccessModal open={openSucc} onClose={handleCloseSucc} />
          <PaymentModal open={openPay} onClose={handleClosePay} />
        </Box>
      </Box>{' '}
      <Footer />
    </Paper>
  );
}

export default DrawerAppBar;

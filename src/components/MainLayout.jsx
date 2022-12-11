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
import { Badge, Container, Fab, Menu, MenuItem, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCardIcon from '@mui/icons-material/AddCard';
import BuyModal from './BuyModal';
import SuccessModal from './SuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setCart, setUpdateCartEmpty } from '../redux/slices/user.slice';
import { currencyFormat } from '../utils/currencyFormat';
import PaymentModal from './PaymentModal';
import CloseIcon from '@mui/icons-material/Close';
import ErrorModal from './ErrorModa';
import Loading from './Loading';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTransactionReset, getTransactions } from '../redux/slices/transaction.slice';
import Footer from './Footer';
import { getPackage } from '../redux/slices/package.slice';
import { getPayments } from '../redux/slices/payment.slice';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PaymentCardModal from './PaymentCardModal';
import GameButton from './GameButton';
import BonusMenu from './BonusMenu';
import axios from 'axios';
import moment from 'moment';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window, isFull } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [mobileOpenSucc, setMobileOpenSucc] = React.useState(false);
  const [openSucc, setOpenSucc] = React.useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorText, setErrorText] = React.useState(false);
  const handleClosePaymentCardModal = () => {
    setOpenPaymentModal(false);
  };
  const dispatch = useDispatch();
  const {
    getUserState: { loading, data, error },
    cart,
    updateCartEmpty,
    getBonusState: { loading: loadingBonus, data: dataBonus, error: dataError },
  } = useSelector((state) => state.user);
  const {
    getCreditCardState: { error: errorCreditCard },
  } = useSelector((state) => state.creditCard);
  const {
    getPackageState: { data: dataPackages, error: errorGetPackage },
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
  useEffect(() => {
    console.log(window);
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    const cartData = [];
    console.log('LOCAL', cartLocal);
    if (dataPackages && cartLocal instanceof Array) {
      cartLocal?.map((cartItem) => {
        const findPackage = dataPackages?.find((packageItem) => packageItem?.id === cartItem?.packageId);
        if (findPackage && parseInt(cartItem?.count) > 0) {
          cartData?.push({
            packageId: findPackage?.id,
            price: findPackage?.price,
            count: cartItem?.count,
            name: findPackage?.name,
          });
        }
      });
      dispatch(setCart(cartData));
    } else {
      setOpenPaymentModal(false);
      dispatch(setCart([]));
    }
  }, [dataPackages, updateCartEmpty]);

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
    addedCart,
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
  const [settingsData, setSettingsData] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/settings`).then((resp) => {
      setSettingsData(resp.data);
    });
  }, []);

  useEffect(() => {
    if (settingsData) {
      const warningDate = moment(localStorage.getItem('warningTime'));
      if (settingsData?.[0]?.activeWarning && warningDate.isValid()) {
        if (moment().isAfter(warningDate)) {
          setShowWarning(true);
        }
      }
    }
  }, [settingsData]);
  React.useEffect(() => {
    if (transError) {
      const err =
        transError?.error === 'PACKAGE_NOT_ACTIVE' ? (
          <div>
            Данный пакет временно недоступен, напишите нам во <a href="https://vk.com/im?sel=-213480825">вконтакте</a> или в <a href="https://t.me/DonateGold">телеграм</a> и мы отправим вам печати, списав деньги с вашего личного счета сайта. Приносим извинения за временное неудобство.
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
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => {
    setShowCart(false);
  };
  const handleOpenCart = () => {
    setShowCart(true);
  };

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
          <AppBar component="nav" sx={{ boxShadow: 0, backgroundColor: '#060606' }}>
            <Toolbar variant="dense" sx={{ minHeight: '60px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <Box sx={{ display: { mobile: 'none', xs: 'block' } }}>
                    <Button id="basic-button" aria-controls={openMenu ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClickMenu} sx={{ px: '0', minWidth: '30px' }}>
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
                      <MenuItem onClick={() => navigate('/')}>Главная</MenuItem>
                      <MenuItem onClick={() => navigate('/about')}>О сервисе</MenuItem>
                      <MenuItem onClick={() => navigate('/donate')}>Инструкция</MenuItem>
                      <MenuItem onClick={() => navigate('/faq')}>FAQ</MenuItem>
                      <MenuItem onClick={() => navigate('/reviews')}>Отзывы</MenuItem>
                      <MenuItem onClick={() => navigate('/guarante')}>Гарантии</MenuItem>
                      <MenuItem onClick={() => navigate('/support')}>Поддержка</MenuItem>
                    </Menu>
                  </Box>
                  <Box sx={{ display: { xs: 'none', mob: 'block' } }}>
                    <Link to="/">
                      <img src="/logo.png" style={{ height: '60px', width: '101px', objectFit: 'cover', display: 'block' }} />
                    </Link>
                  </Box>
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
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <Typography sx={{ whiteSpace: 'nowrap', display: 'block', marginRight: '20px!important', fontWeight: '400!important', mr: 1 }} color="success.light">
                    {currencyFormat(user.balance)}
                  </Typography>
                  <GameButton
                    onClick={() => {
                      navigate('/account');
                    }}
                  />

                  <Button
                    style={{ height: '30px', lineHeight: '2', textTransform: 'none', background: '#000000a3', color: ' rgb(255 255 255)', height: '30px', lineHeight: '2', textTransform: 'none', border: '1px solid rgb(255 255 255 / 50%)' }}
                    variant="outlined"
                    onClick={() => {
                      navigate('/profile');
                    }}>
                    Кабинет
                  </Button>
                  <div class={addedCart && 'cart-moving'}>
                    <Badge
                      onClick={handleOpenCart}
                      badgeContent={cart?.length || 0}
                      color="primary"
                      sx={{
                        cursor: 'pointer',
                        marginLeft: '16px',
                        marginRight: '4px',
                        '& .MuiBadge-badge': { color: '#e7e1d8', backgroundColor: '#9c2628', fontWeight: '600 !important' },
                        '& svg': {
                          fill: '#e9a317',
                        },
                      }}>
                      <ShoppingCartIcon sx={{ fontSize: '28px' }} />
                    </Badge>
                  </div>
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
            <Drawer
              anchor={'right'}
              open={showCart}
              onClose={handleCloseCart}
              sx={{
                '& .MuiPaper-root': { minWidth: '300px', boxSizing: 'border-box', padding: '80px 20px' },
              }}>
              <IconButton onClick={handleCloseCart} disableRipple sx={{ position: 'absolute', top: '0', right: '0', padding: '16px' }}>
                <CloseIcon />
              </IconButton>
              {cart?.length > 0 ? (
                <>
                  {cart?.map((itemCart, indexCart) => (
                    <div style={{ paddingBottom: '14px', borderBottom: '1px solid #474747', paddingTop: indexCart == 0 ? '0' : '14px' }}>
                      <div style={{ display: 'grid', alignItems: 'center', gridGap: '60px', gridTemplateColumns: 'auto auto' }}>
                        <div class="game-card__middle" style={{ marginBottom: '6px', fontSize: '14px' }}>
                          <img
                            src={`/game-icon-${dataPackages?.find((findPack) => findPack?.id === itemCart?.packageId)?.typeGameId}.png`}
                            style={{
                              objectFit: 'contain',
                              display: 'block',
                              width: '22px',
                              height: '22px',
                            }}
                          />
                          {itemCart?.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                          <TextField
                            onChange={(event) => {
                              let updateCount = parseInt(event.target.value);

                              if (updateCount < 1 || isNaN(updateCount)) {
                                updateCount = 1;
                              } else if (updateCount > 100) {
                                updateCount = 100;
                              }
                              let cartData = JSON.parse(localStorage.getItem('cart'));
                              if (cartData instanceof Array) {
                                const findDeletedItem = cartData?.find((cartDataItem) => cartDataItem.packageId === itemCart?.packageId);
                                if (findDeletedItem !== -1) {
                                  findDeletedItem.count = updateCount;
                                  localStorage.setItem('cart', JSON.stringify(cartData));
                                  dispatch(setUpdateCartEmpty());
                                }
                              }
                            }}
                            value={itemCart?.count}
                            type={'number'}
                            size="small"
                            sx={{
                              fontSize: '12px',
                              '& input': {
                                width: '40px',
                                fontSize: '12px',
                                padding: '4.5px 2px 4.5px 14px',
                              },
                              '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'auto',
                              },
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              let cartData = JSON.parse(localStorage.getItem('cart'));
                              if (cartData instanceof Array) {
                                const findDeletedItem = cartData?.findIndex((cartDataItem) => cartDataItem.packageId === itemCart?.packageId);
                                if (findDeletedItem !== -1) {
                                  cartData.splice(findDeletedItem, 1);
                                  localStorage.setItem('cart', JSON.stringify(cartData));
                                  dispatch(setUpdateCartEmpty());
                                }
                              }
                            }}
                            size="small"
                            disableRipple
                            sx={{ marginLeft: '2px' }}>
                            <CloseIcon sx={{ fontSize: '16px', opacity: '0.5' }} />
                          </IconButton>
                        </div>
                      </div>
                      <div class="game-card__price" style={{ marginTop: '4px' }}>
                        {currencyFormat(itemCart?.price * itemCart?.count)}
                      </div>
                    </div>
                  ))}

                  <Box sx={{ borderTop: '1px solid #474747', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
                    <Box sx={{ fontWeight: '600 !important', fontSize: '18px' }}>Итого к оплате</Box>
                    <Box sx={{ fontWeight: '600 !important', fontSize: '18px' }}> {currencyFormat(cart?.map((cartItem) => cartItem?.price * cartItem?.count).reduce((partialSum, a) => partialSum + a, 0))}</Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridGap: '8px', gridTemplateColumns: '1fr 1fr' }}>
                    <Button onClick={handleCloseCart} variant="contained" color="error" size="medium" sx={{ width: '100%', color: '#fff', marginTop: '24px', marginLeft: 'auto', padding: '6px 24px' }}>
                      {' '}
                      Закрыть
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenPaymentModal(true);
                      }}
                      variant="contained"
                      color="success"
                      size="medium"
                      sx={{ width: '100%', color: '#fff', marginTop: '24px', marginLeft: 'auto', padding: '6px 24px' }}>
                      {' '}
                      Оплатить
                    </Button>
                  </Box>
                  <Button
                    onClick={() => {
                      localStorage.removeItem('cart');
                      dispatch(setUpdateCartEmpty());
                    }}
                    color="error"
                    sx={{ '&:hover': { backgroundColor: 'transparent' }, marginTop: '16px', textTransform: 'none' }}>
                    Очистить корзину
                  </Button>
                  <Box sx={{ maxWidth: '260px', fontSize: '14px', textAlign: 'left', backgroundColor: 'rgb(8 3 3)', padding: '16px', borderRadius: '8px' }}>
                    После оплаты деньги поступят на ваш лицевой счет сайта. Далее не забудьте задонатить игровую валюту в игру, кнопка "Задонатить" под вводом ID. Деньги спишутся с вашего лицевого счета.
                  </Box>
                </>
              ) : (
                <div style={{ margin: '0 auto' }}>Корзина пуста</div>
              )}
            </Drawer>
            {/* <Badge
              onClick={handleOpenCart}
              badgeContent={cart?.length || 0}
              color="primary"
              sx={{
                cursor: 'pointer',
                position: 'fixed',
                top: '82px',
                right: '18px',
                '& .MuiBadge-badge': { color: '#e2ba7e', backgroundColor: '#9c2628', fontWeight: '600 !important' },
                '& svg': {
                  fill: '#e2ba7e',
                },
              }}>
              <ShoppingCartIcon sx={{ fontSize: '30px' }} />
            </Badge> */}
            <PaymentCardModal open={openPaymentModal} onClose={handleClosePaymentCardModal} />
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
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>{' '}
        {loadingBonus && <Loading />}
        <BonusMenu />
      </Paper>
    </>
  ) : (
    <Navigate to="/auth" />
  );
}

export default DrawerAppBar;

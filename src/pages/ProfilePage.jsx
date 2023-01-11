import { Box, Button, Container, IconButton, TextField, Tooltip, Typography, Paper, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import Alert from '@mui/material/Alert';
import DrawerAppBar from '../components/MainLayout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { currencyFormat } from '../utils/currencyFormat';
import { generatePromoCode, getUser, resetGeneratePromoCode } from '../redux/slices/user.slice';
import moment from 'moment';
import Loading from '../components/Loading';
import PaymentModal from '../components/PaymentModal';
import { a11yProps, TabPanel } from './Home';
import TrancTable from '../components/TrancTable';
import PaymentTable from '../components/PaymentTable';
import BonusMenu from '../components/BonusMenu';
import ProfileAvatar from '../components/ProfileAvatar';
const ProfilePage = () => {
  const {
    getUserState: { loading, data, error },
    generatePromoCodeState: { loading: loadingGenPromo, data: dataGenPromo, error: errorGenPromo },
  } = useSelector((state) => state.user);
  const [openCopy, setOpenCopy] = React.useState(false);
  const [typePay, setTypePay] = useState(1);
  const [promoActive, setPromoActive] = useState(null);
  const [diffDaysPromo, setDiffDaysPromo] = useState(null);
  const [openCopyPromo, setOpenCopyPromo] = React.useState(false);
  const [openPay, setOpenPay] = React.useState(false);
  const dispatch = useDispatch();
  const handleTooltipClose = () => {
    setOpenCopy(false);
  };
  const handleClickOpenPay = (typePayParam) => {
    setOpenPay(true);
    setTypePay(typePayParam);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClosePay = (value) => {
    setOpenPay(false);
  };
  useEffect(() => {
    if (data?.selfReferralCode) {
      const diffDaysPromoVal = moment(data?.selfReferralCode?.dateEnd).diff(moment(), 'days');
      const promoActive = moment().isBefore(data?.selfReferralCode?.dateEnd);
      setDiffDaysPromo(diffDaysPromoVal);
      setPromoActive(promoActive);
    }
  }, [data]);

  const handleTooltipOpen = () => {
    navigator.clipboard.writeText(data?.id);
    setOpenCopy(true);
    setTimeout(() => {
      setOpenCopy(false);
    }, 1000);
  };
  const handleTooltipClosePromo = () => {
    setOpenCopyPromo(false);
  };
  useEffect(() => {
    if (dataGenPromo) {
      dispatch(getUser());
      dispatch(resetGeneratePromoCode());
    }
  }, [dataGenPromo]);

  const handleTooltipOpenPromo = () => {
    navigator.clipboard.writeText(data?.selfReferralCode?.code);
    setOpenCopyPromo(true);
    setTimeout(() => {
      setOpenCopyPromo(false);
    }, 1000);
  };
  const onExit = () => {
    localStorage.removeItem('token');
    dispatch(getUser());
  };

  const handleGeneratePromoCode = () => {
    dispatch(generatePromoCode());
  };
  return (
    <DrawerAppBar>
      <Paper sx={{ height: 'auto', marginTop: '22px' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: 'auto' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ justifyContent: 'center' }}>
              <Tab label="Кабинет" {...a11yProps(0)} />
              <Tab label="Донаты" {...a11yProps(1)} />
              <Tab label="Оплаты" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Container>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', mt: 3, mx: 'auto' }}>
                <ProfileAvatar />
                <Typography variant="h4">Личный кабинет</Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {`Аккаунт ${data?.email}`}
                </Typography>
                <Typography variant="body1" sx={{}}>
                  {`${data?.name}`}
                </Typography>
                <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>
                  Ваш ID на сайте
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <Typography variant="h5" sx={{ fontWeight: '700 !important' }}>
                    {data?.id}
                  </Typography>
                  <Box sx={{ position: 'absolute', left: '120%', top: '55%', transform: 'translateY(-50%)' }}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                        sx: {
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: 'success.main',
                          },
                        },
                      }}
                      onClose={handleTooltipClose}
                      open={openCopy}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={<div style={{ whiteSpace: 'nowrap' }}>ID скопирован</div>}>
                      <IconButton onClick={handleTooltipOpen} disableRipple={true} sx={{ pl: 0.5 }}>
                        <ContentCopyIcon sx={{ fontSize: '18px', opacity: '0.7' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      handleClickOpenPay(1);
                    }}
                    sx={{ mt: 3 }}
                    variant="outlined"
                    size="large">
                    Пополнить счет
                  </Button>

                  <Typography variant="body1" sx={{ mb: 1, marginTop: '10px' }}>
                    <Alert severity="success">Через данную кнопку вы можете пополнить свой личный счет на сайте на любую сумму. Доступны оплаты по карте, Qiwi, YooMoney.</Alert>
                  </Typography>
                </Box>
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      handleClickOpenPay(2);
                    }}
                    sx={{ mt: 3 }}
                    variant="outlined"
                    size="large">
                    Пополнить счет (резерв)
                  </Button>
                  <Typography variant="body1" sx={{ mb: 1, marginTop: '10px' }}>
                    <Alert severity="success">Данный метод пополнения счета больше резервный. В нем иногда не проходит оплата. Лучше воспользуйтесь пополнением счета через страницу игры — кнопочка "купить" в блоке пака, собрав корзину заказа.</Alert>
                  </Typography>
                </Box>
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <BonusMenu />
                  <Typography variant="body1" sx={{ mb: 1, marginTop: '10px' }}>
                    <Alert severity="success">В копилку вам приходит 0,5% от всех донатов, по достижению определенной суммы вы их сможете забрать.</Alert>
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>
                  Реферальная программа
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, textAlign: 'center', fontSize: '12px' }}>
                  Ниже ваш код реферальной программы. Если пользователь зарегистрировался под вашим кодом, то вы будете получать 1% с его доната на ваш личный счет на время действия кода. Код действителен 30 дней, потом нужно создавать новый (появится соответствующая кнопка). Для администраторов
                  сообществ действуют специальные предложения. Если у вас есть сообщество, свяжитесь с нами для экслюзивных условий.
                </Typography>{' '}
                {promoActive !== null && (
                  <>
                    <Typography variant="h5" sx={{ mt: 5, mb: 2, marginTop: '-3px' }}>
                      Ваш промокод
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid ',
                        borderColor: promoActive ? 'success.main' : 'error.main',
                        px: 3,
                        py: 2,
                        borderRadius: 1,
                        textTransform: 'uppercase',
                        fontSize: '24px',
                        textAlign: 'center',

                        minWidth: '150px',
                      }}>
                      <Box sx={{ pl: promoActive ? '20px' : '0', fontWeight: '600 !important', color: promoActive ? '#fff' : 'error.main' }}>{data?.selfReferralCode?.code}</Box>{' '}
                      <Tooltip
                        PopperProps={{
                          sx: {
                            width: '200px',
                            marginTop: '50px !important',
                            marginLeft: '-47px !important',

                            '& .MuiTooltip-tooltip': {
                              backgroundColor: 'success.main',
                            },
                          },
                          disablePortal: true,
                        }}
                        onClose={handleTooltipClosePromo}
                        open={openCopyPromo}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={<div style={{ whiteSpace: 'nowrap' }}>промокод скопирован</div>}>
                        <IconButton sx={{ p: 0, ml: 1, display: promoActive ? 'block' : 'none' }} onClick={handleTooltipOpenPromo} disableRipple={true}>
                          <ContentCopyIcon sx={{ fontSize: '18px', opacity: '0.7' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5, mb: 2, whiteSpace: 'nowrap', fontSize: '14px', color: promoActive ? '#fff' : 'error.main' }}>
                      {promoActive ? (
                        <>
                          {' '}
                          активен в течение <Box sx={{ display: 'inline-block', fontWeight: '600 !important', color: 'success.main' }}>{diffDaysPromo < 1 ? 'сегодняшнего дня' : `${diffDaysPromo} дней`}</Box>
                        </>
                      ) : (
                        'промокод неактивен'
                      )}
                    </Typography>{' '}
                    {!promoActive && (
                      <Button sx={{ color: '#fff' }} variant="contained" size="large" color="success" onClick={handleGeneratePromoCode}>
                        Сгенерировать новый
                      </Button>
                    )}
                  </>
                )}
              </Box>
              {promoActive !== null && (
                <Box sx={{ display: 'grid', justifyContent: 'space-evenly', mt: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Начислено всего по программе
                    </Typography>
                    {<Box sx={{ fontWeight: '600 !important', fontSize: '20px' }}>{data?.totalRefferal ? currencyFormat(parseFloat(data?.totalRefferal)) : currencyFormat(0)}</Box>}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                      Начислено сегодня
                    </Typography>
                    {<Box sx={{ fontWeight: '600 !important', fontSize: '20px' }}>{data?.totalRefferalToday ? currencyFormat(parseFloat(data?.totalRefferalToday)) : currencyFormat(0)}</Box>}
                  </Box>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 8 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: '200px' }}
                  size="large"
                  onClick={() => {
                    onExit();
                  }}>
                  Выйти из аккаунта
                </Button>
              </Box>
              {loadingGenPromo && <Loading />}
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TrancTable title="Последние донаты" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PaymentTable title="Пополнение счета" />
          </TabPanel>
        </Box>
      </Paper>
      <PaymentModal open={openPay} typePay={typePay} onClose={handleClosePay} />
    </DrawerAppBar>
  );
};

export default ProfilePage;

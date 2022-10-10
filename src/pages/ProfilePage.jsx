import { Box, Button, Container, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import DrawerAppBar from '../components/MainLayout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { currencyFormat } from '../utils/currencyFormat';
import { generatePromoCode, getUser, resetGeneratePromoCode } from '../redux/slices/user.slice';
import moment from 'moment';
import Loading from '../components/Loading';
const ProfilePage = () => {
  const {
    getUserState: { loading, data, error },
    generatePromoCodeState: { loading: loadingGenPromo, data: dataGenPromo, error: errorGenPromo },
  } = useSelector((state) => state.user);
  const [openCopy, setOpenCopy] = React.useState(false);
  const [promoActive, setPromoActive] = useState(null);
  const [diffDaysPromo, setDiffDaysPromo] = useState(null);
  const [openCopyPromo, setOpenCopyPromo] = React.useState(false);
  const dispatch = useDispatch();
  const handleTooltipClose = () => {
    setOpenCopy(false);
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
    <DrawerAppBar isFull>
      <Container>
        <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', mt: 6, mx: 'auto' }}>
          <Typography variant="h4">Личный кабинет</Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            {`Аккаунт ${data?.email}`}
          </Typography>
          <Typography variant="h5" sx={{ mt: 8, mb: 1 }}>
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
          <Typography variant="h5" sx={{ mt: 8, mb: 1 }}>
            Реферальная программа
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam unde a maxime aut debitis beatae optio, neque est! Eaque molestias in culpa facilis soluta cupiditate et impedit voluptas rem id?
          </Typography>{' '}
          {promoActive !== null && (
            <>
              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Ваш ID промокод
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
                    активен в течении <Box sx={{ display: 'inline-block', fontWeight: '600 !important', color: 'success.main' }}>{diffDaysPromo < 1 ? 'сегодняшнего дня' : `${diffDaysPromo} дней`}</Box>
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
          <Box sx={{ display: 'grid', justifyContent: 'space-evenly', mt: 3, gridTemplateColumns: '300px 300px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Начислено всего по программе
              </Typography>
              {data?.totalRefferal && <Box sx={{ fontWeight: '600 !important', fontSize: '24px' }}>{currencyFormat(parseFloat(data?.totalRefferal))}</Box>}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Начислено сегодня
              </Typography>
              {data?.totalRefferalToday && <Box sx={{ fontWeight: '600 !important', fontSize: '24px' }}>{currencyFormat(parseFloat(data?.totalRefferalToday))}</Box>}
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
            Выход
          </Button>
        </Box>
        {loadingGenPromo && <Loading />}
      </Container>
    </DrawerAppBar>
  );
};

export default ProfilePage;

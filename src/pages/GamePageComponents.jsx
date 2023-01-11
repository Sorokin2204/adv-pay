import { Container, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import HomeLayout from '../components/HomeLayout';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, CircularProgress, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { currencyFormat } from '../utils/currencyFormat';

import { useForm, Controller } from 'react-hook-form';
import { checkUser, checkUserReset, getUser } from '../redux/slices/user.slice';
import axios from 'axios';
import { createTransaction } from '../redux/slices/transaction.slice';
import DrawerAppBar from '../components/MainLayout';
import GameCard from '../components/GameCard';
import '../styles/GamePage.scss';
import PaymentModal from '../components/PaymentModal';
import AcceptModal from '../components/AcceptModa';
import PaymentCardModal from '../components/PaymentCardModal';
import PaymentGameCardModal from '../components/PaymentGameCardModal';
import SelectPackageModal from '../components/SelectPackageModal';
import { HelpOutlineOutlined } from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';
import SelectRadio from '../components/SelectRadio';
const GamePageComponent = ({ data }) => {
  const dispatch = useDispatch();
  const {
    getPackageState: { data: packageList },
  } = useSelector((state) => state.package);
  const {
    createTransactionState: { loading: transLoading, data: transData },
  } = useSelector((state) => state.transaction);
  const {
    checkUserState: { data: checkData, loading: checkLoading, error: checkError },
  } = useSelector((state) => state.user);

  const defaultValues = {
    packageId: null,
    playerId: '',
    serverId: data?.serverList[0]?.serverId,
  };
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    register,
    getValues,
    watch,
  } = useForm({ defaultValues });
  const [playerId, setPlayerId] = React.useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [activeCard, setActiveCard] = useState();
  const [disableCheck, setDisableCheck] = useState(false);
  const [disableDonate, setDisableDonate] = useState(data?.checkPlayer);
  const [repeatCheck, setRepeatCheck] = useState(false);
  const handleAgree = () => setIsAgree(!isAgree);
  React.useEffect(() => {
    if (checkError?.error === 'PROBLEM_WITH_TOKEN') {
      dispatch(checkUserReset());
      dispatch(getUser());
    }
  }, [checkError]);
  React.useEffect(() => {
    if (transData) {
      setValue('packageId', packageList?.[0]?.code);
      setValue('playerId', null);
      setValue('serverId', data?.serverList[0]?.serverId);
      dispatch(checkUserReset());
    }
  }, [transData]);

  React.useEffect(() => {
    if (packageList && packageList?.length !== 0) {
      setValue('packageId', packageList?.[0]?.code);
    }
  }, [packageList]);
  const onCheckPlayer = () => {
    if (repeatCheck) {
      setRepeatCheck(false);
      setDisableCheck(false);
      setDisableDonate(true);
    } else {
      const playerId = getValues('playerId');
      const serverId = getValues('serverId');
      setLastServer(serverId);
      if (playerId) {
        dispatch(checkUser({ playerId, serverId, typeGameId: data?.id }));
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(checkUserReset());
    };
  }, []);

  const onSubmit = (packageId) => {
    const playerIdData = getValues('playerId');
    const serverIdData = getValues('serverId');
    if (playerIdData && serverIdData) {
      dispatch(createTransaction({ playerId: playerIdData, serverId: serverIdData, packageId, typeGameId: data?.id }));
    }
  };
  const [lastServer, setLastServer] = useState(null);
  const [openAccept, setOpenAccept] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openSelectPackage, setOpenSelectPackage] = useState(false);
  const handleCloseSelectPackage = () => {
    setOpenSelectPackage(false);
  };
  const handleOpenSelectPackage = () => {
    setOpenSelectPackage(true);
  };
  const handleCloseAccept = () => {
    setOpenAccept(false);
  };
  const handleClosePaymentCardModal = () => {
    setOpenPaymentModal(false);
  };

  const handleNext = () => {
    onSubmit(selectedGameCode);
  };
  useEffect(() => {
    if (!checkData && checkError) {
      setDisableDonate(true);
      setDisableCheck(false);
    } else if (checkData && !checkError) {
      setDisableDonate(false);
      setDisableCheck(true);
      setRepeatCheck(true);
    }
  }, [checkData, checkError]);

  const [selectedGameCode, setselectedGameCode] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [policyLight, setPolicyLight] = useState(false);
  useEffect(() => {
    return () => {
      // dispatch(resetCheck)
    };
  }, []);
  const watchServerId = watch('serverId');
  return (
    <>
      <div className="game" style={{ backgroundImage: `url("${data?.background}")` }}>
        <Container>
          <div className="game__content">
            <div className="game__title">{data?.name}</div>
            {data?.desc}

            <div style={{ marginTop: '16px' }} class="custom-radio-label">
              Выберите сервер
            </div>
            <SelectRadio selectedItem={watchServerId} active={data.isSelectServer} list={data?.serverList}>
              <div class="custom-radio" style={{ opacity: checkLoading || disableCheck ? '0.7' : '1' }}>
                {data?.serverList?.map((serverItem) => (
                  <label>
                    <input {...register('serverId', { required: true })} type="radio" value={serverItem?.serverId} disabled={checkLoading || disableCheck} />

                    <span>{serverItem?.name}</span>
                  </label>
                ))}
              </div>
            </SelectRadio>
            <Box className="" sx={{ mt: { xs: 1, sm: 0 }, display: 'flex', alignItems: { xs: 'center', mob: 'stretch' }, flexDirection: 'column' }}>
              <div className="check-id-box">
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowHelp(false);
                  }}>
                  <div className="check-id-label">
                    <span>Ваш игровой ID</span>
                    <div style={{ position: 'relative' }}>
                      <IconButton
                        onClick={() => {
                          setShowHelp(!showHelp);
                        }}
                        disableRipple
                        sx={{ p: 0, ml: 1, mb: '2px' }}>
                        <HelpOutlineOutlined sx={{ fontSize: '20px', color: '#e2ba7e' }} />
                      </IconButton>
                      <img style={{ position: 'absolute', bottom: '150%', right: '-100px', maxHeight: '180px', transition: 'opacity 0.3s, visibility 0.3s', ...(!showHelp && { visibility: 'hidden', opacity: '0' }) }} src={data?.helpImage} />
                    </div>
                  </div>
                </OutsideClickHandler>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', mob: 'row' } }}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="playerId"
                    render={({ field }) => (
                      <input
                        class="check-id-input"
                        {...field}
                        onChange={(event) => {
                          const newVal = event.target.value;
                          if (data.id === 3 || data.id === 4) {
                            if (newVal.length <= 10) {
                              field.onChange(event.target.value);
                            }
                          } else {
                            if (newVal.length <= 9) {
                              field.onChange(event.target.value);
                            }
                            if (data.id === 2 && newVal?.length >= 1) {
                              const firstServerId = newVal.substring(0, 1);
                              if (firstServerId === '6') {
                                setValue('serverId', 'America');
                              } else if (firstServerId === '7') {
                                setValue('serverId', 'Europe');
                              } else if (firstServerId === '8') {
                                setValue('serverId', 'Asia');
                              } else if (firstServerId === '9') {
                                setValue('serverId', 'TW, HK, MO');
                              }
                            }
                          }
                        }}
                        type="number"
                        disabled={checkLoading || disableCheck}
                        autoComplete="off"
                      />
                    )}
                  />
                  {data?.checkPlayer && (
                    <button class="check-id-btn" onClick={() => onCheckPlayer()} disabled={checkLoading} style={{ opacity: checkLoading ? '0.7' : '1', minWidth: '210px', cursor: checkLoading ? 'auto' : 'pointer' }}>
                      {repeatCheck ? 'Ввести снова' : data?.checkText}
                    </button>
                  )}
                </Box>
                <label style={{ backgroundColor: policyLight ? '#ad2305' : 'transparent', transition: 'background-color 0.5s' }} class="accept-checkbox" id="agree-block">
                  <input type="checkbox" name="accept" onClick={handleAgree} checked={isAgree} />
                  <span>{data?.privacyContent}</span>
                </label>
              </div>

              <div style={{ height: data?.checkPlayer ? '130px' : '22px', display: 'flex', marginRight: 'auto', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                {checkLoading ? (
                  <div style={{ display: 'flex', margin: '0 auto', marginTop: '30px', justifyContent: 'center' }}>
                    {' '}
                    <CircularProgress />
                  </div>
                ) : !checkData && !checkError && !checkLoading ? (
                  <></>
                ) : checkData && !checkError ? (
                  <div>
                    {checkData?.image && <img style={{ borderRadius: '8px', background: 'white', width: '120px', position: 'absolute', left: 0, top: '10px' }} src={checkData?.image} />}

                    <div style={{ paddingLeft: checkData?.image ? '130px' : '0px', display: 'flex', flexDirection: 'column', alignItems: 'start', marginRight: 'auto' }}>
                      <div className="check-id-label">Ваш ник</div>
                      <Box className="" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '20px', mb: '4px', mt: '-4px' }}>
                        <b> {checkData?.nickname}</b>
                        <img src="/check.png" style={{ marginLeft: '6px' }} />
                      </Box>{' '}
                      <Box className="" sx={{ flexDirection: 'column', display: 'flex', fontSize: '20px', mt: '2px' }}>
                        <b> {checkData?.id}</b>
                      </Box>
                      {data?.id == 3 && checkData?.device == 'app_store' && (
                        <Box className="" sx={{ flexDirection: 'column', display: 'flex', fontSize: '20px', transform: ' translateY(10px)', backgroundColor: '#ad2305' }}>
                          <b> Донат доступен только для аккаунтов, созданных на Android</b>
                        </Box>
                      )}
                      {data?.id === 2 && (
                        <Box className="" sx={{ flexDirection: 'column', display: 'flex', fontSize: '20px', mt: '2px' }}>
                          <b> {checkData?.id.substring(0, 1) === '6' ? 'America' : checkData?.id.substring(0, 1) === '7' ? 'Europe' : checkData?.id.substring(0, 1) === '8' ? 'Asia' : checkData?.id.substring(0, 1) === '9' ? 'TW, HK, MO' : ''}</b>
                        </Box>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: '40px', marginLeft: '10px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ whiteSpace: 'nowrap', color: 'error.main', fontWeight: '600', fontSize: '20px' }}>ID не найден</Typography>
                      <SearchOffIcon sx={{ ml: '4px', mb: '0px', color: 'error.main', fontSize: '30px' }} />
                    </div>
                  </div>
                )}
                <button
                  disabled={(data?.checkRequired === false ? data?.checkRequired : disableDonate) || (data?.id == 3 && checkData?.device == 'app_store') || checkLoading}
                  class="check-id-btn finish-donate"
                  style={{ marginLeft: '0px', marginTop: '10px', position: 'absolute', ...(!disableDonate || checkData ? { bottom: checkData?.image || checkData?.device == 'app_store' ? '-50px' : '-30px' } : { top: '0px' }), left: 0 }}
                  onClick={() => {
                    const playerIdData = getValues('playerId');
                    if (playerIdData) {
                      if (isAgree) {
                        handleOpenSelectPackage();
                      } else {
                        setPolicyLight(true);
                        setTimeout(() => {
                          setPolicyLight(false);
                        }, 500);
                      }
                    }
                  }}>
                  Задонатить
                </button>
              </div>
            </Box>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '55px' }}>
              <div className="game__card-grid">
                {packageList
                  ?.filter((pack) => pack?.typeGameId === data?.id)
                  ?.map((packageItem, index) => (
                    <GameCard
                      disabled={disableDonate}
                      active={activeCard === index}
                      img={data?.pacakgeImageList[index]}
                      price={packageItem?.price}
                      value={packageItem?.code}
                      gameId={packageItem?.typeGameId}
                      label={packageItem?.name}
                      onClickCard={() => {
                        if (!disableDonate) setActiveCard(index);
                      }}
                      // onClick={() => {
                      //   if (isAgree) {
                      //     setselectedGameCode(packageItem?.code);
                      //     setOpenAccept(true);
                      //   } else {
                      //     document.getElementById('agree-block').scrollIntoView({ behavior: 'smooth' });
                      //   }
                      // }}
                      onClickCart={() => {
                        setSelectedPackageId(packageItem?.id);
                        setOpenPaymentModal(true);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <AcceptModal open={openAccept} selectedPackage={selectedGameCode} text={'Подтверждаем донат?'} typeGameId={data?.id} onClose={handleCloseAccept} onNext={handleNext} />
      {transLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: { xs: 'calc(50% + 70px)', mob: 'calc(50% + 60px)' },
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: '100000',
            textAlign: 'center',
            fontSize: { xs: '20px', mob: '22px' },
            whiteSpace: { xs: 'normal', mob: 'nowrap' },
            width: { xs: '262px', mob: 'auto' },
          }}>
          Ваш донат отправляется, дождитесь окончания <br /> и не закрывайте страницу
        </Box>
      )}
      <SelectPackageModal
        gameId={data?.id}
        open={openSelectPackage}
        onClose={handleCloseSelectPackage}
        onNext={(selectPackage) => {
          if (selectPackage) {
            setselectedGameCode(selectPackage);
            handleCloseSelectPackage();
            setOpenAccept(true);
          }
        }}
      />
      <PaymentGameCardModal open={openPaymentModal} packageId={selectedPackageId} onClose={handleClosePaymentCardModal} />
    </>
  );
};
export default GamePageComponent;

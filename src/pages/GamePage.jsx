import { Container } from '@mui/material';
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
const GamePage = () => {
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
    serverId: '2011',
  };
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    register,
    getValues,
  } = useForm({ defaultValues });
  const [playerId, setPlayerId] = React.useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [activeCard, setActiveCard] = useState();
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
      setValue('serverId', '2011');
      dispatch(checkUserReset());
    }
  }, [transData]);

  React.useEffect(() => {
    if (packageList && packageList?.length !== 0) {
      setValue('packageId', packageList?.[0]?.code);
    }
  }, [packageList]);
  const onCheckPlayer = () => {
    const playerId = getValues('playerId');
    const serverId = getValues('serverId');
    if (playerId) {
      dispatch(checkUser({ playerId, serverId }));
    }
  };

  const onSubmit = (packageId) => {
    const playerIdData = getValues('playerId');
    const serverIdData = getValues('serverId');
    dispatch(createTransaction({ playerId: playerIdData, serverId: serverIdData, packageId }));
  };
  const [openAccept, setOpenAccept] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const handleCloseAccept = () => {
    setOpenAccept(false);
  };
  const handleClosePaymentCardModal = () => {
    setOpenPaymentModal(false);
  };

  const handleNext = () => {
    onSubmit(selectedGameCode);
  };
  const [selectedGameCode, setselectedGameCode] = useState(null);
  const [selectedGamePrice, setSelectedPrice] = useState(null);
  return (
    <DrawerAppBar isFull>
      <div className="game">
        <Container>
          <div className="game__content">
            <div className="game__title">Донат в игру Identity V</div>
            <ul className="game__list">
              <li className="game__list-item"> печати в игру приходят моментально, каждый пак содержит бонусные печати</li>
              <li className="game__list-item"> ваш донат полностью легален, печати засчитываются в накопительный игровой счет Мисс Соловья</li>
              <li className="game__list-item"> если возникла ошибка при донате, повторите попытку или напишите нам</li>
              <li className="game__list-item"> мы не несем ответственности, если вы указали неверный ID</li>
            </ul>

            <div style={{ marginTop: '16px' }} class="custom-radio-label">
              Выберите сервер
            </div>
            <div class="custom-radio">
              <label>
                <input {...register('serverId', { required: true })} type="radio" value="2011" disabled={checkLoading} />
                {/* <input type="radio" name="radio" /> */}
                <span>NA/EU</span>
              </label>
              <label>
                <input {...register('serverId', { required: true })} type="radio" value="2001" disabled={checkLoading} />
                <span>Asia</span>
              </label>
            </div>

            <Box className="" sx={{ mt: { xs: 1, sm: 0 }, display: 'flex', alignItems: 'start', flexDirection: { xs: 'column', sm: 'row' } }}>
              <div className="check-id-box">
                {' '}
                <div className="check-id-label">Ваш игровой ID</div>
                <Controller control={control} rules={{ required: true }} name="playerId" render={({ field }) => <input class="check-id-input" {...field} type="number" disabled={checkLoading} autoComplete="off" />} />
                <button class="check-id-btn" onClick={() => onCheckPlayer()} disabled={checkLoading}>
                  Подтвердить
                </button>
              </div>

              <div style={{ height: '130px', display: 'flex', marginRight: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                {' '}
                {checkLoading ? (
                  <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                    {' '}
                    <CircularProgress />
                  </div>
                ) : !checkData && !checkError && !checkLoading ? (
                  <></>
                ) : checkData && !checkError ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginRight: 'auto' }}>
                    <div className="check-id-label">Ваш ник</div>
                    <Box className="" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '16px', mb: '4px', mt: '-4px' }}>
                      <b> {checkData?.nickname}</b>
                      <img src="/check.png" style={{ marginLeft: '6px' }} />
                    </Box>{' '}
                    <Box className="" sx={{ flexDirection: 'column', display: 'flex', fontSize: '16px', mt: '2px' }}>
                      <b> {checkData?.id}</b>
                    </Box>
                  </div>
                ) : (
                  <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ whiteSpace: 'nowrap', color: 'error.main', fontWeight: '600', fontSize: '20px' }}>ID не найден</Typography>
                      <SearchOffIcon sx={{ ml: '4px', mb: '4px', color: 'error.main', fontSize: '30px' }} />
                    </div>
                  </div>
                )}
              </div>
            </Box>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="game__card-grid">
                {packageList?.map((packageItem, index) => (
                  <GameCard
                    active={activeCard === index}
                    img={`/game-img-${index + 1}.png`}
                    price={packageItem?.price}
                    value={packageItem?.code}
                    label={packageItem?.name}
                    onClickCard={() => {
                      setActiveCard(index);
                    }}
                    onClick={() => {
                      if (isAgree) {
                        setselectedGameCode(packageItem?.code);
                        setOpenAccept(true);
                      } else {
                        document.getElementById('agree-block').scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    onClickCart={() => {
                      if (isAgree) {
                        setSelectedPrice(packageItem?.price);
                        setOpenPaymentModal(true);
                      } else {
                        document.getElementById('agree-block').scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <label class="accept-checkbox" id="agree-block">
            <input type="checkbox" name="accept" onClick={handleAgree} checked={isAgree} />
            <span>
              Игровую валюту на данной странице вы донатите в пользу NetEase Games. Мы не являемся правообладателем игровой валюты Identity V, не определяем порядок её использования и функционирования в игре. Производя донат в игру Identity V вы соглашаетесь с данным{' '}
              <a class="link" href="https://game.longeplay.com.tw/member/complete_agreement">
                пользовательским соглашением
              </a>
              , пользовательским соглашением Donate Gold и политикой конфиденциальности.
            </span>
          </label>
        </Container>
      </div>
      <AcceptModal open={openAccept} text={'Подтверждаем донат ?'} onClose={handleCloseAccept} onNext={handleNext} />
      <PaymentCardModal open={openPaymentModal} price={selectedGamePrice} onClose={handleClosePaymentCardModal} />
    </DrawerAppBar>
  );
};
export default GamePage;

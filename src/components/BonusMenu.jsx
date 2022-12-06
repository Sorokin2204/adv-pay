import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box, Button, Drawer, Fab, LinearProgress } from '@mui/material';
import { Savings } from '@mui/icons-material';
import { currencyFormat } from '../utils/currencyFormat';
import { isWhatPercentOf } from '../utils/isWhatPercentOf';
import { getBonus, getUser } from '../redux/slices/user.slice';
import Loading from './Loading';
const BonusMenu = () => {
  const {
    getUserState: { loading, data: userData, error },
    getBonusState: { loading: loadingBonus, data: dataBonus, error: dataError },
  } = useSelector((state) => state.user);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [goalFirst, setGoalFirst] = useState(0);
  const [goalSecond, setGoalSecond] = useState(0);
  const [goalThird, setGoalThird] = useState(0);
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (userData) {
      const percentSecond = isWhatPercentOf(userData?.bonusBalance, 500);
      const percentThrid = isWhatPercentOf(userData?.bonusBalance, 1000);
      const percentFirst = isWhatPercentOf(userData?.bonusBalance, 100);
      if (percentFirst > 100) {
        setGoalFirst(100);
      } else {
        setGoalFirst(percentFirst);
      }
      if (percentSecond > 100) {
        setGoalSecond(100);
      } else if (userData?.bonusBalance > 100) {
        setGoalSecond(percentSecond);
      }
      if (percentThrid > 100) {
        setGoalThird(100);
      } else if (userData?.bonusBalance > 500) {
        setGoalThird(percentThrid);
      }
    }
  }, [userData]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataBonus) {
      window.location.reload(false);
    }
  }, [dataBonus]);

  const handleGetBonus = () => {
    dispatch(getBonus());
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  return (
    <div>
      <Fab
        sx={{ position: 'fixed', background: '#e9a317', bottom: '20px', left: '20px' }}
        onClick={() => {
          handleOpenDrawer();
        }}
        size="medium"
        aria-label="add">
        <Savings sx={{ color: '#9c2628' }} />
      </Fab>{' '}
      <Drawer anchor={'left'} open={openDrawer} onClose={handleCloseDrawer}>
        <Box sx={{ width: '160px', marginTop: '150px', marginBottom: '100px', transform: 'translateX(0px)' }}>
          <Box sx={{ position: 'relative' }}>
            <div className="" style={{ position: 'absolute', top: '-50px', left: '20px' }}>
              Накопления
            </div>
            <LinearProgress
              sx={{
                background: 'rgba(233, 163, 23,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: '#e9a317',
                  display: goalThird ? 'block' : 'none',
                },
                borderRadius: '0 4px   4px 0',
                height: '8px',
                width: '130px',
                transform: 'rotate(-90deg) ',
                position: 'absolute',
                top: '66px',
                left: 0,
              }}
              variant="determinate"
              value={goalThird}
            />
            <Box
              sx={{
                color: goalThird == 100 ? '#e9a317' : 'rgba(233, 163, 23,0.4)',
                position: 'absolute',
                top: '-2px',
                left: '82.5px',
              }}>
              {currencyFormat(1000)}
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <LinearProgress
              sx={{
                background: 'rgba(233, 163, 23,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: '#e9a317',
                  display: goalSecond ? 'block' : 'none',
                },
                height: '8px',
                width: '130px',
                transform: 'rotate(-90deg) ',
                position: 'absolute',
                top: '196px',
                left: 0,
              }}
              variant="determinate"
              value={goalSecond}
            />
            <Box
              sx={{
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '10px',
                  height: '2px',
                  background: goalSecond == 100 ? '#e9a317' : 'rgba(233, 163, 23,0.2)',
                  position: 'absolute',
                  top: '50%',
                  left: '-20px',
                  translate: 'translateY(-50%)',
                },
                color: goalSecond == 100 ? '#e9a317' : 'rgba(233, 163, 23,0.4)',
                position: 'absolute',
                top: '123px',
                left: '89.5px',
              }}>
              {currencyFormat(500)}
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <LinearProgress
              sx={{
                background: 'rgba(233, 163, 23,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: '#e9a317',
                },
                borderRadius: '4px 0 0 4px',
                height: '8px',
                width: '130px',
                transform: 'rotate(-90deg) ',
                position: 'absolute',
                top: '325.5px',
                left: 0,
              }}
              variant="determinate"
              value={goalFirst}
            />
            <Box
              sx={{
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '10px',
                  height: '2px',
                  background: goalFirst == 100 ? '#e9a317' : 'rgba(233, 163, 23,0.2)',
                  position: 'absolute',
                  top: '50%',
                  left: '-20px',
                  translate: 'translateY(-50%)',
                },
                color: goalFirst == 100 ? '#e9a317' : 'rgba(233, 163, 23,0.4)',
                position: 'absolute',
                top: '254px',
                left: '89.5px',
              }}>
              {currencyFormat(100)}
            </Box>
          </Box>
          <Button onClick={handleGetBonus} disabled={userData?.bonusBalance < 100} size="small" variant="outlined" sx={{ marginTop: '410px', marginLeft: '30px', display: 'flex' }}>
            Забрать
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default BonusMenu;

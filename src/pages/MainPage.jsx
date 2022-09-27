import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
import ListGame from '../components/ListGame';
import HomeSlider from '../components/HomeSlider';
const MainPage = () => {
  return (
    <HomeLayout isFullContainer>
      <Container style={{ maxWidth: 'none', padding: '0', marginLeft: '-16px', width: 'calc(100% + 32px)' }}>
        <HomeSlider />
      </Container>
      <Container>
        <Box sx={{ marginTop: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ListGame />
            <Typography variant="body1" sx={{ maxWidth: '600px', mt: 3 }}>
              Donate Gold — сервис, позволяющий вам самостоятельно донатить в мобильные и компьютерные игры с помощью единого личного кабинета. Пополнять счет личного кабинета можно с любых карт российских банков. Ознакомьтесь с инструкцией и правилами сервиса. Для заведения личного кабинета,
              пожалуйста, зарегистрируйтесь.
            </Typography>
          </Box>
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default MainPage;

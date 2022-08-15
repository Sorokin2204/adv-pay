import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const MainPage = () => {
  return (
    <HomeLayout>
      <Container>
        <Box sx={{ marginTop: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ maxWidth: '600px', mt: 3 }}>
              Donate Gold — сервис, позволяющий вам самостоятельно донатить в мобильные и компьютерные игры с помощью единого личного кабинета. Пополнять счет личного кабинета можно с любых карт российских банков. Ознакомьтесь с инструкцией и правилами сервиса. Для заведения личного кабинета, пожалуйста, зарегистрируйтесь.
            </Typography>			
			<Typography variant="h4" sx={{ mt: 2 }}>
              Игры
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(3,250px)', xs: 'auto' }, justifyContent: { mobile: 'space-between', xs: 'center' }, gap: { xs: '20px' }, width: '100%', mt: 5, mb: 5 }}>
              <img src="/blank.png" style={{ height: '100px', width: '250px', objectFit: 'cover' }} /> <img src="/identityv.jpg" style={{ height: '100px', width: '250px', objectFit: 'cover' }} /> <img src="/blank.png" style={{ height: '100px', width: '250px', objectFit: 'cover' }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default MainPage;
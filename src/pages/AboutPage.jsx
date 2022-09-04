import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const AboutPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h4" sx={{ mt: 2 }}>
                О сервисе
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
                Сервис позволяет донатить в мобильные и компьютерные игры напрямую разработчикам через их API. Все транзакции абсолютно легальны. Банов ваших аккаунтов не будет, так как все пополнения идут напрямую разработчикам. Список игр будет постепенно расширяться.
              </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default AboutPage;

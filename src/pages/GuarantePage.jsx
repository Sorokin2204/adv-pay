import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const GuarantePage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
		 <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
			              <Typography variant="h4" sx={{ mt: 2 }}>Гарантии</Typography>
			<Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
			<b style={{fontWeight: '600 !important'}}>Безопасность данных</b>
		<br/>
В нашей базе данных не хранятся ваши персональные данные и мы их у вас не запрашиваем. У нас хранится только ваши email, которые требуются при регистрации аккаунта. Мы не рассылаем вам спам и рекламные сторонние предложения. Наш сервис работает по защищенному протоколу https и использует сертификат безопасности SSL. Все транзакции на сайте происходят через официальные банковские шлюзы, где переданные данные надежно защищены и зашифрованы.<br/><br/>

Гарантии пополнения игровой валюты<br/>
Игровая валюта через наш сервис приходит на ваши игровые аккаунты моментально. Исключения могут составлять некоторые игры, и об этом указано в карточке игры. Все пополнения абсолютно легальны, банов ваших игровых аккаунтов не будет. Мы работаем или напрямую через API разработчика, или работаем с официальными интеграторами, такими как OffGamers, Codashop, Razer, SEA Gamer и другими. Все пополнения идут только по вашему игровому ID. Данных логина и пароля от вашего игрового аккаунта мы не запрашиваем и не храним.
		</Typography>
            </Box>
          </Box>
		</Container>
      </HomeLayout>
    </>
  );
};

export default GuarantePage;

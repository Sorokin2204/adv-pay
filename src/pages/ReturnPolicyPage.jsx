import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const ReturnPolicyPage = () => {
  return (
     <>
      {' '}
      <HomeLayout>
        <Container>
<Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Политика возврата средств
              </Typography>
              <Typography variant="body1" sx={{ margin: '0', maxWidth: '100%', mt: 2 }}>
		Возврат внутригровой валюты<br />
Любое пополнение игровой валюты является окончательным.<br />
Если вы ввели неправильный игровой ID, то после пополнения игровой валюты возврат невозможен.<br />
Мы не несем ответственность за утрату или кражу вашего игрового аккаунта.<br /><br />
Право на возврат средств с баланса личного кабинета<br />
Средства с вашего личного баланса нашего сервиса в исключительных случаях могут быть возвращены. <br />
Для возврата свяжитесь с нами по электронной почте support@donate-gold.ru<br /><br />
</Typography>
            </Box>
 </Box>
		</Container>
      </HomeLayout>
    </>
  );
};

export default ReturnPolicyPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const DonatePage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Инструкция
              </Typography>
			  <Typography variant="h5" sx={{ mt: 2 }}>
                Пополняем баланс
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
                После регистрации у вас будет доступен личный кабинет пользователя. На данный момент донатить можно только с баланса личного кабинета.
				<br />
				Для пополнения баланса нажмите на кнопку карты с плюсиком.
              </Typography>
			  <img src="/ins1.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} />
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
                Откроется форма пополнения баланса. 
				</Typography>
				<img src="/ins2.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} />
				<Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				На сегодняшний день за один перевод можно пополнить баланс на сумму от 5 до 300 долларов с карты российского банка. Шаг - 5 долларов. С вашей карты будет списываться сумма в рублях. 
				<br />
				Комиссия за перевод составляет 50 рублей. Если сумма больше 35 долларов, то комиссия составит 1,8% от перевода.
				<br /><br />
				После нажатия на кнопку "пополнить" откроется сайт системы электронных платежей WebMoney. В способе оплаты выберите "Бановская карта" и перейдите к оплате.
              </Typography><br />
			  <img src="/ins3.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} /><br />
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				Откроется окно ввода данных карты. Заполняете данные и нажимаете кнопку оплатить. 
              </Typography>
			  <br />
			  <img src="/ins4.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} /><br />
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				После оплаты сумма будет зачислена на ваш лицевой счет. 
              </Typography>
			  <Typography variant="h5" sx={{ mt: 2 }}>
                Донатим
              </Typography>
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				В правом нижнем углу личного кабинета вы найдете желтую кнопку с плюсиком. Нажмите на неё и откроется форма доната. Далее выбираете сервер, вводите свой ID. И нажимаете кнопку "проверить".<br />
				Выбираете количество печатей и нажимаете на кнопку "Задонатить".
              </Typography>
			  <img src="/ins5.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} />
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				Через несколько секунд донат придет на ваш аккаунт.
              </Typography><br />
			  <img src="/ins6.png" style={{ height: 'auto', width: '100%', maxWidth: '600px', objectFit: 'cover' }} />
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
				При возникновении ошибок обращайтесь в нашу техническую поддержку.
              </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default DonatePage;

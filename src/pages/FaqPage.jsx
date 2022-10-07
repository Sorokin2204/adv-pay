import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const FaqPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
		 <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
			              <Typography variant="h4" sx={{ mt: 2 }}>Вопросы и ответы</Typography>
			<Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
		Как работает сервис?<br/>
Наш сайт работает полностью в автоматическом режиме. Вы можете покупать игровую валюту и самостоятельно донатить себе в вашу игру, указывая только игровой ID.<br/><br/>

Это безопасно?<br/>
Да, это абсолютно безопасно, так как все пополнения идут через API разработчика или через официальных интеграторов, таких как OffGamers, Codashop, Razer, SEA Gamer и других. Банов ваших аккаунтов не будет.<br/><br/>

Придет ли мне бонусная игровая валюта?<br/>
Да, бонусная игровая валюта приходит точно так же, как если бы вы покупали паки через саму игру. Ниже пример покупки печатей в игре Identity V пака 60 печатей. Как видно, игроку приходит 63 печатей где 3 печати являются бонусными.<br/><br/>

<img src="/idv_bonus.jpg" style={{ height: 'auto', width: '100%' }} /><br/><br/>

<img src="/idv_bonus2.jpg" style={{ height: 'auto', width: '100%' }} /><br/><br/>

Предоставляете ли вы чеки как App Store и Google Play?<br/>
Чеки пополнения баланса вашего личного кабинета безусловно есть. А вместо чеков доната мы предоставляем уникальный номер вашей транзакции в игру. Этот номер записывается в базу данных разработчика и свидетельствует о том, что донат произвели именно вы. Также в личном кабинете у вас есть дата доната и количество игровой валюты, которую вы получили.<br/><br/>
		</Typography>
            </Box>
          </Box>		
		</Container>
      </HomeLayout>
    </>
  );
};

export default FaqPage;

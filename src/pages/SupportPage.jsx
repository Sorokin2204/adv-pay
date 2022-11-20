import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const SupportPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Техническая поддержка
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
                По вопросам работы сайта обращайтесь:
                <br />
                ВК {' '}
                <a class="link" href="https://vk.com/im?sel=-213480825" target="_blank">
                  Написать нам
                </a>{' '}
                <br />
                Телеграм {' '}
                <a class="link" href="https://t.me/DonateGold" target="_blank">@DonateGold</a>{' '}<br />
				email - support@donate-gold.ru
                <br />
                <br />
                Режим работы: ежедневно с 10:00 до 20:00
                <br />
                <br />
                <br />
                <img src="/v_white_on_transp_ru.png" />
                <br />
                <a class="link" href="https://passport.webmoney.ru/asp/certview.asp?wmid=386255644072" target="_blank">
                  <span>Проверить аттестат</span>
                </a>
				<br /><br />
				Наш маскот - японский котик Манэки-нэко, который желает счастье тем, кто пользуются сервисом. Автор логотипа и задумки - наш пользователь сервиса <a class="link" href="https://vk.com/my.chicken.nuggets" target="_blank"> Ян Вэй.</a><br /><br />
				<img src="/logo_orig.png" style={{ width: 250 }} />
				
				
              </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default SupportPage;

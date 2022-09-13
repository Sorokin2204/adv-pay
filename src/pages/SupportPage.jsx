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
               По любым вопросам сервиса вы можете обращаться:<br/>
ВК - <a href="https://vk.com/im?sel=-213480825" target="_blank">Написать нам</a> <br/>
email - donategold.s@gmail.com<br/><br/>
Режим работы: ежедневно с 10:00 до 20:00<br/><br/><br/>


<img src="/v_white_on_transp_ru.png"/><br/>
<a href="https://passport.webmoney.ru/asp/certview.asp?wmid=386255644072" target="_blank"><span>Проверить аттестат</span></a>

              </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default SupportPage;

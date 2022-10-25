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
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
			  <iframe src="https://vk.com/video_ext.php?oid=-213480825&id=456239024&hash=05f99572efb915b0&hd=4" width="1920" height="1080" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>
			   </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default DonatePage;

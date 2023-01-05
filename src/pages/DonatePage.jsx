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
<Typography variant="body1" sx={{ maxWidth: '100%', width: '100%', height: '600px', mt: 2 }}>
        <iframe style={{width: '100%',height: '600px'}} src="https://vk.com/video_ext.php?oid=-217542887&id=456239022&hash=d53fb04986567dec&hd=4" width="1920" height="1080" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>
         </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default DonatePage;

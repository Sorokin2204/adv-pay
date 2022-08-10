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
            <img src="/logo.webp" style={{ maxHeight: '200px', width: '100%', maxWidth: ' 350px', objectFit: 'cover' }} />

            <Typography variant="h3" sx={{ mt: 2 }}>
              Добро пожаловать
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '600px', mt: 3 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis natus perspiciatis porro laudantium! Expedita, officia accusantium omnis iusto nobis eveniet quidem dignissimos. Voluptatibus reiciendis quae, fugit repellat nulla enim expedita!
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(3,250px)', xs: 'auto' }, justifyContent: { mobile: 'space-between', xs: 'center' }, gap: { xs: '20px' }, width: '100%', mt: 5, mb: 5 }}>
              <img src="/logo.webp" style={{ height: '100px', width: '250px', objectFit: 'cover' }} /> <img src="/logo.webp" style={{ height: '100px', width: '250px', objectFit: 'cover' }} /> <img src="/logo.webp" style={{ height: '100px', width: '250px', objectFit: 'cover' }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default MainPage;

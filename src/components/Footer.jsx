import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box, Button, Typography } from '@mui/material';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: 'auto', flexShrink: '1', pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle2">Donate Gold © 2022-2023</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(4,88px)', xs: 'repeat(2,88px)' }, gridGap: '10px', mt: 2 }}>
          <img key={2} src="/visa.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={3} src="/mc.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={4} src="/mir.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <a href="https://www.megastock.com/" target="_blank">
            <img src="https://www.webmoney.ru/img/icons/88x31_wm_black.png" alt="www.megastock.com" border="0" />
          </a>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(7,auto)', xs: 'repeat(2,auto)' }, gridGap: { mobile: '20px', xs: '10px' }, mt: 2 }}>
          <Button disableRipple={true} onClick={() => navigate('/about')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px' }} size="small">
            О сервисе
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/donate')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px' }} size="small">
            Инструкция
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/faq')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px', minWidth: 0 }} size="small">
            FAQ
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/reviews')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px' }} size="small">
            Отзывы
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/guarante')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px' }} size="small">
            Гарантии
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/support')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '14px' }} size="small">
            Поддержка
          </Button>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(3,auto)', xs: 'repeat(1,auto)' }, gridGap: { mobile: '10px', xs: '5px' }, mt: 1 }}>
          <Button disableRipple={true} onClick={() => navigate('/terms-of-use')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, opacity: 0.8, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Пользовательское соглашение
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/privacy-policy')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, opacity: 0.8, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Политика конфиденциальности
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/return-policy')} sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'transparent' }, opacity: 0.8, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Политика возврата
          </Button>
        </Box>
        <Typography style={{ fontSize: '12px', opacity: '0.3', margin: '0 auto' }}>v 1.3</Typography>
      </Box>
    </Box>
  );
};

export default Footer;

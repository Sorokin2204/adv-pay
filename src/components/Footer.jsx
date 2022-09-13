import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box, Button, Typography } from '@mui/material';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: 'auto', flexShrink: '1', py: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle2">Donate Gold © 2022</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(4,88px)', xs: 'repeat(2,88px)' }, gridGap: '10px', mt: 2 }}>
          <img key={2} src="/visa.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={3} src="/mc.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={4} src="/mir.png" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <a href="https://www.megastock.com/" target="_blank"><img src="https://www.webmoney.ru/img/icons/88x31_wm_black.png" alt="www.megastock.com" border="0"/></a>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(4,auto)', xs: 'repeat(2,auto)' }, gridGap: { mobile: '20px', xs: '10px' }, mt: 2 }}>
          <Button disableRipple={true} onClick={() => navigate('/about')} sx={{ '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            О сервисе
          </Button>
          <Button disableRipple={true} onClick={() => navigate('/donate')} sx={{ '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Как донатить
          </Button>{' '}
          <Button disableRipple={true} onClick={() => navigate('/rules')} sx={{ '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Правила
          </Button>{' '}
          <Button disableRipple={true} onClick={() => navigate('/support')} sx={{ '&:hover': { backgroundColor: 'transparent' }, color: 'white', display: 'block', fontSize: '12px' }} size="small">
            Поддержка
          </Button>{' '}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

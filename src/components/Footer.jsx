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
        <Typography variant="subtitle2">Donate Gold © 2022.</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { mobile: 'repeat(6,88px)', xs: 'repeat(3,88px)' }, gridGap: '10px', mt: 2 }}>
          <img key={1} src="/logo.webp" width="88" height="31" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={2} src="/logo.webp" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={3} src="/logo.webp" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={4} src="/logo.webp" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={5} src="/logo.webp" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
          <img key={6} src="/logo.webp" style={{ height: '31px', width: '88px', objectFit: 'cover' }} />
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

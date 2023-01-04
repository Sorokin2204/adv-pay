import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
const WorkOnSite = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        zIndex: 100000000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        fontSize: '24px',
        textAlign: 'center',
        color: '#fff',
      }}>
      На сайте ведутся технические работы. Скоро сайт заработает
    </Box>
  );
};

export default WorkOnSite;

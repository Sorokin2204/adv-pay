import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Container } from '@mui/material';
const FaqPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container></Container>
      </HomeLayout>
    </>
  );
};

export default FaqPage;

import { Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DrawerAppBar from '../components/MainLayout';
import TrancTable from '../components/TrancTable';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { getPackage } from '../redux/slices/package.slice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { getTransactions } from '../redux/slices/transaction.slice';
import { getUser } from '../redux/slices/user.slice';
import { getPayments } from '../redux/slices/payment.slice';
import PaymentTable from '../components/PaymentTable';
import Footer from '../components/Footer';
import ListGame from '../components/ListGame';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DrawerAppBar>
        <Paper sx={{ height: 'auto', marginTop: '22px' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: 'auto' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Игры" {...a11yProps(0)} />
                <Tab label="Покупки " {...a11yProps(1)} />
                <Tab label="Пополнение счета" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {' '}
              <ListGame />
            </TabPanel>
            <TabPanel value={value} index={1}>
              {' '}
              <TrancTable title="Последние покупки" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PaymentTable title="Пополнение счета" />
            </TabPanel>
          </Box>
        </Paper>
      </DrawerAppBar>
    </>
  );
};

export default HomePage;

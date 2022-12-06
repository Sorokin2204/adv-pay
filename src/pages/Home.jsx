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

export function TabPanel(props) {
  const { children, value, index, styleBox = {}, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3, ...styleBox }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index) {
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
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ListGame />
            </TabPanel>
          </Box>
        </Paper>
      </DrawerAppBar>
    </>
  );
};

export default HomePage;

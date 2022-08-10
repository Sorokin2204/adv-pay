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

  const dispatch = useDispatch();
  const {
    getUserState: { loading, data, error },
  } = useSelector((state) => state.user);
  const {
    getCreditCardState: { error: errorCreditCard },
  } = useSelector((state) => state.creditCard);
  const {
    getPackageState: { error: errorGetPackage },
  } = useSelector((state) => state.package);
  const {
    createTransactionState: { error: errorCreateTransaction },
    getTransactionsState: { error: errorGetTransactions },
  } = useSelector((state) => state.transaction);
  const {
    getPaymentsState: { error: errorgetPayments },
  } = useSelector((state) => state.payment);
  useEffect(() => {
    if (!loading && data && !error) {
      dispatch(getPackage());
      dispatch(getTransactions());
      dispatch(getPayments());
    }
  }, []);

  useEffect(() => {
    if (errorCreditCard?.error === 'PROBLEM_WITH_TOKEN' || errorGetPackage?.error === 'PROBLEM_WITH_TOKEN' || errorCreateTransaction?.error === 'PROBLEM_WITH_TOKEN' || errorGetTransactions?.error === 'PROBLEM_WITH_TOKEN' || errorgetPayments?.error === 'PROBLEM_WITH_TOKEN') {
      dispatch(getUser());
    }
  }, [errorCreditCard, errorGetPackage, errorCreateTransaction, errorGetTransactions]);

  return !loading && data && !error ? (
    <>
      <DrawerAppBar>
        <Paper sx={{ height: '100%' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: '100%' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Покупки" {...a11yProps(0)} />
                <Tab label="Пополнение счета" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TrancTable title="Последние покупки" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PaymentTable title="Пополнение счета" />
            </TabPanel>
          </Box>
        </Paper>
      </DrawerAppBar>
    </>
  ) : (
    <Navigate to="auth" />
  );
};

export default HomePage;

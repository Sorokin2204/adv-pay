import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, DialogActions, DialogContent, DialogContentText, IconButton, Input, InputAdornment, Tab, Tabs, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { currencyFormat } from '../utils/currencyFormat';
import { useDispatch, useSelector } from 'react-redux';
import { a11yProps, TabPanel } from '../pages/Home';
import { initPaymentCard } from '../redux/slices/user.slice';
import TransitionDialog from './TransitionDialog';
export default function PaymentModal(props) {
  const { onClose, selectedValue, open, typePay } = props;
  const defaultValues = {
    price: '',
  };
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({ defaultValues });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [sum, setSum] = React.useState(5);
  const [cardSum, setCardSum] = React.useState(100);
  const [rate, setRate] = React.useState(null);
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/payment/rate`).then((data) => setRate(data.data));
  }, []);
  const {
    getUserState: { data: user },
  } = useSelector((state) => state.user);
  const [value, setValueTab] = React.useState(typePay);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const dispatch = useDispatch();
  return (
    <Dialog TransitionComponent={TransitionDialog} maxWidth="sm" onClose={handleClose} open={open}>
      <DialogTitle sx={{ pb: '8px' }}>Пополнить баланс</DialogTitle>
      <form method="POST" action="https://merchant.webmoney.ru/lmi/payment_utf.asp?at=authtype_16" accept-charset="utf-8">
        <DialogContent sx={{ pb: '16px', pt: '0px', pb: '24px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: 'auto' }}>
            {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Webmoney" {...a11yProps(0)} />
              <Tab label="Карта" {...a11yProps(1)} />
            </Tabs> */}
          </Box>
          {typePay === 1 ? (
            <Box styleBox={{ p: 1, height: '91px' }}>
              <TextField
                onChange={(e) => {
                  setCardSum(e.target.value);
                }}
                onBlur={(e) => {
                  const valSum = parseInt(e.target.value);
                  if (valSum < 100 || !valSum || isNaN(valSum)) {
                    setCardSum(100);
                  }

                  if (valSum > 75000) {
                    setCardSum(75000);
                  }
                }}
                name="LMI_PAYMENT_AMOUNT"
                prefix={'sdf'}
                value={cardSum}
                type="number"
                inputProps={{ min: 100, style: { textAlign: 'center', paddingLeft: '24px' } }}
                sx={{ mt: '16px', mx: 'auto', display: 'flex', maxWidth: '100px', textAlign: 'center' }}
                label={'Сумма'}
                variant="outlined"
                size="small"
                autoComplete="off"
                InputProps={{
                  endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                }}
              />
              <div className="" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <p style={{ opacity: '0.6', margin: 0 }}>мин</p> <b>&nbsp;{currencyFormat(100)}</b>
                <p style={{ opacity: '0.6', margin: 0 }}>, макс</p> <b>&nbsp;{currencyFormat(75000)}</b>
              </div>
            </Box>
          ) : (
            <Box styleBox={{ p: 1, height: '91px' }}>
              <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <IconButton
                  sx={{ mt: '16px' }}
                  onClick={() => {
                    if (sum !== 5) setSum(sum - 5);
                  }}>
                  <MinusIcon />
                </IconButton>
                <TextField
                  onChange={(e) => {
                    e.stopPropagation();
                  }}
                  name="LMI_PAYMENT_AMOUNT"
                  prefix={'sdf'}
                  value={sum}
                  type="number"
                  inputProps={{ min: 0, style: { textAlign: 'center', paddingLeft: '24px' } }}
                  sx={{ mt: '16px', maxWidth: '100px', textAlign: 'center' }}
                  label={'Сумма'}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                  }}
                />{' '}
                <IconButton
                  sx={{ mt: '16px' }}
                  onClick={() => {
                    if (sum !== 300) setSum(sum + 5);
                  }}>
                  <AddIcon />
                </IconButton>
              </div>
              <div className="" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <p style={{ opacity: '0.6', margin: 0 }}>Будет зачисленно&nbsp;</p>
                <b>{currencyFormat(parseFloat(rate?.replace(',', '.')) * sum)}</b>
              </div>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <div style={{ display: 'grid', gridGap: '8px', gridTemplateColumns: '1fr 1fr' }}>
            <Button onClick={handleClose} autoFocus variant="text">
              Закрыть
            </Button>
            {typePay === 2 ? (
              <Button type="submit" autoFocus variant="contained">
                Пополнить
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch(initPaymentCard({ price: cardSum }));
                }}
                autoFocus
                variant="contained">
                Пополнить
              </Button>
            )}
          </div>
        </DialogActions>

        <input type="hidden" name="token" value={localStorage.getItem('token')} />
        <input type="hidden" name="LMI_PAYMENT_DESC" value={`Пополнение лицевого счета №${user?.id}`} />
        <input type="hidden" name="LMI_PAYMENT_NO" value="1234" />
        <input type="hidden" name="LMI_PAYEE_PURSE" value="Z250362075889" />
        {/* <input type="hidden" name="LMI_SIM_MODE" value="0" /> */}
      </form>
    </Dialog>
  );
}

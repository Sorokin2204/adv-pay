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
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import MinusIcon from '@mui/icons-material/Remove';
import { blue } from '@mui/material/colors';
import { Box, DialogActions, DialogContent, DialogContentText, IconButton, Input, InputAdornment, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { currencyFormat } from '../utils/currencyFormat';
import { useDispatch, useSelector } from 'react-redux';
import { initPaymentCard } from '../redux/slices/user.slice';
import Loading from './Loading';
import axios from 'axios';
import md5 from 'md5';
import { useEffect } from 'react';

export default function PaymentCardModal(props) {
  const { onClose, price, open } = props;
  const [sum, setSum] = React.useState(1);
  const {
    initPaymentCardState: { loading: loadingPayment, data: dataPayment, error: errorPayment },
  } = useSelector((state) => state.user);
  const handleClose = () => {
    onClose();
    setSum(1);
  };
  const [value, setValue] = React.useState('1');
  const dispatch = useDispatch();
  const {
    getUserState: { data: user },
  } = useSelector((state) => state.user);
  const onSubmit = () => {
    let priceCalc = price * sum;
    console.log(priceCalc);
    if (isNaN(priceCalc)) {
      priceCalc = price;
    }
    dispatch(initPaymentCard({ price: priceCalc }));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (dataPayment?.result) {
      window.location.href = dataPayment?.result;
    }
  }, [dataPayment]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '500px', // Set your width here
        },
      }}>
      <DialogContent sx={{ height: { xs: '500px', mob: '270px' } }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ maxWidth: { xs: '203px', mob: 'none' }, mb: '24px', mx: 'auto', fontWeight: '600', fontSize: { mob: '24px', textAlign: 'center' } }}>
            {`Пополнить счет на ${currencyFormat(price * sum)} ?`}
          </Typography>
          <Typography variant="body" sx={{ maxWidth: { xs: '203px', mob: 'none' }, mb: '0px', mx: 'auto', fontWeight: '600', fontSize: '16px' }}>
            {`Количество паков`}
          </Typography>
          <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <IconButton
              sx={{ mt: '8px' }}
              onClick={() => {
                if (sum !== 1) setSum(sum - 1);
              }}>
              <MinusIcon />
            </IconButton>
            <TextField
              onChange={(e) => {
                e.stopPropagation();
              }}
              value={sum}
              type="number"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              sx={{ mt: '8px', maxWidth: '100px', textAlign: 'center' }}
              label={''}
              variant="outlined"
              size="small"
              autoComplete="off"
            />{' '}
            <IconButton
              sx={{ mt: '8px' }}
              onClick={() => {
                setSum(sum + 1);
              }}>
              <AddIcon />
            </IconButton>
          </div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: '8px', mx: { xs: 'auto', mob: '0' } }}>
              Способ пополнения
            </FormLabel>
            <RadioGroup sx={{ display: 'grid', gridTemplateColumns: { xs: 'auto ', mob: 'auto auto' }, rowGap: '20px', justifyContent: 'start' }} aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
              <FormControlLabel
                sx={{ '& img': { userSelect: 'none', pointerEvents: 'none', boxSizing: 'border-box', p: '10px', backgroundColor: '#fff', width: '140px', height: '80px', objectFit: 'contain', display: 'block' } }}
                value="1"
                control={<Radio />}
                label={<img src="/pay-1.png" style={{}} />}
              />
              {/* <FormControlLabel
                sx={{ '& img': { pointerEvents: 'none', boxSizing: 'border-box', p: '10px', backgroundColor: '#fff', width: '140px', height: '80px', objectFit: 'contain', display: 'block', userSelect: 'none' } }}
                value="2"
                control={<Radio />}
                label={<img src="/pay-2.png" style={{}} />}
              />
              <FormControlLabel sx={{ userSelect: 'none', '& img': { pointerEvents: 'none', userSelect: 'none', backgroundColor: '#fff', width: '140px', height: '80px', objectFit: 'contain', display: 'block' } }} value="3" control={<Radio />} label={<img src="/pay-3.png" style={{}} />} />
              <FormControlLabel
                sx={{ userSelect: 'none', '& img': { pointerEvents: 'none', boxSizing: 'border-box', p: '18px', backgroundColor: '#fff', width: '140px', height: '80px', objectFit: 'contain', display: 'block', userSelect: 'none' } }}
                value="4"
                control={<Radio />}
                label={<img src="/pay-4.png" style={{}} />}
              /> */}
            </RadioGroup>
          </FormControl>
          {(loadingPayment || dataPayment) && <Loading />}
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px', padding: '16px' }}>
        <Button color="error" onClick={handleClose} autoFocus variant="contained">
          Назад
        </Button>
        <Button color="success" autoFocus variant="contained" sx={{ margin: '0 !important', color: '#fff' }} onClick={onSubmit}>
          Пополнить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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
import { initPaymentCard, setAddedCart, setUpdateCartEmpty } from '../redux/slices/user.slice';
import Loading from './Loading';
import axios from 'axios';
import md5 from 'md5';
import { useEffect } from 'react';
import TransitionDialog from './TransitionDialog';

export default function PaymentGameCardModal(props) {
  const { onClose, packageId, open } = props;
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
    let cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData instanceof Array) {
      const findInCartExist = cartData?.find((itemCart) => itemCart?.packageId === packageId && parseInt(itemCart?.count) > 0);
      if (findInCartExist) {
        findInCartExist.count = parseInt(findInCartExist.count) + sum;
      } else {
        cartData.push({ packageId, count: sum });
      }

      localStorage.setItem('cart', JSON.stringify(cartData));
    } else {
      const newCart = [{ packageId, count: sum }];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    handleClose();
    dispatch(setUpdateCartEmpty());
    dispatch(setAddedCart(true));
    setTimeout(() => {
      dispatch(setAddedCart(false));
    }, 1000);
  };

  return (
    <Dialog
      TransitionComponent={TransitionDialog}
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '400px', // Set your width here
        },
      }}>
      <DialogContent sx={{ height: { xs: '150px', mob: '150px' } }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ maxWidth: { xs: '203px', mob: 'none' }, mb: '24px', mx: 'auto', fontWeight: '600', fontSize: { mob: '24px', textAlign: 'center' } }}>
            {`Добавить пак в корзину?`}
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
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px', padding: '16px' }}>
        <Button color="error" onClick={handleClose} autoFocus variant="contained">
          Назад
        </Button>
        <Button color="success" autoFocus variant="contained" sx={{ margin: '0 !important', color: '#fff' }} onClick={onSubmit}>
          В корзину
        </Button>
      </DialogActions>
    </Dialog>
  );
}

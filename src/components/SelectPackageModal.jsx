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
import { initPaymentCard, resetInitPaymentCardState, setCart, setUpdateCartEmpty } from '../redux/slices/user.slice';
import Loading from './Loading';
import axios from 'axios';
import md5 from 'md5';
import { useEffect } from 'react';

export default function SelectPackageModal(props) {
  const { onClose, open, onNext, gameId } = props;
  const handleClose = () => {
    onClose();
  };
  const [value, setValue] = React.useState('1');
  const {
    getPackageState: { data: packageList },
  } = useSelector((state) => state.package);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (packageList && gameId) {
      const defaultPackage = packageList?.find((item, index) => item?.typeGameId === gameId);
      setValue(defaultPackage?.code);
    }
  }, [packageList, gameId, open]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '400px', // Set your width here
        },
      }}>
      {}
      <DialogContent sx={{ height: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ maxWidth: { xs: '203px', mob: 'none' }, mb: '24px', mx: 'auto', fontWeight: '600', fontSize: { mob: '24px', textAlign: 'center' } }}>
            Выберите пак
          </Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: '8px', mx: 'auto' }}></FormLabel>
            <RadioGroup sx={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }} aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
              {packageList?.map(
                (packageItem) =>
                  packageItem?.typeGameId === gameId && (
                    <FormControlLabel
                      sx={{ '& img': { userSelect: 'none', pointerEvents: 'none', boxSizing: 'border-box', p: '0px', width: '140px', height: '80px', objectFit: 'contain', display: 'block' } }}
                      value={packageItem?.code}
                      control={<Radio />}
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                          <div class="game-card__middle" style={{ marginBottom: '5px', fontSize: '14px' }}>
                            <img
                              src={`/game-icon-${packageItem?.typeGameId}.png`}
                              style={{
                                objectFit: 'contain',
                                display: 'block',
                                width: '22px',
                                height: '22px',
                              }}
                            />
                            {packageItem?.name}
                          </div>
                          <Box sx={{ fontWeight: '600 !important', fontSize: '18px', marginLeft: '12px' }}>{currencyFormat(packageItem?.price)}</Box>
                        </div>
                      }
                    />
                  ),
              )}

              {/* <FormControlLabel sx={{ '& img': { pointerEvents: 'none', boxSizing: 'border-box', p: '10px', width: '140px', height: '80px', objectFit: 'contain', display: 'block', userSelect: 'none' } }} value="2" control={<Radio />} label={<img src="/pay-2.png" style={{}} />} />
              <FormControlLabel sx={{ userSelect: 'none', '& img': { pointerEvents: 'none', userSelect: 'none', width: '140px', height: '80px', objectFit: 'contain', display: 'block' } }} value="3" control={<Radio />} label={<img src="/pay-3.png" style={{}} />} /> */}
              {/* <FormControlLabel
                sx={{ userSelect: 'none', '& img': { pointerEvents: 'none', boxSizing: 'border-box', p: '18px', backgroundColor: '#fff', width: '140px', height: '80px', objectFit: 'contain', display: 'block', userSelect: 'none' } }}
                value="4"
                control={<Radio />}
                label={<img src="/pay-4.png" style={{}} />}
              />  */}
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px', padding: '16px' }}>
        <Button
          color="error"
          onClick={() => {
            setValue(null);
            handleClose();
          }}
          autoFocus
          variant="contained">
          Назад
        </Button>
        <Button
          color="success"
          autoFocus
          variant="contained"
          sx={{ margin: '0 !important', color: '#fff' }}
          onClick={() => {
            onNext(value);
          }}>
          Задонатить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

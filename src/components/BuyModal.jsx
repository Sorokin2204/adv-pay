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
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, CircularProgress, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { currencyFormat } from '../utils/currencyFormat';

import { useForm, Controller } from 'react-hook-form';
import { checkUser, checkUserReset, getUser } from '../redux/slices/user.slice';
import axios from 'axios';
import { createTransaction } from '../redux/slices/transaction.slice';
export default function BuyModal(props) {
  const dispatch = useDispatch();
  const {
    getPackageState: { data: packageList },
  } = useSelector((state) => state.package);
  const {
    createTransactionState: { loading: transLoading, data: transData },
  } = useSelector((state) => state.transaction);
  const {
    checkUserState: { data: checkData, loading: checkLoading, error: checkError },
  } = useSelector((state) => state.user);

  const defaultValues = {
    packageId: null,
    playerId: '',
    serverId: '2001',
  };
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({ defaultValues });
  const [playerId, setPlayerId] = React.useState('');
  const { onClose, selectedValue, open } = props;

  React.useEffect(() => {
    if (checkError?.error === 'PROBLEM_WITH_TOKEN') {
      dispatch(checkUserReset());
      dispatch(getUser());
    }
  }, [checkError]);
  React.useEffect(() => {
    if (transData) {
      setValue('packageId', packageList?.[0]?.code);
      setValue('playerId', null);
      setValue('serverId', '2001');
      dispatch(checkUserReset());
    }
  }, [transData]);

  const handleClose = () => {
    if (!checkLoading) onClose(selectedValue);
  };
  React.useEffect(() => {
    if (packageList && packageList?.length !== 0) {
      setValue('packageId', packageList?.[0]?.code);
    }
  }, [packageList]);
  const onCheckPlayer = () => {
    const playerId = getValues('playerId');
    const serverId = getValues('serverId');
    if (playerId) {
      dispatch(checkUser({ playerId, serverId }));
    }
  };

  const onSubmit = (data) => {
    onClose();
    dispatch(createTransaction({ playerId: data.playerId, serverId: data.serverId, packageId: data.packageId }));
  };
  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <DialogTitle sx={{ pb: '8px' }}>Задонатить</DialogTitle>
      <DialogContent sx={{}}>
<FormControl>
          <FormLabel sx={{ mt: '16px' }}>Выберите сервер</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="serverId"
            render={({ field }) => (
              <RadioGroup {...field} sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel
                  value={'2001'}
                  control={<Radio disabled={checkLoading} />}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>NA and EU</div>
                    </div>
                  }
                />
        <FormControlLabel
                  value={'2011'}
                  control={<Radio disabled={checkLoading} />}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>Asia</div>
                    </div>
                  }
                />{' '}
              </RadioGroup>
            )}
          />
        </FormControl>
        <Box className="" sx={{ mt: { xs: 1, sm: 0 }, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="playerId"
            render={({ field }) => <TextField {...field} error={errors?.playerId} type="number" disabled={checkLoading} label={errors?.playerId ? 'Введите ваш ID в игре' : 'ID в игре'} variant="outlined" size="small" autoComplete="off" />}
          />
          <Button variant="contained" sx={{ mb: { xs: 2, sm: 0 }, mt: { xs: 1, sm: 0 }, ml: { xs: 0, sm: 1 }, maxWidth: { xs: '228px', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }} onClick={() => onCheckPlayer()} disabled={checkLoading}>
            Проверить
          </Button>
          <div style={{ height: '130px', display: 'flex', margin: '0 auto', justifyContent: 'center', alignItems: 'center' }}>
            {' '}
            {checkLoading ? (
              <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                {' '}
                <CircularProgress />
              </div>
            ) : !checkData && !checkError && !checkLoading ? (
              <></>
            ) : checkData && !checkError ? (
              <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'success.main', fontWeight: '600', fontSize: '20px' }}>ID проверен</Typography>
                  <CheckIcon sx={{ ml: '4px', mb: '4px', color: 'success.main' }} />
                </div>
                <Box className="" sx={{ display: 'flex', flexDirection: 'column', fontSize: '18px' }}>
                  <Box sx={{ opacity: '0.7', fontWeight: '600' }}>Ник:&nbsp;</Box>
                  <b> {checkData?.nickname}</b>
                </Box>{' '}
                <Box className="" sx={{ flexDirection: 'column', display: 'flex', fontSize: '18px', mt: '2px' }}>
                  <Box sx={{ opacity: '0.7', fontWeight: '600' }}>Ваш ID:&nbsp;</Box>
                  <b> {checkData?.id}</b>
                </Box>
              </div>
            ) : (
              <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'error.main', fontWeight: '600', fontSize: '20px' }}>ID не найден</Typography>
                  <SearchOffIcon sx={{ ml: '4px', mb: '4px', color: 'error.main', fontSize: '30px' }} />
                </div>
              </div>
            )}
          </div>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <FormLabel sx={{ mt: '16px' }}>Количество печатей</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="packageId"
              render={({ field }) => (
                <RadioGroup {...field} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))' }}>
                  {packageList?.map((packageItem) => (
                    <FormControlLabel
                      value={packageItem?.code}
                      control={<Radio disabled={checkLoading} />}
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                          <div>{`${packageItem?.name} - `}</div>
                          <Box sx={{ fontWeight: '600', fontSize: '18px', color: 'success.light' }}>&nbsp;{`${currencyFormat(packageItem?.price)}`}</Box>
                        </div>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px' }}>
        <Button disabled={checkLoading} onClick={handleClose} autoFocus variant="text">
          Закрыть
        </Button>
        <Button disabled={checkLoading} onClick={handleSubmit(onSubmit)} autoFocus variant="contained">
          Задонатить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

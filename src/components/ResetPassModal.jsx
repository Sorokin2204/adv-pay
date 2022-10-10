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
import { blue } from '@mui/material/colors';
import { Box, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordUser } from '../redux/slices/user.slice';
import Loading from './Loading';
import { useEffect } from 'react';

export default function ResetPassModal(props) {
  const { onClose, text, open } = props;
  const resetForm = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });
  const handleClose = () => {
    onClose();
    resetForm.reset();
  };
  const {
    resetPasswordUserState: { loading: resetLoading, data: resetData, error: resetError },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(resetPasswordUser(data));
  };
  useEffect(() => {
    if (!open) {
      resetForm.reset();
    }
  }, [open]);

  React.useEffect(() => {
    if (resetData) {
    }
  }, [resetData]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '500px', // Set your width here
          },
        }}>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
              Сброс пароля
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, maxWidth: '320px' }}>
              Чтобы получить новый пароль, введи свой ник на сайте и email регистрации
            </Typography>
            <Controller
              control={resetForm.control}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              }}
              name="email"
              defaultValue=""
              render={({ field }) => <TextField {...field} error={resetForm.formState.errors?.email} sx={{ width: '240px' }} label="Почта" variant="outlined" size="small" autoComplete="off" />}
            />
            <Controller control={resetForm.control} rules={{ required: true }} name="name" defaultValue="" render={({ field }) => <TextField error={resetForm.formState?.errors?.name} {...field} sx={{ mt: '16px', width: '240px' }} label="Имя" variant="outlined" size="small" autoComplete="off" />} />
            {resetError?.error === 'NOT_FOUND_USER' && (
              <Box
                sx={{
                  fontSize: '14px',
                  color: 'error.main',
                  mt: 1,
                }}>
                Такого пользователя не существует
              </Box>
            )}
          </Box>
          {resetLoading && <Loading />}
        </DialogContent>
        <DialogActions sx={{ mt: '16px', p: '16px' }}>
          <Button onClick={handleClose} variant="text">
            Закрыть
          </Button>
          <Button onClick={resetForm.handleSubmit(onSubmit)} autoFocus variant="contained">
            Сбросить пароль
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

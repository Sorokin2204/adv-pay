import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, makeStyles, Paper, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { createUser, createUserReset, getUser, loginUser, loginUserReset, resetPasswordUserReset, userReset } from '../redux/slices/user.slice';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import HomeLayout from '../components/HomeLayout';
import Footer from '../components/Footer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ResetPassModal from '../components/ResetPassModal';
import SuccessModal from '../components/SuccessModal';
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

function AuthPage() {
  const [value, setValue] = React.useState(0);
  const [showLoginSucc, setShowLoginSucc] = React.useState(false);
  const loginForm = useForm({});
  const createForm = useForm({});

  const {
    createUserState: { loading: loadingCreate, data: dataCreate, error: errorCreate },
  } = useSelector((state) => state.user);
  const {
    loginUserState: { loading: loadingLogin, data: dataLogin, error: errorLogin },
  } = useSelector((state) => state.user);
  const {
    getUserState: { loading: loadingGet, data: dataGet, error: errorGet },
  } = useSelector((state) => state.user);
  const {
    resetPasswordUserState: { loading: resetLoading, data: resetData, error: resetError },
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (dataLogin && !loadingLogin && !errorLogin) {
      dispatch(getUser());
      dispatch(loginUserReset());
      navigate('/account');
    }
  }, [dataLogin, loadingLogin, errorLogin]);

  React.useEffect(() => {
    if (dataCreate && !loadingCreate && !errorCreate) {
      setShowLoginSucc(true);
      // dispatch(getUser());
      dispatch(createUserReset());
      // navigate('/account');
    }
  }, [dataCreate, loadingCreate, errorCreate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  const onSubmitRegister = (data) => {
    dispatch(createUser({ email: data.email, password: data.password, name: data.name, referralCode: data.referralCode?.toUpperCase() }));
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showPasswordLogin, setShowPasswordLogin] = React.useState(false);
  const handleClickShowPasswordLogin = () => setShowPasswordLogin(!showPasswordLogin);
  const handleMouseDownPasswordLogin = () => setShowPasswordLogin(!showPasswordLogin);
  const [openResetPassModal, setOpenResetPassModal] = React.useState(false);
  const [openResetPassSuccModal, setOpenResetPassSuccModal] = React.useState(false);
  const handleHideResetSuccModal = () => {
    setOpenResetPassSuccModal(false);
  };
  const handleHideResetModal = () => {
    setOpenResetPassModal(false);
    dispatch(resetPasswordUserReset());
  };
  React.useEffect(() => {
    if (resetData) {
      setOpenResetPassModal(false);
      setOpenResetPassSuccModal(true);

      dispatch(resetPasswordUserReset());
    }
  }, [resetData]);

  return !dataGet && !loadingGet && errorGet ? (
    <HomeLayout>
      <Paper>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
          <div style={{ marginTop: '100px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Вход" {...a11yProps(0)} />
                <Tab label="Регистрация" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div style={{ marginLeft: '-24px', marginRight: '-24px', display: 'flex', flexDirection: 'column' }}>
                <Controller control={loginForm.control} rules={{ required: true }} type="email" name="email" defaultValue="" render={({ field }) => <TextField {...field} error={loginForm.formState.errors?.email} label="Почта" variant="outlined" size="small" />} />
                <Controller
                  control={loginForm.control}
                  rules={{ required: true }}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      type={showPasswordLogin ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton disableRipple sx={{ p: 0, opacity: 0.5 }} onClick={handleClickShowPasswordLogin} onMouseDown={handleMouseDownPasswordLogin} aria-label="toggle password visibility">
                              {showPasswordLogin ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={loginForm.formState?.errors?.password}
                      {...field}
                      sx={{ mt: '16px' }}
                      label="Пароль"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
                <Button
                  onClick={() => {
                    setOpenResetPassModal(true);
                  }}
                  disableRipple
                  sx={{
                    width: 'min-content',
                    p: 0,
                    whiteSpace: 'nowrap',
                    textTransform: 'initial',
                    color: 'rgba(255,255,255,0.4)',
                    mt: 0.5,
                    '&:hover': {
                      background: 'transparent',
                    },
                  }}>
                  Забыли пароль?
                </Button>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Запомнить почту" />
                </FormGroup>
                <Button disabled={loadingLogin} variant="contained" sx={{ mt: '8px' }} onClick={loginForm.handleSubmit(onSubmit)}>
                  Вход
                </Button>

                {!loadingLogin && !dataLogin && errorLogin && <Box sx={{ fontSize: '14px', color: 'error.main', mt: '8px', mx: 'auto' }}>{errorLogin?.error === 'ACCOUNT_NOT_ACTIVE' ? 'Подтвердите email' : 'Неправильный логин или пароль'} </Box>}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div style={{ marginLeft: '-24px', marginRight: '-24px', display: 'flex', flexDirection: 'column' }}>
                <Controller
                  control={createForm.control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  }}
                  name="email"
                  defaultValue=""
                  render={({ field }) => <TextField {...field} error={createForm.formState.errors?.email} label="Почта" variant="outlined" size="small" autoComplete="off" />}
                />
                <Controller
                  control={createForm.control}
                  rules={{ required: true }}
                  name="password"
                  defaultValue=""
                  autoComplete="off"
                  render={({ field }) => (
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton disableRipple sx={{ p: 0, opacity: 0.5 }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} aria-label="toggle password visibility">
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={createForm.formState?.errors?.password}
                      {...field}
                      sx={{ mt: '16px' }}
                      label="Пароль"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
                <Controller
                  autoComplete="off"
                  control={createForm.control}
                  rules={{
                    required: true,
                    validate: (val) => {
                      if (createForm.watch('password') != val) {
                        return 'Пароли не совпадают';
                      }
                    },
                  }}
                  name="repeatPassword"
                  defaultValue=""
                  render={({ field }) => <TextField type={showPassword ? 'text' : 'password'} error={createForm.formState?.errors?.repeatPassword} {...field} sx={{ mt: '16px' }} label="Повторите пароль" variant="outlined" size="small" />}
                />
                <Controller control={createForm.control} rules={{ required: true }} name="name" defaultValue="" render={({ field }) => <TextField error={createForm.formState?.errors?.name} {...field} sx={{ mt: '16px' }} label="Имя" variant="outlined" size="small" autoComplete="off" />} />
                <Controller
                  control={createForm.control}
                  rules={{ required: false }}
                  name="referralCode"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        mt: '16px',
                        textTransform: 'uppercase',
                        '& .MuiInputLabel-root': {
                          textTransform: 'initial',
                        },
                      }}
                      inputProps={{ maxLength: 5 }}
                      label="Промо код (необязательно)"
                      variant="outlined"
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
                <Button disabled={loadingLogin} variant="contained" sx={{ mt: '16px' }} onClick={createForm.handleSubmit(onSubmitRegister)}>
                  Регистрация
                </Button>
                {!loadingCreate && !dataCreate && errorCreate && (
                  <Box sx={{ fontSize: '14px', color: 'error.main', mt: '8px', mx: 'auto' }}>{errorCreate?.error === 'USER_EXIST' ? 'Такой email уже существует' : errorCreate?.error === 'NOT_FOUND_REFERRAL_CODE' ? 'Некорректный промокод' : 'Произошла непредвиденная ошибка'}</Box>
                )}
                {showLoginSucc && (
                  <Box sx={{ fontSize: '14px', color: 'success.main', mt: '8px', mx: 'auto', textAlign: 'center' }}>
                    Ссылка на подтверждение <br /> отправлена на почту
                  </Box>
                )}
              </div>
            </TabPanel>
          </div>
          {(loadingCreate || loadingLogin) && <Loading />}
          <ResetPassModal open={openResetPassModal} onClose={handleHideResetModal} />
          <SuccessModal open={openResetPassSuccModal} text={'Новый пароль отправлен на почту'} onClose={handleHideResetSuccModal} />
        </Box>
      </Paper>
    </HomeLayout>
  ) : (
    <Navigate to="/account" />
  );
}
export default AuthPage;

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, makeStyles, Paper, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { createUser, createUserReset, getUser, loginUser, loginUserReset, userReset } from '../redux/slices/user.slice';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import HomeLayout from '../components/HomeLayout';
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
    dispatch(createUser({ email: data.email, password: data.password, name: data.name }));
  };
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
                <Controller control={loginForm.control} rules={{ required: true }} name="email" defaultValue="" render={({ field }) => <TextField {...field} error={loginForm.formState.errors?.email} label="Почта" variant="outlined" size="small" autoComplete="off" />} />
                <Controller control={loginForm.control} rules={{ required: true }} name="password" defaultValue="" render={({ field }) => <TextField error={loginForm.formState?.errors?.password} {...field} sx={{ mt: '16px' }} label="Пароль" variant="outlined" size="small" autoComplete="off" />} />
                <Button disabled={loadingLogin} variant="contained" sx={{ mt: '16px' }} onClick={loginForm.handleSubmit(onSubmit)}>
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
                <Controller control={createForm.control} rules={{ required: true }} name="password" defaultValue="" render={({ field }) => <TextField error={createForm.formState?.errors?.password} {...field} sx={{ mt: '16px' }} label="Пароль" variant="outlined" size="small" autoComplete="off" />} />
                <Controller control={createForm.control} rules={{ required: true }} name="name" defaultValue="" render={({ field }) => <TextField error={createForm.formState?.errors?.password} {...field} sx={{ mt: '16px' }} label="Имя" variant="outlined" size="small" autoComplete="off" />} />
                <Button disabled={loadingLogin} variant="contained" sx={{ mt: '16px' }} onClick={createForm.handleSubmit(onSubmitRegister)}>
                  Регистрация
                </Button>
                {!loadingCreate && !dataCreate && errorCreate && <Box sx={{ fontSize: '14px', color: 'error.main', mt: '8px', mx: 'auto' }}>{errorCreate?.error === 'USER_EXIST' ? 'Такой email уже существует' : 'Произошла непредвиденная ошибка'}</Box>}
                {showLoginSucc && (
                  <Box sx={{ fontSize: '14px', color: 'success.main', mt: '8px', mx: 'auto', textAlign: 'center' }}>
                    Ссылка на подтверждение <br /> отправлена на почту
                  </Box>
                )}
              </div>
            </TabPanel>
          </div>
          {(loadingCreate || loadingLogin) && <Loading />}
        </Box>
      </Paper>
    </HomeLayout>
  ) : (
    <Navigate to="/account" />
  );
}
export default AuthPage;

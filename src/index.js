import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  breakpoints: {
    values: { xs: 0, mobile: 1000 },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <App />{' '}
        </ThemeProvider>
      </Provider>
    </Router>
  </>,
);

reportWebVitals();

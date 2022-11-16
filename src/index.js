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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#222',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          marginTop: '4px !important',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1000px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: 'rgb(6, 6, 6)',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
  breakpoints: {
    values: { xs: 0, mobile: 1000, mob: 600 },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>
  </>,
);

reportWebVitals();

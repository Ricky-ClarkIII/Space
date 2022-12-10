import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Monospace',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#010048',
    },
    secondary: {
      main: '#d148ff',
    },
    error: {
      main: '#ff0f00',
    },
    info: {
      main: '#4bcfff',
    },
    success: {
      main: '#00e20b',
    },
  },
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

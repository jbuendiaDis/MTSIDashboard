import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ModalProvider } from './components/Modal/ModalProvider.tsx';
import { LoaderProvider } from './components/Loader/LoaderProvider.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './components/Theme';
import { Skins } from './models/theme';

// import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme={Skins.light}>
      <ModalProvider>
        <LoaderProvider>
          <AuthProvider>
            <CssBaseline />
            <App />
          </AuthProvider>
        </LoaderProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);

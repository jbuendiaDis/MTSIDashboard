import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ModalProvider } from './components/Modal/ModalProvider.tsx';
import { LoaderProvider } from './components/Loader/LoaderProvider.tsx';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <LoaderProvider>
        <AuthProvider>
          <CssBaseline />
          <App />
        </AuthProvider>
      </LoaderProvider>
    </ModalProvider>
  </React.StrictMode>
);

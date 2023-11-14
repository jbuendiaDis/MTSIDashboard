import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { App } from './App.tsx';
import { ModalProvider } from './components/Modal/ModalProvider.tsx';
import { LoaderProvider } from './components/Loader/LoaderProvider.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import ThemeProvider from './components/Theme';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <LoaderProvider>
          <AuthProvider>
            <Suspense>
              <App />
            </Suspense>
          </AuthProvider>
        </LoaderProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);

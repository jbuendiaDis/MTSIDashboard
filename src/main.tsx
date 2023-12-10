import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { App } from './App.tsx';
import { ModalProvider } from './components/Modal/ModalProvider.tsx';
import { LoaderProvider } from './components/Loader/LoaderProvider.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import ThemeProvider from './components/Theme';
import './global.css';
import { RootProvider } from './components/RootProvider/RootProvider.tsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <ModalProvider>
          <LoaderProvider>
            <RootProvider>
              <AuthProvider>
                <Suspense>
                  <App />
                </Suspense>
              </AuthProvider>
            </RootProvider>
          </LoaderProvider>
        </ModalProvider>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
);

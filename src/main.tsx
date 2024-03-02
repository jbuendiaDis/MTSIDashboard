import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { App } from './App.tsx';
import { ModalProvider } from './components/Modal/ModalProvider.tsx';
import { LoaderProvider } from './components/Loader/LoaderProvider.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import ThemeProvider from './components/Theme';
import './global.css';
import { RootProvider } from './components/RootProvider/RootProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
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
  </ThemeProvider>
);

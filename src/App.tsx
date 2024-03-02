import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from './routes';
import { useAuth } from './components/Auth';

export const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

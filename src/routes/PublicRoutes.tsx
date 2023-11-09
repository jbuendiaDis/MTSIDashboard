import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../views/Login';
import { FullScreenLayout } from '../layouts';

const PublicRoutes = () => {
  return (
    <FullScreenLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </FullScreenLayout>
  );
};

export { PublicRoutes };

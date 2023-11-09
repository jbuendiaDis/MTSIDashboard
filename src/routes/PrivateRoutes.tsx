import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { Home } from '../views/Home';

const PrivateRoutes = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BaseLayout>
  );
};

export { PrivateRoutes };

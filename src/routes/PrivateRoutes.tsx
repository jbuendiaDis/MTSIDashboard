import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { Home } from '../views/Home';
import { Users } from '../views/Users';

const PrivateRoutes = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/example-components" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BaseLayout>
  );
};

export { PrivateRoutes };

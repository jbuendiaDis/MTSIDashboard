import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { Home } from '../views/Home';
import { Users } from '../views/Users';
import { Customers } from '../views/Customers';

const PrivateRoutes = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/example-components" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BaseLayout>
  );
};

export { PrivateRoutes };

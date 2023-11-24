import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { Home } from '../views/Home';
import { Users } from '../views/Users';
import { Customers } from '../views/Customers';
import { Transfers } from '../views/Transfers';
import { Tolls } from '../views/Tolls';
import { Bills } from '../views/Bills';
import { Returns } from '../views/Returns';

const PrivateRoutes = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/tolls" element={<Tolls />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/example-components" element={<Home />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BaseLayout>
  );
};

export { PrivateRoutes };

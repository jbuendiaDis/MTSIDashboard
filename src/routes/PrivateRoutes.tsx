import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { Users } from '../views/Users';
import { Customers } from '../views/Customers';
import { Transfers } from '../views/Transfers';
import { Tolls } from '../views/Tolls';
import { Bills } from '../views/Bills';
import { Returns } from '../views/Returns';
import { UserClients } from '../views/UserClients/UserClients';
import { Routes as RoutesPage } from '../views/Routes';
import { Quotes } from '../views/Quotes';
import { DetailQuote } from '../views/Quotes';
import { useAuth } from '../components/Auth';

const PrivateRoutes = () => {
  const { user } = useAuth();

  return (
    <BaseLayout>
      {user?.role === 'operacion' ? (
        <Routes>
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/tolls" element={<Tolls />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="*" element={<Navigate to="/routes" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/tolls" element={<Tolls />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/user-clients" element={<UserClients />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/detail-quote/:folio" element={<DetailQuote />} />
          <Route path="/quote-history" element={<Quotes />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      )}
    </BaseLayout>
  );
};

export { PrivateRoutes };

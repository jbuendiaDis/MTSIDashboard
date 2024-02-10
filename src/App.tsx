import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useAuth } from './components/Auth';
import { Roles, Route as RouteType } from './models';
import { routesByRole, errorPageRoute } from './routes/routes';
import { map, reduce } from 'lodash';

export const App = () => {
  const { user } = useAuth();

  console.log('???', user);

  const role = user?.rol || 'public';

  const routes: any = routesByRole[role];
  const publicRoutes = routesByRole[Roles.PUBLIC];

  console.log('ROLE', role);

  return (
    <Router>
      <Switch>
        {role !== Roles.PUBLIC &&
          map(
            reduce<RouteType, string[]>(
              publicRoutes,
              (paths, route) => [...paths, ...(route.path ? [route.path] : [])],
              []

              // publicRoutes,
              // (paths, route) => [
              //   ...paths,
              //   ...(!!route.path ? [route.path] : []),
              // ],
              // []
            ),
            (path, index) => (
              <Route
                key={`public-route-${index}`}
                path={path}
                exact={true}
                render={() => <Redirect to="/" />}
              />
            )
          )}

        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <>
                <route.layout>
                  <div className="nav-container fadeIn">
                    <route.component {...props} />
                  </div>
                </route.layout>
              </>
            )}
          />
        ))}

        <Route
          render={(props) => (
            <>
              <errorPageRoute.layout>
                <errorPageRoute.component {...props} />
              </errorPageRoute.layout>
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

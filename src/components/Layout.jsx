import React, { lazy } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));

export const Layout = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" component={Home}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" component={Movies}>
            Movies
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default Layout;

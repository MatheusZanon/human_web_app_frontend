import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

/**
 * Layout
 */
import NotFound from '@/pages/layout/not-found';
import MainLayout from '@/pages/layout/main-layout';
import BlankLayout from '@/pages/layout/blank-layout';

/**
 * Auth
 */
import Login from '@/pages/login';
import Register from '@/pages/register';

/**
 * Paginas
 */
import Home from '@/pages/home';
import Robos from '@/pages/robos';
import Profile from '@/pages/profile';

/**
 * Robos
*/
import RoboDetalhes from '@/pages/robos/detalhes';
import Financeiro from '@/pages/robos/financeiro/financeiro';

/**
 * Relatorios
 */
import Relatorios from '@/pages/relatorios';
import ValoresFinanceiro from '@/pages/relatorios/valores-financeiro';

type route = {
  path: string;
  element: React.ReactNode;
};

const allRoutes: route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/robos',
    element: <Robos />,
  },
  {
    path: '/robos/:roboId',
    element: <RoboDetalhes />
  },
  {
    path: '/robos/financeiro',
    element: <Financeiro />,
  },
  {
    path: '/relatorios',
    element: <Relatorios />,
  },
  {
    path: '/relatorios/valores-financeiro',
    element: <ValoresFinanceiro />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
];


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: allRoutes.map(({ path, element }) => ({
      path, element
    })),
  },
  {
    path: '/login',
    element: (
      <BlankLayout>
        <Login />
      </BlankLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <BlankLayout>
        <Register />
      </BlankLayout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

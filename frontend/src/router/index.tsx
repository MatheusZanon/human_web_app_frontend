import { createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

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
import Dashboard from '@/pages/dashboard/';
import Profile from '@/pages/profile';

/**
 * Robos
 */
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
    element: <Dashboard />,
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

/**
 * Interceptador de rotas protegidas
 * Se não tiver o token de autenticação redireciona para a página de login
 */
function ProtectedRouteInterceptor({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return children;
}

const protectedRoutes = allRoutes.map((route) => ({
  ...route,
  element: <ProtectedRouteInterceptor>{route.element}</ProtectedRouteInterceptor>,
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: protectedRoutes.map((route) => ({
      path: route.path,
      element: route.element,
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

import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import RequireAuth from './require_auth';
import { AuthenticatedUserProvider } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';


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
import Funcionarios from '@/pages/rh/funcionarios';
import Robos from '@/pages/robos';
import Profile from '@/pages/profile';

/**
 * Robos
 */
import RoboDetalhes from '@/pages/robos/detalhes';
import Financeiro from '@/pages/robos/financeiro';
import RH from '@/pages/robos/rh';

/**
 * Relatorios
 */
import Relatorios from '@/pages/financeiro/relatorios';
import ClientesFinanceiro from '@/pages/financeiro/clientes';
import ClienteFinanceiroProfile from '@/pages/clientes-financeiro-profile';
import Dashboard from '@/pages/dashboard';
import ActivateUsersTable from '@/pages/activate-users-table';
import FuncionarioProfile from '@/pages/funcionario-profile';

type route = {
    path: string;
    element: React.ReactNode;
};

const allRoutes: route[] = [
  {
    path: '',
    element: <Dashboard />

  },
  {
    path: 'robos',
    element: <Robos />
  },
  {
    path: 'robos/:roboId',
    element: <RoboDetalhes />
  },
  {
    path: 'robos/financeiro',
    element: <Financeiro />
  },
  {
    path: 'robos/rh',
    element: <RH />
  },
  {
    path: 'financeiro/clientes',
    element: <ClientesFinanceiro />
  },
  {
    path: 'financeiro/clientes/profile/:clienteId',
    element: <ClienteFinanceiroProfile />
  },
  {
    path: 'financeiro/relatorios',
    element: <Relatorios />
  },
  {
    path: 'rh/funcionarios',
    element: <Funcionarios />
  },
  {
    path: 'profile',
    element: <Profile />
  },
  {
    path: 'activate-users',
    element: <ActivateUsersTable />,
},
{
    path: 'rh/funcionarios/:funcionarioId',
    element: <FuncionarioProfile />,
}
];

const router = createBrowserRouter([
    {
        path: '/',
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
        path: '/main',
        element: (
            <AuthenticatedUserProvider>
                <RequireAuth>
                    <MainLayout />
                </RequireAuth>
            </AuthenticatedUserProvider>
            
        ),
        children: allRoutes.map(({ path, element }) => ({
            path,
            element,
        })),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
